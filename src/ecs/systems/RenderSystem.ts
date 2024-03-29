import { typeOf } from "../../core";
import { BlendMethod } from "../../platform";
import { Renderer, SetBlendingMethodCommand } from "../../renderer";
import { CameraComponent } from "../components";
import { IDrawableComponent } from "../components/interfaces/IDrawableComponent";
import { BaseSystem } from "./BaseSystem";
import { ISystem } from "./ISystem";

/**
 * @category Systems
 */
export class RenderSystem extends BaseSystem<IDrawableComponent> implements ISystem { 
    private camera: CameraComponent = new CameraComponent();

    constructor(
        private readonly renderer: Renderer
    ) {
        super();
    }

    public registerComponent(component: IDrawableComponent): void {
        if (typeOf(component) === 'CameraComponent') {
            this.camera = <CameraComponent>component;
        } else {
            super.registerComponent(component);
        }
    }

    public update(): void {
        // overwrite by default to avoid needless operations on non transparent object
        // is there really a perf advantage? I believe so, will measuring this in a perf test
        this.renderer.pushRenderCommand(new SetBlendingMethodCommand(BlendMethod.BM_Overwrite));

        this.camera.draw(this.renderer);

        this.components
            .sort((prevComponent, currentComponent) => currentComponent.transform.depthIndex - prevComponent.transform.depthIndex)
            .forEach(component => component.draw(this.renderer));
    }
}