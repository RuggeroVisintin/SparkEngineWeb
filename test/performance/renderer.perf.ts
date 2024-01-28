import { CanvasDevice, DrawPrimitiveCommand, PrimitiveType, RenderCommandID, Renderer } from '../../src';
import {Canvas} from './__mocks__/canvas';
const bench = require('fastbench');

const device = new CanvasDevice();
const renderer = new Renderer(device);
const ctx = new Canvas().getContext();

export default bench([
    function RendererPushRenderCommand(done: Function) {
        renderer.pushRenderCommand(new DrawPrimitiveCommand(
            PrimitiveType.Rectangle,
            [Math.random(), Math.random()],
            [Math.random(), Math.random()],
            true
        ));
        done();
    },
    function RendererEndFrame(done: Function) {
        renderer.endFrame(ctx);
        done();
    }
], 1000);