import { CanvasDevice } from '../platform';
import { RenderCommand } from './commands';

/**
 * The renderer is responsible for collecting renderCommands and
 * execute them in the right order based on the information they carry on.
 * 
 * Furthermore it also abstracts away the complexity of how the gfx device work under the hood 
 * from the renderSystem
 * 
 * @category Renderer
 */
export class Renderer {
    private _commandBuffer: RenderCommand[] = [];

    public get commandBuffer(): RenderCommand[] {
        return this._commandBuffer;
    }

    public constructor(
        public readonly device: CanvasDevice,
        public readonly resolution: { width: number, height: number },
        ctx: CanvasRenderingContext2D
    ) { 
        this.device.setResolution(ctx, this.resolution.width, this.resolution.height);
    }

    public pushRenderCommand(command: RenderCommand): void {
        this._commandBuffer.push(command);
    }

    public endFrame(ctx: CanvasRenderingContext2D): void {
        this.device.clear(ctx);

        this._commandBuffer.forEach(command => {
            command.execute(ctx, this.device)
        });

        this._commandBuffer = [];
    }
}