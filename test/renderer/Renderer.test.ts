import { RenderCommandID, PrimitiveType,Renderer } from "../../src";

describe('renderer/Renderer', () => {
    const renderer = new Renderer();

    describe('.pushRenderCommand()', () => {
        it('Should push a render command into the rendering queue', () => {
            const renderCommand = {
                renderCommandID: RenderCommandID.RC_DrawPrimitive,
                primitiveType: PrimitiveType.Rectangle,
                position: [0, 0],
                size: [0, 0]
            };

            renderer.pushRenderCommand(renderCommand);
            expect(renderer.commandBuffer).toContain(renderCommand);
        });
    });
});