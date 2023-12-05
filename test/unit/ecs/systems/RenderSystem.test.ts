import { RenderSystem, ShapeComponent } from "../../../../src"

describe('systems/RenderSystem', () => {
    describe('.registerComponent()', () => {
        const renderSystem = new RenderSystem();
        const myTestShape = new ShapeComponent();

        it('Should register the component into the RenderSystem components list', () => {
            renderSystem.registerComponent(myTestShape);

            expect(renderSystem.components).toContain(myTestShape);
        })
    })
})