import { ISystem } from "./ISystem";
import { InputComponent } from '../components';
import { KeyboardDevice } from "../../platform";

/**
 * @category Systems
 */
export class InputSystem implements ISystem {
    public readonly components: InputComponent[] = [];

    constructor(private readonly inputDevice: KeyboardDevice) {}

    public update(): void {
        this.components.forEach(inputComponent => inputComponent.update(this.inputDevice));

        // TODO: void calling update here
        this.inputDevice.update();
    }

    public registerComponent(component: InputComponent): void {
        this.components.push(component);
    }
}