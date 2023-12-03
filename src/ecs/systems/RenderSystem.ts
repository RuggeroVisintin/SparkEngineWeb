import { ShapeComponent } from "../components";
import { ISystem } from "./ISystem";

export class RenderSystem implements ISystem { 
    public readonly components: ShapeComponent[] = []

    public registerComponent(component: ShapeComponent): void {
        this.components.push(component);
    }

    public update(): void {
        throw new Error('NotImplemented');
    }
}