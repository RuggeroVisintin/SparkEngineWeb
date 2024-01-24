const bench = require('fastbench');
import { HierarchySystem, TransformComponent } from "../../src";

const hierarchySystem = new HierarchySystem();

export default bench([
    function hierarchyRegisterComponent(done: Function) {
        hierarchySystem.registerComponent(new TransformComponent());
        done();
    },
    function hierarchyUpdate(done: Function) {
        hierarchySystem.update();
        done();
    }
], 1000);