import { v4 as uuid } from 'uuid';
import { registerUnique, typeOf, unregisterUnique, WithType } from "../core";
import { AnimationSystem, EntityProps, HierarchySystem, IEntity, ISystem, InputSystem, PhysicsSystem, RenderSystem, SoundSystem } from "../ecs";
import { create } from "../core/factory";

/**
 * @category Engine
 */
export interface SceneJsonProps {
    entities: Record<string, WithType<EntityProps>>;
}

/**
 * A game scene
 * 
 * @category Engine
 */
export class Scene {
    private _componentTypes = {
        ShapeComponent: this.renderSystem,
        CameraComponent: this.renderSystem,
        BoundingBoxComponent: this.physicsSystem,
        InputComponent: this.inputSystem,
        TransformComponent: this.hierarchySystem,
        SoundComponent: this.soundSystem,
        AnimationComponent: this.animationSystem
    }

    private _entities: IEntity[] = [];

    public get entities(): IEntity[] {
        return this._entities;
    };

    public readonly uuid: string = uuid();

    public constructor(
        public readonly renderSystem: RenderSystem,
        public readonly physicsSystem: PhysicsSystem,
        public readonly inputSystem: InputSystem,
        public readonly hierarchySystem: HierarchySystem,
        public readonly soundSystem: SoundSystem,
        public readonly animationSystem: AnimationSystem
    ) { }

    /**
     * Adds entity to the scene and registers the entity's components into the corrispective systems
     * 
     * @param entity - The entity to register
     */
    public registerEntity(entity: IEntity) {
        registerUnique(entity.name, {
            scope: this.uuid
        });

        this.entities.push(entity);

        Object.entries(this._componentTypes).map(([componentType, system]) => {
            const component = entity.getComponent(componentType);
            component && (<ISystem>system).registerComponent(component);
        });
    }

    /**
     * Removes entity from the scene. Also removes the entity's components from the corrispective systems
     * 
     * @param uuid - The uuid of the entity to unregister
     */
    public unregisterEntity(uuid: string) {
        const entityIndex = this.entities.findIndex(entity => entity.uuid === uuid);

        if (entityIndex === -1) {
            return;
        }

        const [entity] = this.entities.splice(entityIndex, 1);

        unregisterUnique(entity.name, {
            scope: this.uuid
        });

        Object.entries(this._componentTypes).map(([componentType, system]) => {
            const component = entity.getComponent(componentType);
            component && system.unregisterComponent(component.uuid);
        });
    }

    /**
     * Loads the scene from a given file path
     * 
     * @param filePath path of the scene file to load
     * 
     */
    public async loadFromFile(filePath: string): Promise<void> {
        const response = await fetch(filePath);

        const scene = await response.json();

        this.loadFromJson(scene);
    }

    /**
     * Loads the scene from a given json object
     * 
     * @param sceneProps the json object representing the scene
     * 
     */
    public loadFromJson(sceneProps: SceneJsonProps): void {
        this._entities = [];

        Object.entries(sceneProps.entities).forEach(([name, value]) => {
            const entity = create<IEntity>(typeOf(value), {
                ...value as Record<string, any>,
                name
            });

            this.registerEntity(entity);
        });
    }

    public toJson(): SceneJsonProps {
        let entities: Record<string, WithType<EntityProps>> = {};

        this._entities.forEach(entity => {
            entities[entity.name] = entity.toJson();
        });

        return {
            entities
        }
    }
        
}