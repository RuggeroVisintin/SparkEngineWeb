import { typeOf } from "../core";
import { BoundingBoxComponent, HierarchySystem, IEntity, InputComponent, InputSystem, PhysicsSystem, RenderSystem, ShapeComponent, SoundComponent, SoundSystem, TransformComponent } from "../ecs";
import { createEntity } from "../ecs/entities/factory";

/**
 * A game scene
 * 
 * @category Engine
 */
export class Scene {
    public readonly entities: IEntity[] = [];

    public constructor(
        public readonly renderSystem: RenderSystem,
        public readonly physicsSystem: PhysicsSystem,
        public readonly inputSystem: InputSystem,
        public readonly hierarchySystem: HierarchySystem,
        public readonly soundSystem: SoundSystem,
    ) { }
    
    /**
     * Registers the entity's components into the corrispective systems
     * 
     * @param entity - The entity to register
     */
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

    public async load(filePath: string): Promise<void> {
        const response = await fetch(filePath);
        
        const scene = await response.json();

        Object.entries(scene.entities).forEach(([name, value]) => {
            const entity = createEntity(typeOf(value), {
                ...value as Record<string, any>,
                name
            });
            
            this.registerEntity(entity);
        });
    }
}