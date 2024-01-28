import { Physx, Vec2 } from '../../src';
const bench = require('fastbench');

const physxEngine = new Physx();

export default bench([
    function PhysxAddComponents(done: Function) {
        physxEngine.pushPhysicalObject({
            object: {
                uuid: 'uuid',
                aabb: [Math.random(), Math.random(), Math.random(), Math.random()],
                velocity: new Vec2(Math.random(), Math.random())
            },
            onCollisionCallback: () => { }
        })

        done();
    },
    function PhysxSimulate(done: Function) {
        physxEngine.simulate();

        done();
    }
], 1000);