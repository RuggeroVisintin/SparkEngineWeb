import { Type } from "../../core";
import { BaseComponent } from "./BaseComponent";
import { MaterialComponentProps } from "./MaterialComponent";

export interface AnimationFrame {
    duration: number;
    material?: MaterialComponentProps;
}

/**
 * @category Components
 */
@Type('AnimationComponent')
export class AnimationComponent extends BaseComponent {

    // TODO: the update of this component applies the given properties
    // on the component presents on the parent if present

    public update(): void {
        
    }
}