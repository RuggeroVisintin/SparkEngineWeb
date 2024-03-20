import { BlendMethod } from "../../platform";
import { Renderer, SetBlendingMethodCommand } from "../../renderer";
import { ShapeComponent } from "../components";
import { IDrawableComponent } from "../components/interfaces/IDrawableComponent";
import { ISystem } from "./ISystem";

/**
 * @category Systems
 */
export class RenderSystem implements ISystem { 
    public readonly components: IDrawableComponent[] = [];

    constructor(
        private readonly renderer: Renderer
    ) {}

    public registerComponent(component: ShapeComponent): void {
        this.components.push(component);
    }

    public update(): void {
        // overwrite by default to avoid needless operations on non transparent object
        // is there really a perf advantage? I believe so, will measuring this in a perf test
        this.renderer.pushRenderCommand(new SetBlendingMethodCommand(BlendMethod.BM_Overwrite));

        this.components
            .sort((prevComponent, currentComponent) => currentComponent.transform.depthIndex - prevComponent.transform.depthIndex)
            .forEach(component => component.draw(this.renderer));
    }
}