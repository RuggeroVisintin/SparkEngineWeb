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
    isWireframe?: boolean;
}

/**
 * Represents a primitive Shape like rectangle, circle, etc
 * 
 * @category Components
 */
@Type('ShapeComponent')
export class ShapeComponent extends BaseDrawableComponent implements IDrawableComponent, ShapeComponentProps {
    /**
     * The primitive type of the shape
     */
    public shapeType: PrimitiveType = PrimitiveType.Rectangle;

    /**
     * Whether to render the primitive mesh as a Wireframe or as a full mesh
     */
    public isWireframe = false;

    private defaultMaterial = new MaterialComponent();

    public get material(): MaterialComponent {
        return this.getContainer()?.getComponent('MaterialComponent') ?? this.defaultMaterial;
    }
    
    public constructor(props?: ShapeComponentProps) {
        super();

        if (props?.shapeType) this.shapeType = props.shapeType;
        if (props?.isWireframe) this.isWireframe = props.isWireframe;
    }

    /**
     * Put a draw call in the renderer taking into account the component data
     * @param renderer 
     */
    public draw(renderer: Renderer): void {
        const { position, size } = this.transform;
        const { opacity, diffuseColor, diffuseTexture} = this.material;

        diffuseColor && renderer.pushRenderCommand(new DrawPrimitiveCommand(
            PrimitiveType.Rectangle,
            [position.x, position.y],
            [size.width, size.height],
            !this.isWireframe,
            diffuseColor.toRgbaString(opacity),
        ));

        diffuseTexture && renderer.pushRenderCommand(new DrawImageCommand(
            diffuseTexture.media,
            [position.x, position.y],
            [size.width, size.height],
            opacity,
        ));
        
    }
}