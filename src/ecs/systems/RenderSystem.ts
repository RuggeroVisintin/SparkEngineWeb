import { typeOf } from "../../core";
import { BlendMethod, ImageLoader } from "../../platform";
import { Renderer, SetBlendingMethodCommand } from "../../renderer";
import { CameraComponent } from "../components";
import { IDrawableComponent } from "../components/interfaces/IDrawableComponent";
import { BaseSystem } from "./BaseSystem";
import { ISystem } from "./ISystem";

/**
 * @category Systems
 */
export class RenderSystem extends BaseSystem<IDrawableComponent> implements ISystem {
    protected _camera: CameraComponent = new CameraComponent();

    public get camera(): CameraComponent {
        return this._camera;
    }

    constructor(
        public readonly renderer: Renderer,
        protected readonly imageLoader: ImageLoader
    ) {
        super();
    }

    public registerComponent(component: IDrawableComponent): void {
        if (component instanceof CameraComponent) {
            this._camera = <CameraComponent>component;
        } else {
            super.registerComponent(component);
        }
    }

    public unregisterComponent(uuid: string): void {
        if (this._camera.uuid === uuid) {
            this._camera = new CameraComponent();
        }

        super.unregisterComponent(uuid);
    }

    protected internalUpdate(): void {
        // TODO: use BM_Add by default to handle transparency correctly
        this.renderer.pushRenderCommand(new SetBlendingMethodCommand(BlendMethod.BM_Overwrite));

        this._camera.draw(this.renderer);

        this.components
            .sort((prevComponent, currentComponent) => currentComponent.transform.depthIndex - prevComponent.transform.depthIndex)
            .forEach(component => component.draw(this.renderer, this.imageLoader));
    }
}