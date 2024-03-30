import { Type, typeOf } from "../../core";
import { BaseComponent } from "./BaseComponent";
import { MaterialComponent, MaterialComponentProps } from "./MaterialComponent";

/**
 * @category Components
 */
export interface AnimationFrame {
    duration: number;
    material?: MaterialComponentProps;
}

/**
 * @category Components
 */
export interface AnimationComponentProps {
    frames: AnimationFrame[];
}

/**
 * @category Components
 */
@Type('AnimationComponent')
export class AnimationComponent extends BaseComponent {
    private _frames: AnimationFrame[];
    private _currentFrame: number = 0;
    private _accumulatedDeltaTime: number = 0;

    public get frames(): AnimationFrame[] { 
        return this._frames;
    }

    public get currentFrame(): number {
        return this._currentFrame;
    }

    constructor(props: AnimationComponentProps) {
        super();

        this._frames = props.frames;
    }

    public update(deltaTime: number): void {
        this._accumulatedDeltaTime += deltaTime;

        if (this._accumulatedDeltaTime > this._frames[this._currentFrame].duration) {
            this._accumulatedDeltaTime = 0;
            this._currentFrame = (this._currentFrame + 1) % this._frames.length;
        }
        
        const currentFrame = this._frames[this._currentFrame];
        const parentMaterial = this.getContainer()?.getComponent<MaterialComponent>('MaterialComponent');
        
        if (currentFrame.material?.diffuseColor && parentMaterial) {
            parentMaterial.diffuseColor = currentFrame.material.diffuseColor;
        }
        
        if (currentFrame.material?.diffuseTexturePath && parentMaterial) {
            parentMaterial.diffuseTexturePath = currentFrame.material.diffuseTexturePath;
        }
        
        if (currentFrame.material?.opacity && parentMaterial) {
            parentMaterial.opacity = currentFrame.material.opacity;
        }
    }
}