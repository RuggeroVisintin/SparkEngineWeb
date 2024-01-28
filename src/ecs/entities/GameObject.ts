import { MaterialComponent, ShapeComponent, TransformComponent } from "../components";
import { BaseEntity } from "./BaseEntity";

/**
 * @category Entities
 */
export class GameObject extends BaseEntity {
    public transform = new TransformComponent();
    public shape = new ShapeComponent();
    public material = new MaterialComponent();

    constructor() {
        super();

        this.addComponent(this.transform);
        this.addComponent(this.shape);
        this.addComponent(this.material);
    }
}