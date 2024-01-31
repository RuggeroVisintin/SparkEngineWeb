import { HierarchySystem, InputSystem, PhysicsSystem, RenderSystem } from "../ecs";
import { Physx } from "../physx";
import { CanvasDevice, KeyboardDevice } from "../platform";
import { Renderer } from "../renderer";

export interface GameEngineOptions {
    framerate: number;
    context: CanvasRenderingContext2D;
    resolution: { width: number; height: number };
}

export class GameEngine {
    private readonly frametime: number;

    public readonly renderSystem: RenderSystem;
    public readonly physicsSystem: PhysicsSystem;
    public readonly hierarchySystem: HierarchySystem;
    public readonly inputSystem: InputSystem;

    private readonly physx: Physx;
    private readonly renderer: Renderer;
    private readonly context: CanvasRenderingContext2D;
    private readonly inputs: KeyboardDevice

    constructor(config: GameEngineOptions) {
        this.frametime = Math.abs(1000 / config.framerate);
        this.context = config.context;

        this.physx = new Physx();
        this.renderer = new Renderer(new CanvasDevice(), config.resolution, this.context);
        this.inputs = new KeyboardDevice();

        this.renderSystem = new RenderSystem(this.renderer);
        this.physicsSystem = new PhysicsSystem(this.physx);
        this.hierarchySystem = new HierarchySystem();
        this.inputSystem = new InputSystem(this.inputs);
    }

    public run(): void {
        setInterval(() => this.tick(), this.frametime);
    }

    private tick(): void {
        this.inputSystem.update();
        this.hierarchySystem.update();

        this.physicsSystem.update();
        this.physx.simulate();

        this.renderSystem.update();
        this.renderer.endFrame(this.context);
    }
}