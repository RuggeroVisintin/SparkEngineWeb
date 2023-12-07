import { BlendMethod } from "../../platform";
import { Renderer, SetBlendingMethodCommand } from "../../renderer";
import { ShapeComponent } from "../components";
import { ISystem } from "./ISystem";

export class RenderSystem implements ISystem { 
    public readonly components: ShapeComponent[] = [];

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

        // TODO: Do it in a single iteration. this is not really a performant way of doing this, but for now it will suffice
        const opaqueComponents = this.components.filter(component => (component.material.opacity >= 100));
        const transparentComponents = this.components.filter(component => (component.material.opacity < 100));

        opaqueComponents
            .sort((prevComponent, currentComponent) => currentComponent.transform.depthIndex - prevComponent.transform.depthIndex)
            .forEach(component => component.draw(this.renderer));
        
        // Set additive blending for transparent objects
        
        transparentComponents
            .forEach(component => component.draw(this.renderer))
    }
}