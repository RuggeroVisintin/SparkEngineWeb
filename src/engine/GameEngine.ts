import { HierarchySystem, InputSystem, PhysicsSystem, RenderSystem, SoundSystem } from "../ecs";
import { Physx } from "../physx";
import { CanvasDevice, KeyboardDevice } from "../platform";
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
     */
    context: CanvasRenderingContext2D;
    /**
     * The target resolution to use when rendering frames
     */
    resolution: { width: number; height: number };
}

/**
 * Main game engine class. Contains all the systems and components to run the game engine
 * with minimum setup
 * 
 * @category Engine
 */
export class GameEngine {
    private readonly frametime: number;
    private lastTick: number = 0;

    public readonly renderSystem: RenderSystem;
    public readonly physicsSystem: PhysicsSystem;
    public readonly hierarchySystem: HierarchySystem;
    public readonly inputSystem: InputSystem;
    public readonly soundSystem: SoundSystem;

    private readonly physx: Physx;
    private readonly renderer: Renderer;
    private readonly context: CanvasRenderingContext2D;
    private readonly inputs: KeyboardDevice

    /**
     * The list of scenes to render
     */
    public readonly scenes: Scene[] = [];

    /**
     * @param config - The configuration to use for this instance of GameEngine
     */
    constructor(config: GameEngineOptions) {
        this.frametime = parseFloat((1000 / config.framerate).toFixed(2));
        this.context = config.context;

        this.physx = new Physx();
        this.renderer = new Renderer(new CanvasDevice(), config.resolution, this.context);
        this.inputs = new KeyboardDevice();

        this.renderSystem = new RenderSystem(this.renderer);
        this.physicsSystem = new PhysicsSystem(this.physx);
        this.hierarchySystem = new HierarchySystem();
        this.inputSystem = new InputSystem(this.inputs);
        this.soundSystem = new SoundSystem();
    }

    /**
     * Starts the main loop of the engine
     */
    public run(): void {
        this.lastTick = performance.now();
        this.tick();
    }

    public createScene(): Scene {
        const result = new Scene(
            this.renderSystem,
            this.physicsSystem,
            this.inputSystem,
            this.hierarchySystem,
            this.soundSystem
        );

        this.scenes.push(result);

        return result;
    }

    private tick(): void {
        requestAnimationFrame(this.tick.bind(this));

        const currentTime = performance.now();
        const elapsedTime = currentTime - this.lastTick;

        if (elapsedTime < this.frametime) return;
        
        this.inputSystem.update();
        this.soundSystem.update();
        
        this.physicsSystem.update();
        this.physx.simulate();
        
        setTimeout(() => {
            this.hierarchySystem.update(elapsedTime);
            
            this.renderSystem.update();
            this.renderer.endFrame(this.context);

            const excessTime = elapsedTime % this.frametime;
            this.lastTick = currentTime - excessTime;
        }, 5)
        
    }
}