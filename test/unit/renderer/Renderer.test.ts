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

            const spy = jest.spyOn(renderCommand, 'execute');

            renderer.pushRenderCommand(renderCommand);
            renderer.endFrame(ctx);

            expect(spy).toHaveBeenCalled();
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