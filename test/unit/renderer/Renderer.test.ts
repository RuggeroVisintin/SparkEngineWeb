import { PrimitiveType,Renderer, DrawPrimitiveCommand, CanvasDevice } from "../../../src";

describe('renderer/Renderer', () => {
    const device = new CanvasDevice();
    const ctx = new CanvasRenderingContext2D();
    const renderer = new Renderer(device);

    describe('.pushRenderCommand()', () => {
        it('Should push a render command into the rendering queue', () => {
            const renderCommand = new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0]
            )

            renderer.pushRenderCommand(renderCommand);
            expect(renderer.commandBuffer).toContain(renderCommand);
        });
    });

    describe('.endFrame()', () => {
        it('Should execute queued rendering commands', () => {
            const renderCommand = new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0]
            );

            // TODO: implement execute interface in renderCommand with gfx as Dependency
            // To abstract the logic of how A command is executed from the renderer

            renderer.pushRenderCommand(renderCommand);
            renderer.endFrame(ctx);
        })

        it('Should clear the command buffer', () => {
            const renderCommand = new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0]
            )

            renderer.pushRenderCommand(renderCommand);
            renderer.endFrame(ctx);

            expect(renderer.commandBuffer).toEqual([]);
            
        });
    });
});