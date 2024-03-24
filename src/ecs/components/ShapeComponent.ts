import { Type } from "../../core";
import { Renderer, DrawPrimitiveCommand, DrawImageCommand, PrimitiveType} from "../../renderer";
import { BaseDrawableComponent } from "./ BaseDrawableComponent";
import { MaterialComponent } from "./MaterialComponent";
import { IDrawableComponent } from "./interfaces/IDrawableComponent";

/**
 * @category Components
 */
export interface ShapeComponentProps {
    shapeType?: PrimitiveType;
}

/**
 * Represents a primitive Shape like rectangle, circle, etc
 * 
 * @category Components
 */
@Type('ShapeComponent')
export class ShapeComponent extends BaseDrawableComponent implements IDrawableComponent {
    /**
     * The primitive type of the shape
     */
    public shapeType: PrimitiveType = PrimitiveType.Rectangle;

    private defaultMaterial = new MaterialComponent();

    public get material(): MaterialComponent {
        return this.getContainer()?.getComponent('MaterialComponent') ?? this.defaultMaterial;
    }
    
    public constructor(props?: ShapeComponentProps) {
        super();

        if (props?.shapeType) this.shapeType = props.shapeType;
    }

    /**
     * Put a draw call in the renderer taking into account the component data
     * @param renderer 
     */
    public draw(renderer: Renderer): void {
        const { position, size } = this.transform;
        const { opacity } = this.material;

        renderer.pushRenderCommand(new DrawPrimitiveCommand(
            PrimitiveType.Rectangle,
            [position.x, position.y],
            [size.width, size.height],
            true,
            this.material.diffuseColor.toRgbaString(opacity),
        ));
        
        this.material.diffuseTexture && renderer.pushRenderCommand(new DrawImageCommand(
            this.material.diffuseTexture.media,
            [position.x, position.y],
            [size.width, size.height],
        ));
    }
}