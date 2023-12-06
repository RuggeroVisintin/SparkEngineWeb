import { Renderer } from "../../renderer";
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
        this.components
            .sort((prevComponent, currentComponent) => currentComponent.transform.depthIndex - prevComponent.transform.depthIndex)
            .forEach(component => component.draw(this.renderer));
    }
}