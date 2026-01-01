/**
 * ESLint rule to enforce @Optional decorator on public optional properties in component classes.
 * Ensures type information is preserved for optional component properties.
 */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforce @Optional decorator on public optional properties in component classes',
            category: 'Best Practices'
        },
        messages: {
            missingOptional: 'Public optional property "{{ propertyName }}" in component must use @Optional decorator to specify its type'
        }
    },
    create(context) {
        return {
            ClassDeclaration(node) {
                // Check if class is a component
                const isComponent = isComponentClass(node);
                if (!isComponent) return;

                // Check all properties and getters for optional syntax
                for (const member of node.body.body) {
                    // Check regular properties: public propertyName?:
                    if (member.type === 'PropertyDefinition') {
                        const isPublic = !member.key.name.startsWith('_') &&
                            (!member.accessibility || member.accessibility === 'public');

                        if (isPublic && member.optional) {
                            const propertyName = member.key.name;
                            // Check if @Optional decorator is present
                            if (!hasOptionalDecorator(member)) {
                                context.report({
                                    node: member,
                                    messageId: 'missingOptional',
                                    data: { propertyName }
                                });
                            }
                        }
                    }

                    // Check getter methods: public get propertyName():
                    if (member.type === 'MethodDefinition' && member.kind === 'get') {
                        const isPublic = !member.key.name.startsWith('_') &&
                            (!member.accessibility || member.accessibility === 'public');

                        if (isPublic) {
                            // Check if return type is optional/nullable
                            const returnTypeAnnotation = member.value?.returnType;
                            if (returnTypeAnnotation && isOptionalType(returnTypeAnnotation)) {
                                const propertyName = member.key.name;
                                // Check if @Optional decorator is present
                                if (!hasOptionalDecorator(member)) {
                                    context.report({
                                        node: member,
                                        messageId: 'missingOptional',
                                        data: { propertyName }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        };
    }
};

function isComponentClass(node) {
    // Check for @Component decorator
    if (node.decorators?.some(dec => {
        const name = dec.expression.callee?.name || dec.expression.name;
        return name === 'Component';
    })) {
        return true;
    }

    // Check if extends BaseComponent
    if (node.superClass?.name === 'BaseComponent') {
        return true;
    }

    return false;
}

function hasOptionalDecorator(node) {
    return node.decorators?.some(dec => {
        const name = dec.expression.callee?.name || dec.expression.name;
        return name === 'Optional';
    }) || false;
}

function isOptionalType(returnTypeAnnotation) {
    // Check if return type contains union with null or undefined
    // e.g., Rgb | undefined, Rgb | null, Nullable<Rgb>
    if (!returnTypeAnnotation) return false;

    const typeAnnotation = returnTypeAnnotation.typeAnnotation;

    // Check for union type with undefined/null
    if (typeAnnotation.type === 'TSUnionType') {
        return typeAnnotation.types.some(t =>
            (t.type === 'TSUndefinedKeyword') ||
            (t.type === 'TSNullKeyword')
        );
    }

    // Check for Nullable<T> generic
    if (typeAnnotation.type === 'TSTypeReference' &&
        typeAnnotation.typeName?.name === 'Nullable') {
        return true;
    }

    return false;
}

