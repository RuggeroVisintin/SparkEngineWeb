/**
 * ESLint rule that prevents TypeScript `enum` declarations and enforces
 * class-based enums to use `static readonly` for enum members.
 *
 * Enforces the use of class-based enums (Enum subclasses) instead of
 * TypeScript's native enum syntax, and ensures enum members are declared
 * as `static readonly`.
 *
 * @example
 * // ✅ Good - Use class-based enum with static readonly
 * class BlendMethod extends Enum {
 *     static readonly Overwrite = new BlendMethod('source-over');
 * }
 *
 * // ❌ Bad - Using TypeScript enum
 * enum BlendMethod { Overwrite = 'source-over' }
 *
 * // ❌ Bad - Static member without readonly
 * class BlendMethod extends Enum {
 *     static Overwrite = new BlendMethod('source-over');
 * }
 */
module.exports = {
    meta: {
        type: 'problem',
        fixable: 'whitespace',
        docs: {
            description: 'Prevent TypeScript enum declarations, use class-based enums (Enum) with static readonly members',
            category: 'Best Practices',
            recommended: true
        },
        messages: {
            noNativeEnum: 'TypeScript `enum` is not allowed. Use class-based enums extending Enum instead',
            staticEnumMemberMustBeReadonly: 'Static enum members must be declared as `static readonly`'
        },
        schema: []
    },
    create(context) {
        let classExtendsEnum = false;

        return {
            TSEnumDeclaration: (node) => {
                context.report({
                    node,
                    messageId: 'noNativeEnum'
                });
            },
            ClassDeclaration: (node) => {
                // Check if class extends Enum
                classExtendsEnum = node.superClass && (
                    (node.superClass.name === 'Enum') ||
                    (node.superClass.type === 'TSAsExpression' &&
                        node.superClass.expression.name === 'Enum')
                );
            },
            'ClassDeclaration:exit': () => {
                classExtendsEnum = false;
            },
            PropertyDefinition: (node) => {
                if (classExtendsEnum && node.static && !node.readonly) {
                    context.report({
                        node,
                        messageId: 'staticEnumMemberMustBeReadonly',
                        fix(fixer) {
                            const sourceCode = context.sourceCode;
                            const staticToken = sourceCode.getFirstToken(node);

                            // Insert 'readonly ' after 'static'
                            return fixer.insertTextAfter(staticToken, ' readonly');
                        }
                    });
                }
            }
        };
    }
};
