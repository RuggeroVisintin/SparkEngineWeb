import { Type, WithType } from "../../core";
import { ImageAsset, ImageLoader } from "../../platform";
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
    private _isPlaying: boolean = false;

    private _frameAssets: Record<string, ImageAsset> = {};

    public get frames(): AnimationFrame[] { 
        return this._frames;
    }

    public get currentFrame(): number {
        return this._currentFrame;
    }

    public get isPlaying(): boolean { 
        return this._isPlaying;
    }

    constructor(props: AnimationComponentProps) {
        super();

        this._frames = props.frames;
    }

    public loadAssets(loader: ImageLoader): void {
        for (const frame of this._frames) {
            if (frame.material?.diffuseTexturePath) {
                loader.load(frame.material.diffuseTexturePath)
                    .then((asset) => {
                        this._frameAssets[frame.material!.diffuseTexturePath!] = asset;
                    })            
            }
        }
    }

    public pause(): void {
        this._isPlaying = false;
    }

    public play(): void {
        this._isPlaying = true;
    }

    public stop(): void {
        this._isPlaying = false;
        this._currentFrame = 0;
        this._accumulatedDeltaTime = 0;

        this.applyAnimation();
    }

    public update(deltaTime: number): void {     
        if (this._frames.length === 0) return;

        this._accumulatedDeltaTime += deltaTime;

        if (this._accumulatedDeltaTime > this._frames[this._currentFrame].duration) {
            this._accumulatedDeltaTime = 0;
            this._currentFrame = (this._currentFrame + 1) % this._frames.length;
        }
        
        this.applyAnimation();        
    }

    public toJson(): WithType<AnimationComponentProps> {
        return {
            ...super.toJson(),
            frames: [...this._frames]
        }
    }

    private applyAnimation() {
        const currentFrame = this._frames[this._currentFrame];
        const parentMaterial = this.getContainer()?.getComponent<MaterialComponent>('MaterialComponent');
        
        if (currentFrame.material?.diffuseColor && parentMaterial) {
            parentMaterial.diffuseColor = currentFrame.material.diffuseColor;
        }
        
        if (currentFrame.material?.diffuseTexturePath && parentMaterial) {
            parentMaterial.diffuseTexturePath = currentFrame.material.diffuseTexturePath;
            parentMaterial.diffuseTexture = this._frameAssets[currentFrame.material.diffuseTexturePath];
        }
        
        if (currentFrame.material?.opacity && parentMaterial) {
            parentMaterial.opacity = currentFrame.material.opacity;
        }
    }
}