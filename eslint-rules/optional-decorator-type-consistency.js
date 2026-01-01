const ts = require('typescript');

/**
 * ESLint rule that validates @Optional decorator arguments match the resolved runtime type
 * of the decorated property.
 * 
 * Ensures consistency between the decorator argument and property type.
 * For example, if property is `CollisionCallback` (which is `SerializableCallback<...>`),
 * the decorator should use `@Optional(SerializableCallback)`.
 */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Ensure @Optional decorator uses the runtime base type that matches the property type',
            category: 'Best Practices',
            recommended: true
        },
        messages: {
            inconsistentType: '@Optional({{decoratorType}}) does not match property type. Property type "{{propertyType}}" resolves to runtime type "{{resolvedType}}". Use @Optional({{resolvedType}}) instead.',
            cannotResolve: 'Cannot resolve property type "{{propertyType}}" to a runtime base type. Consider using a class or creating a marker class.'
        },
        schema: []
    },
    create(context) {
        const parserServices = context.parserServices || context.sourceCode?.parserServices;

        if (!parserServices || !parserServices.program || !parserServices.esTreeNodeToTSNodeMap) {
            return {};
        }

        const checker = parserServices.program.getTypeChecker();

        function checkOptionalDecorator(node) {
            if (!node.decorators || node.decorators.length === 0) {
                return;
            }

            const decorators = node.decorators || [];

            for (const decorator of decorators) {
                // Check if this is @Optional(SomeType)
                if (
                    decorator.expression.type === 'CallExpression' &&
                    decorator.expression.callee.type === 'Identifier' &&
                    decorator.expression.callee.name === 'Optional' &&
                    decorator.expression.arguments.length === 1
                ) {
                    const decoratorArg = decorator.expression.arguments[0];
                    const decoratorTypeName = decoratorArg.name;

                    // Get the property's type annotation
                    let propertyTypeNode;

                    // Handle regular properties
                    if (node.type === 'PropertyDefinition' && node.typeAnnotation?.typeAnnotation) {
                        propertyTypeNode = node.typeAnnotation.typeAnnotation;
                    }
                    // Handle getters
                    else if (node.type === 'MethodDefinition' && node.kind === 'get' && node.value?.returnType?.typeAnnotation) {
                        propertyTypeNode = node.value.returnType.typeAnnotation;
                    }

                    if (!propertyTypeNode) {
                        continue;
                    }

                    const propertyTypeName = getTypeNameFromAnnotation(propertyTypeNode);

                    if (!propertyTypeName) {
                        continue;
                    }

                    // Get the actual type node (filtering out undefined/null from unions)
                    const actualPropertyTypeNode = getNonNullableTypeNode(propertyTypeNode);

                    // Convert ESTree node for the property type annotation to TS node
                    const tsPropertyTypeNode = parserServices.esTreeNodeToTSNodeMap.get(actualPropertyTypeNode);
                    const tsDecoratorArgNode = parserServices.esTreeNodeToTSNodeMap.get(decoratorArg);

                    if (!tsPropertyTypeNode || !tsDecoratorArgNode) {
                        continue;
                    }

                    // Get the actual TypeScript types
                    const propertyType = checker.getTypeAtLocation(tsPropertyTypeNode);
                    const decoratorArgType = checker.getTypeAtLocation(tsDecoratorArgNode);

                    // Get the type strings for comparison
                    const propertyTypeString = checker.typeToString(propertyType);
                    const decoratorTypeString = checker.typeToString(decoratorArgType);

                    // Resolve both the property type and decorator type to runtime classes
                    const resolvedPropertyType = resolveToRuntimeType(tsPropertyTypeNode, propertyTypeName, checker);
                    const resolvedDecoratorType = resolveToRuntimeType(tsDecoratorArgNode, decoratorTypeName, checker);

                    // Handle case where property is a primitive (string, number, boolean)
                    if (!resolvedPropertyType) {
                        // Property is a primitive, check if decorator arg is compatible
                        // Allow both TypeScript primitives (string) and JS constructors (String)
                        const normalizedProperty = propertyTypeName.toLowerCase();
                        const normalizedDecorator = decoratorTypeName.toLowerCase();

                        if (normalizedProperty !== normalizedDecorator) {
                            context.report({
                                node: decorator,
                                messageId: 'inconsistentType',
                                data: {
                                    decoratorType: decoratorTypeName,
                                    propertyType: propertyTypeName,
                                    resolvedType: propertyTypeName
                                }
                            });
                        }
                        continue;
                    }

                    // If decorator type can't be resolved, report error
                    if (!resolvedDecoratorType) {
                        context.report({
                            node: decorator,
                            messageId: 'cannotResolve',
                            data: {
                                propertyType: decoratorTypeName
                            }
                        });
                        continue;
                    }

                    // Check if resolved types match
                    if (resolvedDecoratorType !== resolvedPropertyType) {
                        context.report({
                            node: decorator,
                            messageId: 'inconsistentType',
                            data: {
                                decoratorType: decoratorTypeName,
                                propertyType: propertyTypeName,
                                resolvedType: resolvedPropertyType
                            }
                        });
                    }
                }
            }
        }

        return {
            PropertyDefinition: checkOptionalDecorator,
            MethodDefinition: checkOptionalDecorator
        };
    }
};

