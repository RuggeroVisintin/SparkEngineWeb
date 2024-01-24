import { Physx } from '../../src/physx';
const bench = require('fastbench');

const physxEngine = new Physx();

export default bench([
    function addComponents(done: Function) {
        physxEngine.pushPhysicalObject({
            object: {
                aabb: [Math.random(), Math.random(), Math.random(), Math.random()]
            },
            onCollisionCallback: () => { }
        })

        done();
    },
    function simulate(done: Function) {
        physxEngine.simulate();

        done();
    }
], 1000);