import { RenderCommand } from './RenderCommand';

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