/**
 * Extract the type name from a type annotation node
 */
function getTypeNameFromAnnotation(typeNode) {
    // Handle primitives (string, number, boolean, etc.)
    if (typeNode.type === 'TSStringKeyword') return 'string';
    if (typeNode.type === 'TSNumberKeyword') return 'number';
    if (typeNode.type === 'TSBooleanKeyword') return 'boolean';

    // Handle TSTypeReference (e.g., CollisionCallback)
    if (typeNode.type === 'TSTypeReference' && typeNode.typeName) {
        return typeNode.typeName.name;
    }

    // Handle TSUnionType (e.g., CollisionCallback | undefined or string | undefined)
    if (typeNode.type === 'TSUnionType') {
        for (const unionType of typeNode.types) {
            // Try primitives first
            if (unionType.type === 'TSStringKeyword') return 'string';
            if (unionType.type === 'TSNumberKeyword') return 'number';
            if (unionType.type === 'TSBooleanKeyword') return 'boolean';

            // Then try type references
            if (unionType.type === 'TSTypeReference' && unionType.typeName) {
                return unionType.typeName.name;
            }
        }
    }

    return null;
}

/**
 * Extract the non-nullable type node from a union type (filters out undefined/null)
 */
function getNonNullableTypeNode(typeNode) {
    // If it's not a union, return as-is
    if (typeNode.type !== 'TSUnionType') {
        return typeNode;
    }

    // Find the first type that's not undefined or null
    for (const unionType of typeNode.types) {
        if (unionType.type !== 'TSUndefinedKeyword' && unionType.type !== 'TSNullKeyword') {
            return unionType;
        }
    }

    return typeNode;
}

/**
 * Resolve a property type to its runtime base type by following type aliases
 */
function resolveToRuntimeType(tsPropertyTypeNode, propertyTypeName, checker) {
    // Get the type from the type node
    const type = checker.getTypeAtLocation(tsPropertyTypeNode);

    // For union types (including instantiated generics like Nullable<T> = T | null),
    // find the first non-undefined/non-null member
    if (type.isUnion && type.isUnion()) {
        for (const unionType of type.types) {
            const flags = unionType.flags;
            // Skip undefined, null, and void types
            if (!(flags & ts.TypeFlags.Undefined) &&
                !(flags & ts.TypeFlags.Null) &&
                !(flags & ts.TypeFlags.Void)) {
                const symbol = unionType.symbol || unionType.aliasSymbol;
                if (symbol) {
                    return resolveSymbolToRuntimeType(symbol, checker);
                }
            }
        }
    }

    const symbol = type.symbol || type.aliasSymbol;

    if (!symbol) {
        return null;
    }

    return resolveSymbolToRuntimeType(symbol, checker);
}

/**
 * Given a symbol, resolve it to its runtime base type
 */
function resolveSymbolToRuntimeType(symbol, checker) {
    // Follow import aliases to get the actual symbol
    if (symbol.flags & ts.SymbolFlags.Alias) {
        symbol = checker.getAliasedSymbol(symbol);
    }

    const declarations = symbol.declarations;
    if (!declarations || declarations.length === 0) {
        return null;
    }

    const declaration = declarations[0];

    // If it's a class, it's already the runtime type
    if (ts.isClassDeclaration(declaration) && declaration.name) {
        return declaration.name.text;
    }

    // If it's a type alias, resolve it
    if (ts.isTypeAliasDeclaration(declaration)) {
        const aliasedType = declaration.type;

        // Handle type references (e.g., SerializableCallback<...>)
        if (ts.isTypeReferenceNode(aliasedType)) {
            const typeName = aliasedType.typeName;
            if (ts.isIdentifier(typeName)) {
                // Get symbol and recursively resolve
                const aliasedSymbol = checker.getSymbolAtLocation(typeName);
                if (aliasedSymbol) {
                    return resolveSymbolToRuntimeType(aliasedSymbol, checker);
                }
            }
        }

        // Handle union types
        if (ts.isUnionTypeNode(aliasedType)) {
            for (const unionMember of aliasedType.types) {
                if (ts.isTypeReferenceNode(unionMember) && ts.isIdentifier(unionMember.typeName)) {
                    const unionSymbol = checker.getSymbolAtLocation(unionMember.typeName);
                    if (unionSymbol) {
                        const resolved = resolveSymbolToRuntimeType(unionSymbol, checker);
                        if (resolved) {
                            return resolved;
                        }
                    }
                }
            }
        }
    }

    return null;
}
