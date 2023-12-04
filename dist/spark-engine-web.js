(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SparkEngine"] = factory();
	else
		root["SparkEngine"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/index.ts":
/*!***************************!*\
  !*** ./src/core/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ../core */ "./src/core/index.ts"), exports);


/***/ }),

/***/ "./src/ecs/components/BaseComponent.ts":
/*!*********************************************!*\
  !*** ./src/ecs/components/BaseComponent.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
class BaseComponent {
    getContainer() {
        throw new Error("Method not implemented.");
    }
}
exports.BaseComponent = BaseComponent;


/***/ }),

/***/ "./src/ecs/components/IComponent.ts":
/*!******************************************!*\
  !*** ./src/ecs/components/IComponent.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/ecs/components/ShapeComponent.ts":
/*!**********************************************!*\
  !*** ./src/ecs/components/ShapeComponent.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShapeComponent = void 0;
const RenderCommand_1 = __webpack_require__(/*! ../../renderer/RenderCommand */ "./src/renderer/RenderCommand.ts");
const BaseComponent_1 = __webpack_require__(/*! ./BaseComponent */ "./src/ecs/components/BaseComponent.ts");
/**
 * Represents a primitive Shape like rectangle, circle, etc
 */
class ShapeComponent extends BaseComponent_1.BaseComponent {
    constructor() {
        super(...arguments);
        this.shapeType = RenderCommand_1.PrimitiveType.Rectangle;
    }
}
exports.ShapeComponent = ShapeComponent;


/***/ }),

/***/ "./src/ecs/components/TransformComponent.ts":
/*!**************************************************!*\
  !*** ./src/ecs/components/TransformComponent.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformComponent = void 0;
const BaseComponent_1 = __webpack_require__(/*! ./BaseComponent */ "./src/ecs/components/BaseComponent.ts");
class TransformComponent extends BaseComponent_1.BaseComponent {
    constructor() {
        super(...arguments);
        this.position = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
    }
}
exports.TransformComponent = TransformComponent;


/***/ }),

/***/ "./src/ecs/components/index.ts":
/*!*************************************!*\
  !*** ./src/ecs/components/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./IComponent */ "./src/ecs/components/IComponent.ts"), exports);
__exportStar(__webpack_require__(/*! ./BaseComponent */ "./src/ecs/components/BaseComponent.ts"), exports);
__exportStar(__webpack_require__(/*! ./TransformComponent */ "./src/ecs/components/TransformComponent.ts"), exports);
__exportStar(__webpack_require__(/*! ./ShapeComponent */ "./src/ecs/components/ShapeComponent.ts"), exports);


/***/ }),

/***/ "./src/ecs/entities/BaseEntity.ts":
/*!****************************************!*\
  !*** ./src/ecs/entities/BaseEntity.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntity = void 0;
class BaseEntity {
    constructor() {
        this.components = new Map();
    }
    addComponent(key, component) {
        this.components.set(key, component);
    }
    getComponent(key) {
        return this.components.get(key);
    }
}
exports.BaseEntity = BaseEntity;


/***/ }),

/***/ "./src/ecs/entities/IEntity.ts":
/*!*************************************!*\
  !*** ./src/ecs/entities/IEntity.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/ecs/entities/index.ts":
/*!***********************************!*\
  !*** ./src/ecs/entities/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./BaseEntity */ "./src/ecs/entities/BaseEntity.ts"), exports);
__exportStar(__webpack_require__(/*! ./IEntity */ "./src/ecs/entities/IEntity.ts"), exports);


/***/ }),

/***/ "./src/ecs/index.ts":
/*!**************************!*\
  !*** ./src/ecs/index.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./entities */ "./src/ecs/entities/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./components */ "./src/ecs/components/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./systems */ "./src/ecs/systems/index.ts"), exports);


/***/ }),

/***/ "./src/ecs/systems/ISystem.ts":
/*!************************************!*\
  !*** ./src/ecs/systems/ISystem.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/ecs/systems/RenderSystem.ts":
/*!*****************************************!*\
  !*** ./src/ecs/systems/RenderSystem.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderSystem = void 0;
class RenderSystem {
    constructor() {
        this.components = [];
    }
    registerComponent(component) {
        this.components.push(component);
    }
    update() {
        throw new Error('NotImplemented');
    }
}
exports.RenderSystem = RenderSystem;


/***/ }),

