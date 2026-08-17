import { CanvasDevice, DrawPrimitiveCommand, PrimitiveType, RenderCommandID, Renderer } from '../../src';
import { Canvas } from './__mocks__/canvas';
const bench = require('fastbench');

const device = new CanvasDevice();
const ctx = new Canvas().getContext();
const renderer = new Renderer(device, { width: 1920, height: 1080 }, ctx);

// Pre-create commands once outside the benchmark
const preallocatedCommands = Array.from({ length: 500 }, () =>
    new DrawPrimitiveCommand(PrimitiveType.Rectangle, [0, 0], [1, 1], 1, true)
);

export default bench([
    function FullFrameRenderCycle(done: Function) {
        // Push the pre-existing references (isolates buffer and GC overhead)
        for (let i = 0; i < preallocatedCommands.length; i++) {
            renderer.pushRenderCommand(preallocatedCommands[i]);
        }

        renderer.endFrame();
        done();
    }
], 1000);