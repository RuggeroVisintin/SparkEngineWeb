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

    public pushRenderCommand(command: RenderCommand): void {
        this._commandBuffer.push(command);
    }

    public endFrame(): void {
        this._commandBuffer = [];
    }
}