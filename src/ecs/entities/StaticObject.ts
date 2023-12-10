import { BoundingBoxComponent } from "../components";
import { GameObject } from "./GameObject";

export class StaticObject extends GameObject {
    public boundingBox = new BoundingBoxComponent();
}