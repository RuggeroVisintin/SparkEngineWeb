import { RenderCommand } from './RenderCommand';

export class Renderer {
    public readonly commandBuffer: RenderCommand[] = [];

    public pushRenderCommand(command: RenderCommand): void {
        this.commandBuffer.push(command);
    }
}