/***/ "./src/ecs/systems/index.ts":
/*!**********************************!*\
  !*** ./src/ecs/systems/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./ISystem */ "./src/ecs/systems/ISystem.ts"), exports);
__exportStar(__webpack_require__(/*! ./RenderSystem */ "./src/ecs/systems/RenderSystem.ts"), exports);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./core */ "./src/core/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./ecs */ "./src/ecs/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./renderer */ "./src/renderer/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./platform */ "./src/platform/index.ts"), exports);


/***/ }),

/***/ "./src/platform/gfx/CanvasDevice.ts":
/*!******************************************!*\
  !*** ./src/platform/gfx/CanvasDevice.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CanvasDevice = void 0;
class CanvasDevice {
    begin(ctx) {
        ctx.beginPath();
    }
    end(ctx) {
        ctx.closePath();
    }
    clear(ctx, color) {
        var _a, _b;
        ctx.clearRect(0, 0, ((_a = ctx.canvas) === null || _a === void 0 ? void 0 : _a.width) || 0, ((_b = ctx.canvas) === null || _b === void 0 ? void 0 : _b.height) || 0);
    }
    drawRect(ctx, x, y, width, height) {
        ctx.rect(x, y, width, height);
    }
    fill(ctx, color) {
        const oldStyle = ctx.fillStyle;
        color && (ctx.fillStyle = color);
        ctx.fill();
        ctx.fillStyle = oldStyle;
    }
    stroke(ctx, color) {
        const oldStyle = ctx.strokeStyle;
        color && (ctx.strokeStyle = color);
        ctx.stroke();
        ctx.strokeStyle = oldStyle;
    }
}
exports.CanvasDevice = CanvasDevice;


/***/ }),

/***/ "./src/platform/gfx/index.ts":
/*!***********************************!*\
  !*** ./src/platform/gfx/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./CanvasDevice */ "./src/platform/gfx/CanvasDevice.ts"), exports);


/***/ }),

/***/ "./src/platform/index.ts":
/*!*******************************!*\
  !*** ./src/platform/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./gfx */ "./src/platform/gfx/index.ts"), exports);


/***/ }),

/***/ "./src/renderer/RenderCommand.ts":
/*!***************************************!*\
  !*** ./src/renderer/RenderCommand.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrawPrimitiveCommand = exports.PrimitiveType = exports.RenderCommandID = void 0;
var RenderCommandID;
(function (RenderCommandID) {
    RenderCommandID[RenderCommandID["RC_DrawPrimitive"] = 0] = "RC_DrawPrimitive";
})(RenderCommandID || (exports.RenderCommandID = RenderCommandID = {}));
var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType[PrimitiveType["Rectangle"] = 0] = "Rectangle";
})(PrimitiveType || (exports.PrimitiveType = PrimitiveType = {}));
class DrawPrimitiveCommand {
    constructor(primitiveType, position, size, fill = true, color = '#d16cd8') {
        this.primitiveType = primitiveType;
        this.position = position;
        this.size = size;
        this.fill = fill;
        this.color = color;
        this.renderCommandID = RenderCommandID.RC_DrawPrimitive;
    }
    execute(ctx, device) {
        device.drawRect(ctx, this.position[0], this.position[1], this.size[0], this.size[1]);
        if (this.fill) {
            device.fill(ctx, this.color);
        }
        else {
            device.stroke(ctx, this.color);
        }
    }
}
exports.DrawPrimitiveCommand = DrawPrimitiveCommand;


/***/ }),

/***/ "./src/renderer/Renderer.ts":
/*!**********************************!*\
  !*** ./src/renderer/Renderer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Renderer = void 0;
/**
 * The renderer is responsible for collecting renderCommands and
 * execute them in the right order based on the information they carry on.
 *
 * Furthermore it also abstracts away the complexity of how the gfx device work under the hood
 * from the renderSystem
 */
class Renderer {
    get commandBuffer() {
        return this._commandBuffer;
    }
    constructor(device) {
        this.device = device;
        this._commandBuffer = [];
    }
    pushRenderCommand(command) {
        this._commandBuffer.push(command);
    }
    endFrame(ctx) {
        this.device.clear(ctx);
        this._commandBuffer.forEach(command => {
            this.device.begin(ctx);
            command.execute(ctx, this.device);
            this.device.end(ctx);
        });
        this._commandBuffer = [];
    }
}
exports.Renderer = Renderer;


