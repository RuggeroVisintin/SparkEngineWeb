/**
 * ESLint rule wrapper that exempts classes extending Enum from naming convention checks.
 *
 * This rule wraps @typescript-eslint/naming-convention to skip static properties
 * in classes that extend Enum, allowing them custom naming like BM_Overwrite.
 */

// Import the original naming-convention rule
const typescriptEslintNamingConvention = require('@typescript-eslint/eslint-plugin').rules['naming-convention'];

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Naming convention with Enum class exemption',
            category: 'Stylistic Issues',
            recommended: true
        },
        ...typescriptEslintNamingConvention.meta,
    },
    create(context, options) {
        /**
         * Check if a class extends Enum
         */
        function extendsEnum(classNode) {
            if (!classNode.superClass) return false;

            // Handle simple identifier: extends Enum
            if (classNode.superClass.type === 'Identifier') {
                return classNode.superClass.name === 'Enum';
            }

            // Handle generic: extends Enum<T>
            if (classNode.superClass.type === 'TSInstantiationExpression') {
                const expression = classNode.superClass.expression;
                if (expression.type === 'Identifier' && expression.name === 'Enum') {
                    return true;
                }
            }

            return false;
        }

        // Helper to check if a node is inside an Enum class
        function isInEnumClass(node) {
            let current = node;
            while (current) {
                if (current.type === 'ClassDeclaration' && extendsEnum(current)) {
                    return true;
                }
                current = current.parent;
            }
            return false;
        }

        // Get the original rule's handlers FIRST with the original context
        const originalHandlers = typescriptEslintNamingConvention.create(context, options);

        // Now wrap the handlers to skip Enum classes
        const wrappedHandlers = {};
        
        for (const [key, handler] of Object.entries(originalHandlers)) {
            if (typeof handler === 'function') {
                wrappedHandlers[key] = function(node) {
                    // Skip checking if node is inside an Enum class
                    if (isInEnumClass(node)) {
                        return;
                    }
                    // Otherwise, call the original handler
                    return handler.call(this, node);
                };
            } else {
                wrappedHandlers[key] = handler;
            }
        }
        
        return wrappedHandlers;
    }
};
