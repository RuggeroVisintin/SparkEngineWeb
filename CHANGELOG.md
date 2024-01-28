# Changelog

## [0.3.1](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.3.0...sparkengineweb-v0.3.1) (2024-01-28)


### Features

* **ecs:** add uuid to every component created ([7946b05](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/7946b05e41d9e2086419db0424eaea7bb5ea00e9))
* **phsyx:** pass through the uuid of the physical objects colliding ([09d5437](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/09d54375dc34fc0db93742dda3b5ae36a5c2fb09))

## [0.3.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.2.5...sparkengineweb-v0.3.0) (2024-01-28)


### ⚠ BREAKING CHANGES

* **physx:** rename "simulationResult" property to "postSimulation"

### Features

* **phsyx:** add reflected velocity in collision detection ([585c57c](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/585c57caf8507058486eee4a634a72f516b97a61))
* **physx:** add reflected velocity from collision in non container collision ([bfc2500](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/bfc25009a8b869e32d1b198eb7d834dfba295617))
* **physx:** calculate post collision position with non container objects more precisely ([382dd15](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/382dd15dd806ad670a165701c119bdbad75b4b87))
* **physx:** improved collision detection precision ([eab8341](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/eab8341b3aa7232af95d5a11d1eed1eeccf2469d))
* **physx:** refine collision detection logic ([4d0f016](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/4d0f016faf955ce243b1b111ffecd19911997dec))


### Code Refactoring

* **physx:** rename "simulationResult" property to "postSimulation" ([1ab7000](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/1ab700048f8c6d08e5d55daa6a31107fc4ed12d2))

## [0.2.5](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.2.4...sparkengineweb-v0.2.5) (2024-01-26)


### Bug Fixes

* **physx:** fix velocity not accounted in collisions ([953412a](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/953412a69daa9c10f02a6ef52b65da545abbb294))

## [0.2.4](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.2.3...sparkengineweb-v0.2.4) (2024-01-24)


### Features