/***/ }),

/***/ "./src/renderer/index.ts":
/*!*******************************!*\
  !*** ./src/renderer/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./Renderer */ "./src/renderer/Renderer.ts"), exports);
__exportStar(__webpack_require__(/*! ./RenderCommand */ "./src/renderer/RenderCommand.ts"), exports);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aW5pdGlvbiIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9jb3JlL2luZGV4LnRzIiwid2VicGFjazovL1NwYXJrRW5naW5lLy4vc3JjL2Vjcy9jb21wb25lbnRzL0Jhc2VDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vU3BhcmtFbmdpbmUvLi9zcmMvZWNzL2NvbXBvbmVudHMvSUNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9lY3MvY29tcG9uZW50cy9TaGFwZUNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9lY3MvY29tcG9uZW50cy9UcmFuc2Zvcm1Db21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vU3BhcmtFbmdpbmUvLi9zcmMvZWNzL2NvbXBvbmVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU3BhcmtFbmdpbmUvLi9zcmMvZWNzL2VudGl0aWVzL0Jhc2VFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vU3BhcmtFbmdpbmUvLi9zcmMvZWNzL2VudGl0aWVzL0lFbnRpdHkudHMiLCJ3ZWJwYWNrOi8vU3BhcmtFbmdpbmUvLi9zcmMvZWNzL2VudGl0aWVzL2luZGV4LnRzIiwid2VicGFjazovL1NwYXJrRW5naW5lLy4vc3JjL2Vjcy9pbmRleC50cyIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9lY3Mvc3lzdGVtcy9JU3lzdGVtLnRzIiwid2VicGFjazovL1NwYXJrRW5naW5lLy4vc3JjL2Vjcy9zeXN0ZW1zL1JlbmRlclN5c3RlbS50cyIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9lY3Mvc3lzdGVtcy9pbmRleC50cyIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9wbGF0Zm9ybS9nZngvQ2FudmFzRGV2aWNlLnRzIiwid2VicGFjazovL1NwYXJrRW5naW5lLy4vc3JjL3BsYXRmb3JtL2dmeC9pbmRleC50cyIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9wbGF0Zm9ybS9pbmRleC50cyIsIndlYnBhY2s6Ly9TcGFya0VuZ2luZS8uL3NyYy9yZW5kZXJlci9SZW5kZXJDb21tYW5kLnRzIiwid2VicGFjazovL1NwYXJrRW5naW5lLy4vc3JjL3JlbmRlcmVyL1JlbmRlcmVyLnRzIiwid2VicGFjazovL1NwYXJrRW5naW5lLy4vc3JjL3JlbmRlcmVyL2luZGV4LnRzIiwid2VicGFjazovL1NwYXJrRW5naW5lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NwYXJrRW5naW5lL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vU3BhcmtFbmdpbmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL1NwYXJrRW5naW5lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTcGFya0VuZ2luZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTcGFya0VuZ2luZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuLi9jb3JlXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CYXNlQ29tcG9uZW50ID0gdm9pZCAwO1xuY2xhc3MgQmFzZUNvbXBvbmVudCB7XG4gICAgZ2V0Q29udGFpbmVyKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9XG59XG5leHBvcnRzLkJhc2VDb21wb25lbnQgPSBCYXNlQ29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2hhcGVDb21wb25lbnQgPSB2b2lkIDA7XG5jb25zdCBSZW5kZXJDb21tYW5kXzEgPSByZXF1aXJlKFwiLi4vLi4vcmVuZGVyZXIvUmVuZGVyQ29tbWFuZFwiKTtcbmNvbnN0IEJhc2VDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL0Jhc2VDb21wb25lbnRcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYSBwcmltaXRpdmUgU2hhcGUgbGlrZSByZWN0YW5nbGUsIGNpcmNsZSwgZXRjXG4gKi9cbmNsYXNzIFNoYXBlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudF8xLkJhc2VDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnNoYXBlVHlwZSA9IFJlbmRlckNvbW1hbmRfMS5QcmltaXRpdmVUeXBlLlJlY3RhbmdsZTtcbiAgICB9XG59XG5leHBvcnRzLlNoYXBlQ29tcG9uZW50ID0gU2hhcGVDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVHJhbnNmb3JtQ29tcG9uZW50ID0gdm9pZCAwO1xuY29uc3QgQmFzZUNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQmFzZUNvbXBvbmVudFwiKTtcbmNsYXNzIFRyYW5zZm9ybUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRfMS5CYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICB0aGlzLnNpemUgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcbiAgICB9XG59XG5leHBvcnRzLlRyYW5zZm9ybUNvbXBvbmVudCA9IFRyYW5zZm9ybUNvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vSUNvbXBvbmVudFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vQmFzZUNvbXBvbmVudFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVHJhbnNmb3JtQ29tcG9uZW50XCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9TaGFwZUNvbXBvbmVudFwiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmFzZUVudGl0eSA9IHZvaWQgMDtcbmNsYXNzIEJhc2VFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGFkZENvbXBvbmVudChrZXksIGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KGtleSwgY29tcG9uZW50KTtcbiAgICB9XG4gICAgZ2V0Q29tcG9uZW50KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzLmdldChrZXkpO1xuICAgIH1cbn1cbmV4cG9ydHMuQmFzZUVudGl0eSA9IEJhc2VFbnRpdHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vQmFzZUVudGl0eVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vSUVudGl0eVwiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2VudGl0aWVzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jb21wb25lbnRzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zeXN0ZW1zXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlbmRlclN5c3RlbSA9IHZvaWQgMDtcbmNsYXNzIFJlbmRlclN5c3RlbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IFtdO1xuICAgIH1cbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdEltcGxlbWVudGVkJyk7XG4gICAgfVxufVxuZXhwb3J0cy5SZW5kZXJTeXN0ZW0gPSBSZW5kZXJTeXN0ZW07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL0lTeXN0ZW1cIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1JlbmRlclN5c3RlbVwiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NvcmVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2Vjc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcmVuZGVyZXJcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3BsYXRmb3JtXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYW52YXNEZXZpY2UgPSB2b2lkIDA7XG5jbGFzcyBDYW52YXNEZXZpY2Uge1xuICAgIGJlZ2luKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgfVxuICAgIGVuZChjdHgpIHtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cbiAgICBjbGVhcihjdHgsIGNvbG9yKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgKChfYSA9IGN0eC5jYW52YXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS53aWR0aCkgfHwgMCwgKChfYiA9IGN0eC5jYW52YXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oZWlnaHQpIHx8IDApO1xuICAgIH1cbiAgICBkcmF3UmVjdChjdHgsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgY3R4LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIGZpbGwoY3R4LCBjb2xvcikge1xuICAgICAgICBjb25zdCBvbGRTdHlsZSA9IGN0eC5maWxsU3R5bGU7XG4gICAgICAgIGNvbG9yICYmIChjdHguZmlsbFN0eWxlID0gY29sb3IpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gb2xkU3R5bGU7XG4gICAgfVxuICAgIHN0cm9rZShjdHgsIGNvbG9yKSB7XG4gICAgICAgIGNvbnN0IG9sZFN0eWxlID0gY3R4LnN0cm9rZVN0eWxlO1xuICAgICAgICBjb2xvciAmJiAoY3R4LnN0cm9rZVN0eWxlID0gY29sb3IpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IG9sZFN0eWxlO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2FudmFzRGV2aWNlID0gQ2FudmFzRGV2aWNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9DYW52YXNEZXZpY2VcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9nZnhcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRyYXdQcmltaXRpdmVDb21tYW5kID0gZXhwb3J0cy5QcmltaXRpdmVUeXBlID0gZXhwb3J0cy5SZW5kZXJDb21tYW5kSUQgPSB2b2lkIDA7XG52YXIgUmVuZGVyQ29tbWFuZElEO1xuKGZ1bmN0aW9uIChSZW5kZXJDb21tYW5kSUQpIHtcbiAgICBSZW5kZXJDb21tYW5kSURbUmVuZGVyQ29tbWFuZElEW1wiUkNfRHJhd1ByaW1pdGl2ZVwiXSA9IDBdID0gXCJSQ19EcmF3UHJpbWl0aXZlXCI7XG59KShSZW5kZXJDb21tYW5kSUQgfHwgKGV4cG9ydHMuUmVuZGVyQ29tbWFuZElEID0gUmVuZGVyQ29tbWFuZElEID0ge30pKTtcbnZhciBQcmltaXRpdmVUeXBlO1xuKGZ1bmN0aW9uIChQcmltaXRpdmVUeXBlKSB7XG4gICAgUHJpbWl0aXZlVHlwZVtQcmltaXRpdmVUeXBlW1wiUmVjdGFuZ2xlXCJdID0gMF0gPSBcIlJlY3RhbmdsZVwiO1xufSkoUHJpbWl0aXZlVHlwZSB8fCAoZXhwb3J0cy5QcmltaXRpdmVUeXBlID0gUHJpbWl0aXZlVHlwZSA9IHt9KSk7XG5jbGFzcyBEcmF3UHJpbWl0aXZlQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IocHJpbWl0aXZlVHlwZSwgcG9zaXRpb24sIHNpemUsIGZpbGwgPSB0cnVlLCBjb2xvciA9ICcjZDE2Y2Q4Jykge1xuICAgICAgICB0aGlzLnByaW1pdGl2ZVR5cGUgPSBwcmltaXRpdmVUeXBlO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuZmlsbCA9IGZpbGw7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5yZW5kZXJDb21tYW5kSUQgPSBSZW5kZXJDb21tYW5kSUQuUkNfRHJhd1ByaW1pdGl2ZTtcbiAgICB9XG4gICAgZXhlY3V0ZShjdHgsIGRldmljZSkge1xuICAgICAgICBkZXZpY2UuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdLCB0aGlzLnNpemVbMF0sIHRoaXMuc2l6ZVsxXSk7XG4gICAgICAgIGlmICh0aGlzLmZpbGwpIHtcbiAgICAgICAgICAgIGRldmljZS5maWxsKGN0eCwgdGhpcy5jb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZXZpY2Uuc3Ryb2tlKGN0eCwgdGhpcy5jb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkRyYXdQcmltaXRpdmVDb21tYW5kID0gRHJhd1ByaW1pdGl2ZUNvbW1hbmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVuZGVyZXIgPSB2b2lkIDA7XG4vKipcbiAqIFRoZSByZW5kZXJlciBpcyByZXNwb25zaWJsZSBmb3IgY29sbGVjdGluZyByZW5kZXJDb21tYW5kcyBhbmRcbiAqIGV4ZWN1dGUgdGhlbSBpbiB0aGUgcmlnaHQgb3JkZXIgYmFzZWQgb24gdGhlIGluZm9ybWF0aW9uIHRoZXkgY2Fycnkgb24uXG4gKlxuICogRnVydGhlcm1vcmUgaXQgYWxzbyBhYnN0cmFjdHMgYXdheSB0aGUgY29tcGxleGl0eSBvZiBob3cgdGhlIGdmeCBkZXZpY2Ugd29yayB1bmRlciB0aGUgaG9vZFxuICogZnJvbSB0aGUgcmVuZGVyU3lzdGVtXG4gKi9cbmNsYXNzIFJlbmRlcmVyIHtcbiAgICBnZXQgY29tbWFuZEJ1ZmZlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRCdWZmZXI7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGRldmljZSkge1xuICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgdGhpcy5fY29tbWFuZEJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgICBwdXNoUmVuZGVyQ29tbWFuZChjb21tYW5kKSB7XG4gICAgICAgIHRoaXMuX2NvbW1hbmRCdWZmZXIucHVzaChjb21tYW5kKTtcbiAgICB9XG4gICAgZW5kRnJhbWUoY3R4KSB7XG4gICAgICAgIHRoaXMuZGV2aWNlLmNsZWFyKGN0eCk7XG4gICAgICAgIHRoaXMuX2NvbW1hbmRCdWZmZXIuZm9yRWFjaChjb21tYW5kID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlLmJlZ2luKGN0eCk7XG4gICAgICAgICAgICBjb21tYW5kLmV4ZWN1dGUoY3R4LCB0aGlzLmRldmljZSk7XG4gICAgICAgICAgICB0aGlzLmRldmljZS5lbmQoY3R4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NvbW1hbmRCdWZmZXIgPSBbXTtcbiAgICB9XG59XG5leHBvcnRzLlJlbmRlcmVyID0gUmVuZGVyZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1JlbmRlcmVyXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9SZW5kZXJDb21tYW5kXCIpLCBleHBvcnRzKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==