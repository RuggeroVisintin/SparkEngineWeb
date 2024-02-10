import { BoundingBoxComponent, HierarchySystem, IEntity, InputComponent, InputSystem, PhysicsSystem, RenderSystem, ShapeComponent, SoundComponent, SoundSystem, TransformComponent } from "../ecs";

export class Scene {
    public readonly entities: IEntity[] = [];

    public constructor(
        public readonly renderSystem: RenderSystem,
        public readonly physicsSystem: PhysicsSystem,
        public readonly inputSystem: InputSystem,
        public readonly hierarchySystem: HierarchySystem,
        public readonly soundSystem: SoundSystem
    ) { }
    
    public registerEntity(entity: IEntity) {
        this.entities.push(entity);

        // TODO: add entity.getComponents<T> and iterate through each component and register it
        const shape = entity.getComponent<ShapeComponent>('ShapeComponent');
        shape && this.renderSystem.registerComponent(shape);

        const boundingBox = entity.getComponent<BoundingBoxComponent>('BoundingBoxComponent');
        boundingBox && this.physicsSystem.registerComponent(boundingBox);
    
        const inputComponent = entity.getComponent<InputComponent>('InputComponent');
        inputComponent && this.inputSystem.registerComponent(inputComponent);

        const transformComponent = entity.getComponent<TransformComponent>('TransformComponent');
        transformComponent && this.hierarchySystem.registerComponent(transformComponent);
    
        const soundComponent = entity.getComponent<SoundComponent>('SoundComponent');
        soundComponent && this.soundSystem.registerComponent(soundComponent);
    }
}