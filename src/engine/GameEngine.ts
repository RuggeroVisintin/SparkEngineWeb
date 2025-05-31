import { AnimationSystem, HierarchySystem, InputSystem, PhysicsSystem, RenderSystem, SoundSystem } from "../ecs";
import { Physx } from "../physx";
import { CanvasDevice, ImageLoader, DOMImageLoader, KeyboardDevice } from "../platform";
import { Renderer } from "../renderer";
import { Scene } from "./Scene";

/**
 * @category Engine
 */
export interface GameEngineOptions {
    /**
     * The target framerate of the game engine
     */
    framerate: number;
    /**
     * The context where to render the frames
     * @todo remove from contstructor arguments
     */
    context: CanvasRenderingContext2D;
    /**
     * The target resolution to use when rendering frames
     */
    resolution: { width: number; height: number };

    /**
     * The number of physics cycles to run per frame. Defaults to 2
     */
    physicsCycles?: number;

    /**
     * The image loader to use for loading images
     */
    imageLoader?: ImageLoader;

    /**
     * The factory function to use for adding additional render systems.
     */
    additionalRenderSystems?: (renderer: Renderer, imageLoader: ImageLoader) => RenderSystem[];
}

/**
 * Main game engine class. Contains all the systems and components to run the game engine
 * with minimum setup
 * 
 * @category Engine
 */
export class GameEngine {
    private readonly frametime: number;
    private readonly physicsCycles: number;
    private lastTick: number = 0;

    private readonly physx: Physx;
    private readonly context: CanvasRenderingContext2D;
    private readonly inputs: KeyboardDevice;
    public readonly renderer: Renderer;

    public readonly renderSystems: RenderSystem[];
    public readonly physicsSystem: PhysicsSystem;
    public readonly hierarchySystem: HierarchySystem;
    public readonly inputSystem: InputSystem;
    public readonly soundSystem: SoundSystem;
    public readonly animationSystem: AnimationSystem;

    public readonly imageLoader: ImageLoader;

    /**
     * @param config - The configuration to use for this instance of GameEngine
     */
    constructor(config: GameEngineOptions) {
        this.frametime = parseFloat((1000 / config.framerate).toFixed(2));
        this.physicsCycles = config.physicsCycles ?? 2;
        this.context = config.context;

        this.physx = new Physx();
        this.renderer = new Renderer(new CanvasDevice(), config.resolution, this.context);
        this.inputs = new KeyboardDevice();

        this.imageLoader = config.imageLoader ?? new DOMImageLoader();

        this.renderSystems = [new RenderSystem(this.renderer, this.imageLoader)].concat(
            config.additionalRenderSystems ? config.additionalRenderSystems(this.renderer, this.imageLoader) : []
        );
        this.physicsSystem = new PhysicsSystem(this.physx);
        this.hierarchySystem = new HierarchySystem();
        this.inputSystem = new InputSystem(this.inputs);
        this.soundSystem = new SoundSystem();
        this.animationSystem = new AnimationSystem();
    }

    // TODO: pass the context as parameter in the method
    /**
     * Starts the main loop of the engine
     */
    public run(): void {
        // TODO: this.renderer.init()

        this.lastTick = performance.now();
        this.tick();
    }

    private tick(): void {
        // Review this technique, I don't think it provides a smooth frametime
        requestAnimationFrame(this.tick.bind(this));

        const currentTime = performance.now();
        const elapsedTime = currentTime - this.lastTick;

        if (elapsedTime < this.frametime) return;
        
        this.inputSystem.update();
        
        this.animationSystem.update(elapsedTime);

        this.hierarchySystem.update(elapsedTime);
        
        this.physicsSystem.update();
        this.physx.simulate(this.physicsCycles);
       
        this.soundSystem.update();
        // this.hierarchySystem.update(elapsedTime);
            
        this.renderSystems.forEach(renderSystem => renderSystem.update());
        this.renderer.endFrame(this.context);

        const excessTime = elapsedTime % this.frametime;
        this.lastTick = currentTime - excessTime;
    }
}