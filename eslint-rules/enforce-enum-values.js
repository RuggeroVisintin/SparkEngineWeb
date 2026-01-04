/**
 * ESLint rule that prevents TypeScript `enum` declarations.
 *
 * Enforces the use of class-based enums (BaseEnum subclasses) instead of
 * TypeScript's native enum syntax.
 *
 * @example
 * // ✅ Good - Use class-based enum
 * class BlendMethod extends BaseEnum {
 *     static readonly Overwrite = new BlendMethod('source-over');
 * }
 *
 * // ❌ Bad - Using TypeScript enum
 * enum BlendMethod { Overwrite = 'source-over' }
 */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Prevent TypeScript enum declarations, use class-based enums (BaseEnum) instead',
            category: 'Best Practices',
            recommended: true
        },
        messages: {
            noNativeEnum: 'TypeScript `enum` is not allowed. Use class-based enums extending BaseEnum instead'
        },
        schema: []
    },
    create(context) {
        return {
            TSEnumDeclaration: (node) => {
                context.report({
                    node,
                    messageId: 'noNativeEnum'
                });
            }
        };
    }
};
