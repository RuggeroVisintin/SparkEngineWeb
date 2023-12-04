import { CanvasDevice } from '../platform';
import { CanvasContext2D } from '../platform/gfx/CanvasContext2D';
import { RenderCommand } from './RenderCommand';

/**
 * The renderer is responsible for collecting renderCommands and
 * execute them in the right order based on the information they carry on.
 * 
 * Furthermore it also abstracts away the complexity of how the gfx device work under the hood 
 * from the renderSystem
 */
export class Renderer {
    private _commandBuffer: RenderCommand[] = [];

    public get commandBuffer(): RenderCommand[] {
        return this._commandBuffer;
    }

    public constructor(public readonly device: CanvasDevice) {}

    public pushRenderCommand(command: RenderCommand): void {
        this._commandBuffer.push(command);
    }

    public endFrame(context: CanvasRenderingContext2D): void {
        this._commandBuffer.forEach(command => command.execute(context, this.device));
        this._commandBuffer = [];
    }
}