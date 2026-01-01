/**
 * ESLint rule to forbid readonly properties in component classes.
 * Components must use getters for readonly properties to enable runtime detectability via PropertyScope.
 */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Forbid readonly keyword in component classes - use getter pattern instead',
            category: 'Best Practices'
        },
        messages: {
            noReadonly: 'Component classes must use getter pattern instead of readonly keyword for runtime property detectability'
        }
    },
    create(context) {
        return {
            ClassDeclaration(node) {
                // Check if class has @Component decorator or extends BaseComponent
                const isComponent = isComponentClass(node);
                if (!isComponent) return;

                // Check all properties for readonly modifier
                for (const property of node.body.body) {
                    if (property.type === 'PropertyDefinition' && property.readonly) {
                        // Only flag public readonly properties
                        const isPublic = !property.key.name.startsWith('_') &&
                            (!property.accessibility || property.accessibility === 'public');

                        if (isPublic) {
                            context.report({
                                node: property,
                                messageId: 'noReadonly'
                            });
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