* **core:** add vec2 math utils ([bf49313](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/bf493130ea5a5aa83188812db8bc9e56e4017581))
* **math:** add reflect and static from constructor ([6c371f1](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/6c371f195ec386457610adcf8feeb7813ba2e351))
* **physx:** add objects velocity ([#76](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/76)) ([2d22191](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/2d2219168e05ea87e7099d4e6f336ca5568e0800))
* **vec2:** add scalar multiplication ([8d0d87a](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/8d0d87a7ca85a84a023487e148bc739f4e673718))

## [0.2.3](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.2.2...sparkengineweb-v0.2.3) (2024-01-23)


### Features

* **ecs:** add isConatiner property to bounding box ([#69](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/69)) ([20d3394](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/20d3394347cdff2976a44b057218b4e7758a2b56))


### Bug Fixes

* **physx:** send informations about the colliding object in the callback ([7a7533c](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/7a7533cef8f9e22aa231545fec637d2812cf7225))

## [0.2.2](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.2.1...sparkengineweb-v0.2.2) (2024-01-22)


### Features

* **ecs:** add velocity to the transform component ([#63](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/63)) ([c88b6cd](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/c88b6cd5541cba785bcaf8ab40f029b4505378cd))

## [0.2.1](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.2.0...sparkengineweb-v0.2.1) (2024-01-09)


### Features

* **platform:** add Keyboard Input device ([#61](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/61)) ([72b208d](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/72b208d00a4da9248833798a8d64e71bdf944231))

## [0.2.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.1.4...sparkengineweb-v0.2.0) (2023-12-12)


### ⚠ BREAKING CHANGES

* **ecs:** TransformComponent.position needs to be an instance of Vec2 now

### Features

* **math:** add negate operation to Vec2 ([4134e81](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/4134e81882d579ccb46bc9219197c60692993077))
* **math:** add vec2 math utility ([893de02](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/893de02f14a4cda279b6445569b9fb9db14ae599))


### Code Refactoring

* **ecs:** replace transform position plain object with Vec2 ([45d3dd6](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/45d3dd6d4611d19433072e64869201f3486731d4))

## [0.1.4](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.1.3...sparkengineweb-v0.1.4) (2023-12-12)


### Bug Fixes

* **docs:** fix documentation by changing tech ([04c30b5](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/04c30b5114005f9eb5ffc89c6b459fc7d8e2155c))

## [0.1.3](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.1.2...sparkengineweb-v0.1.3) (2023-12-11)


### Features

* **ecs:** add StaticObjectEntity ([7db7723](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/7db77239294d9181405c26980c389c9238617e0e))

## [0.1.2](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.1.1...sparkengineweb-v0.1.2) (2023-12-10)


### Features

* **physx:** add Physics engine and BoundingBoxComponent for collision detection ([0546f1c](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/0546f1c7ac2e79d32b5467d067b87868af91dfbb))


### Bug Fixes

* remove generating pr in ci ([693637e](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/693637ee0475c979530da17ec71d277cb031d71f))

## [0.1.1](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.1.0...sparkengineweb-v0.1.1) (2023-12-08)


### Features

* **core:** add Color ([27143fc](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/27143fcc6e40098fc19aadd0920655c604812087))
* **core:** add Color ([e81080a](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/e81080a10ab694d144e59daa426395938453e606))
* **core:** add color core utility ([25da3db](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/25da3db06872e27d0286d5da1d296f29107024ae))
* **ecs:** add automatic key assign to component ([9b6beda](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/9b6beda8b5d4fe509712284426f556c88d7ba3f6))
* **ecs:** add base component and base entity ([293240f](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/293240f817f95519d075b822e3e92166ec26058d))
* **ecs:** add behaviour interfaces ([c6c8854](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/c6c88543cfa639159be1496aafd309fc8a9b0d31))
* **ecs:** add GameObject with default components ([4419b69](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/4419b69b4ff86630f6e7f9894081bb2b4167b80b))
* **ecs:** add render system and shape component ([778b486](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/778b4869179e84578760cfb2efb7cb8a305ac854))
* **ecs:** add TransformComponent ([e210d03](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/e210d032440f88cdc371ca08a6c810c427dffd30))
* **ecs:** implement base component get/set container ([e460c4d](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/e460c4dcdd833bc3a2e4b538f4ca991e9bbab672))
* **ecs:** retrieve ShapeComponent needed components from parent container when present ([6e6604d](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/6e6604da800f55bed0720c7c0afa68d11e5530a7))
* **ecs:** set container when adding component to entity ([4e80c04](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/4e80c0402118a3966e91b531fff1e4b0a59c6b10))
* make transform getter public ([e6440b0](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/e6440b0ac5801d38af31b10af4b8c4b01c987bdc))
* **material:** add MaterialComponent with diffuse color ([95d534f](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/95d534f24992b38d4bcf84bed7f9d828c797be01))
* **material:** pass material to draw call in ShapeComponent ([4fc3518](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/4fc35186cef11686c3ee5f4228fe4bc62b8b9ec7))
* **renderer:** add support for blending methods ([92bfdc9](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/92bfdc982ecd7b27fe1498c1979075a83594efe5))
* **rendering:** add rect rendering ([3825ef0](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/3825ef00e101ca0d930ef123a337ae11e0ce6e4a))
* **rendering:** add render commands ([4569a9d](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/4569a9d4f53d193c71a24adfb3b932182d2fc59a))
* **rendering:** add rendering order based on depthIndex ([0100a3a](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/0100a3accd6cc89c26c6932ff6d8e89aeb335a09))
* **rendering:** handle transparent objects ([a44a791](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/a44a7917d791b9b16021edc7792c8bbd16fefca6))
* **rendering:** implement rendering system ([5fb7cef](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/5fb7cef5be2350e853be7df1044a1b853ed876b4))


### Bug Fixes

* **build:** fix broken build ([b4f2b03](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/b4f2b038bf269649f9156f8662d3f9da63223abd))
* **ci:** add plugin eslint for test required in CI ([bd7d0e4](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/bd7d0e490f383e3dc8dc5c7fba4aa77dd8d9beb8))
* force a release ([6e17ce2](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/6e17ce20eb4417c048987a1d6b0aeb76e041aa61))
* **rendering:** fix rendering order in renderSystem ([ae82e50](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/ae82e50ea7c3fb02cc9bbfc48098e02e2436bd9a))
* **rendering:** remove missing file ([2ef8d06](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/2ef8d06fe418046b2ac8e6f4426db8ed7b3d1cb6))
