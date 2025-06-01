import { PrimitiveType,Renderer, CanvasDevice } from "../../../src";
import { DrawPrimitiveCommand } from "../../../src/renderer/commands";

describe('renderer/Renderer', () => {
    const device = new CanvasDevice();
    const ctx = new CanvasRenderingContext2D();
    const renderer = new Renderer(device, {width: 1920, height: 1080}, ctx);

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
            renderer.endFrame();

            expect(spy).toHaveBeenCalled();
        })

        it('Should clear the command buffer', () => {
            const renderCommand = new DrawPrimitiveCommand(
                PrimitiveType.Rectangle,
                [0, 0],
                [0, 0]
            )

            renderer.pushRenderCommand(renderCommand);
            renderer.endFrame();

            expect(renderer.commandBuffer).toEqual([]);
            
        });
    });
});