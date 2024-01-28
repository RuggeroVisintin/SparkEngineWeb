const bench = require('fastbench');
import { HierarchySystem, TransformComponent } from "../../src";

const hierarchySystem = new HierarchySystem();

export default bench([
    function HierarchyRegisterComponent(done: Function) {
        hierarchySystem.registerComponent(new TransformComponent());
        done();
    },
    function HierarchyUpdate(done: Function) {
        hierarchySystem.update();
        done();
    }
], 1000);