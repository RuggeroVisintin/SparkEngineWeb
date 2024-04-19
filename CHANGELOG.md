# Changelog

## [0.10.3](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.10.3...sparkengineweb-v0.10.3) (2024-04-19)


### Miscellaneous Chores

* release 0.10.4 ([79ff43f](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/79ff43f04ee857c59e60cb4b46970d988324297e))

## [0.10.3](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.10.2...sparkengineweb-v0.10.3) (2024-04-19)


### Bug Fixes

* fix distributable missing in release artifact ([18bd2ce](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/18bd2ceba3ab7d6ba35e17d07cbbc025ceda6c28))

## [0.10.2](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.10.1...sparkengineweb-v0.10.2) (2024-04-19)


### Features

* add compiled source in release package ([1107763](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/1107763475c64d4b77a1aac13edec5ee5d1110ea))

## [0.10.1](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.10.0...sparkengineweb-v0.10.1) (2024-04-01)


### Features

* **animations:** add animation assets loading ([22ebea4](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/22ebea4563b7dd2a6323ea931e3c7662bb717fec))
* **gfx:** add textures opacity ([899a76e](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/899a76ec3e5ac9afa89b969da7f58baa799bfc3e))
* **platform:** add assets cache to ImageLoader ([a435a03](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/a435a03a55b9401e23af95ff7cd80d5526ed31ff))

## [0.10.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.9.0...sparkengineweb-v0.10.0) (2024-04-01)


### ⚠ BREAKING CHANGES

* **ecs:** apply BaseSystem abstract class to HierarchySystem

### Features

* **animations:** add animation controls ([9cc570f](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/9cc570f27e99d93fac4211b5b65d5c5e4160d75d))
* **animations:** apply idle pose when stopping the animation ([8bbb401](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/8bbb40105dfd2bcfaad676618ad8f372cfe23b45))
* **ecs:** add animations ([1cd95d8](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/1cd95d811f3be8fc25ec744b4f6f219f61df064d))
* **ecs:** add BaseSystem abstract class ([1bfdaa4](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/1bfdaa494e92e7ec0cdce1af7d19155f8c071a34))
* **ecs:** add support to multiple components of the same type in Entities ([2d18ecf](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/2d18ecf41192e4a41ed3759ce40b367ddb3f9312))
* **engine:** add animationCompont to scene ([57ee76b](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/57ee76b00638b5202760adaa7569da1a6ee9bd17))
* **engine:** add AnimationSystem to engine ([63d0dde](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/63d0dde08e68f98d996080d885445c43e1c47141))
* **gfx:** add type to ImageAsset ([a17e998](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/a17e9989775ce7041a0d9df91f041e96c32a9057))


### Code Refactoring

* **ecs:** apply BaseSystem abstract class to HierarchySystem ([bbeddcd](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/bbeddcda22c4cdc4bc78b54cdf23bc0dfa722d59))

## [0.9.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.8.5...sparkengineweb-v0.9.0) (2024-03-26)


### ⚠ BREAKING CHANGES

* **gfx:** - DrawImageCommand.constructor.image

### Features

* **gfx:** switch image rendering from HTMLImageElement to ImageBitmap ([12e20cb](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/12e20cb69c223eb9e60f3a3535cf700539938581))


### Bug Fixes

* **core:** fix rgb alpha value being wrongly defaulted when 0 ([fec7fd3](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/fec7fd3525e0134ba5d6dd9bde7f932817798da6))

## [0.8.5](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.8.4...sparkengineweb-v0.8.5) (2024-03-24)


### Features

* **ecs:** add diffuse texture rendering in MaterialComponent ([7db1cc0](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/7db1cc01212fddf7f8055d507c6f28720de55430))
* **ecs:** add support to diffuse texture rendering ([7db1cc0](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/7db1cc01212fddf7f8055d507c6f28720de55430))
* **ecs:** avoid using MaterialComponent default diffuse color when texture is applied ([17be7d0](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/17be7d0f4b8a7ec0cd3266aed37afd0a08b4003c))
* **gfx:** add drawImage command ([7db1cc0](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/7db1cc01212fddf7f8055d507c6f28720de55430))
* **gfx:** add ImageLoader ([7db1cc0](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/7db1cc01212fddf7f8055d507c6f28720de55430))

## [0.8.4](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.8.3...sparkengineweb-v0.8.4) (2024-03-21)


### Features

* add camera mechanism ([a1b480c](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/a1b480c8b639dc34912503796f0248dd39f589a8))
* **ecs:** add abstraction for drawable components ([abdc5c5](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/abdc5c51c21550863d3978cd5035ea62c856991d))
* **ecs:** add CameraComponent ([a1b480c](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/a1b480c8b639dc34912503796f0248dd39f589a8))
* **renderer:** add SetTransformCommand render command ([a1b480c](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/a1b480c8b639dc34912503796f0248dd39f589a8))


### Bug Fixes

* **physx:** fix collision detection being broken when same object added twice ([f7ed740](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/f7ed7406b18b07eca82dace51a6387e56326ea70))

## [0.8.3](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.8.2...sparkengineweb-v0.8.3) (2024-03-18)


### Features

* **core:** add whole type chain in type decorator ([9f90175](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/9f901755e311807c8f9814ee3f9fb5fe9c73a168))
* **ecs:** make added component retrievable with any type in its types chain ([bbef3b1](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/bbef3b1fd7a588b6ce72e9bbf6dc98469509f20b))


### Bug Fixes

* **core:** fix types decortator to not overwrite other constructors types chain ([54049e5](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/54049e592c86319b7516e8dbdfd36335af364304))
* **physx:** fix broken physics in pong example due to values being used by reference ([dc9a4e4](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/dc9a4e492e015ac8a37857f224a22f14bb106732))

## [0.8.2](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.8.1...sparkengineweb-v0.8.2) (2024-03-14)


### Features

* **ecs:** add RigidBodyComponent ([#191](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/191)) ([e64b4da](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/e64b4dab66c2425f338cbda03736f7b245fd75cf))
* **engine:** add physics cycles configuration ([#186](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/186)) ([241b726](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/241b726c16b208e6a066886c564a13968bcc6767))

## [0.8.1](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.8.0...sparkengineweb-v0.8.1) (2024-03-06)


### Features

* **physx:** add post simulation position on container collision ([#171](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/171)) ([e9b92dc](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/e9b92dc476951e0974ff088d88e54cc003c88e31))
* **physx:** improve collisions detection and resolution ([bca7507](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/bca75078f956a90d1cda0f6ebb43f40191827d0f))


### Bug Fixes

* **physx:** fix wrong uuid being used in post simulation and avoid unnecessary collision check ([b93c447](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/b93c44714654985ec16b7116b14283495097316f))

## [0.8.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.7.2...sparkengineweb-v0.8.0) (2024-02-19)


### ⚠ BREAKING CHANGES

* **ecs:** Removes `@IncrementallyUnique` property decorator due to buggy implementation. use `incrementallyUnique()` function instead

### Features

* **ecs:** implement entity unique name setter and getter ([#150](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/150)) ([935e887](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/935e887fc2e260b6fd0dc36b1dfbe58cfd3297e7))

## [0.7.2](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.7.1...sparkengineweb-v0.7.2) (2024-02-18)


### Features

* **ecs:** add default entity name with automatic incremental uniqueness ([#146](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/146)) ([60c7b08](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/60c7b084d08f422ce160eae625ebf5dd8ab51c4b))


### Bug Fixes

* **engine:** fix stuttering due to incorrect framepacing ([#149](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/149)) ([fbefc1e](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/fbefc1e12be80ba5e39ae1bc64f45517a285a4e5))

## [0.7.1](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.7.0...sparkengineweb-v0.7.1) (2024-02-17)


### Features

* **ecs:** add entities type metadata ([#131](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/131)) ([1a9a2e7](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/1a9a2e72edc2af9cade9a6f012758440c9d7711b))
* **ecs:** add scene loading from file ([#133](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/133)) ([1ca5619](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/1ca5619ef3cd763f34d0ba822cf2e7e5f363669e))

## [0.7.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.6.0...sparkengineweb-v0.7.0) (2024-02-12)


### ⚠ BREAKING CHANGES

* **ecs:** removes target param in favor of required props param
* **ecs:** SoundComponent constructor does not require SoundLoader anymore which is now needed in SoundComponent.load

### Features

* add entities init config ([21783d5](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/21783d56e7aea42b417eb8a32245e70b8016e5da))
* **ecs:** add GameObject init configuration ([21783d5](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/21783d56e7aea42b417eb8a32245e70b8016e5da))
* **ecs:** add StaticObject init config ([21783d5](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/21783d56e7aea42b417eb8a32245e70b8016e5da))
* **ecs:** add TriggerEntity init config ([21783d5](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/21783d56e7aea42b417eb8a32245e70b8016e5da))


### Code Refactoring

* **ecs:** pass SoundLoader in SoundComponent.load ([2bfd28b](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/2bfd28bcf7dba834d8cbfc01e5f00f23b217a0ee))

## [0.6.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.5.1...sparkengineweb-v0.6.0) (2024-02-11)


### ⚠ BREAKING CHANGES

* **ecs:** SoundComponentProps is required to create a new SoundComponent

### Features

* **ecs:** add BoundingBoxComponentProps to construct boundingBox from config ([#121](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/121)) ([522265d](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/522265dc1de955b7b84d8a4170b91fc7ae83a120))
* **ecs:** add MaterialComponentProps to quickly initialize the component ([#122](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/122)) ([d1373e4](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/d1373e43ac3d34922079de65d594b1eade15c91b))
* **ecs:** add ShapeComponentProps to quickly initialize the component ([#123](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/123)) ([7792fc1](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/7792fc1ec629ea97106c0c13f6a7ed44b539b71b))
* **ecs:** add SoundComponentProps to quickly initialize the component ([#124](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/124)) ([3c7ba92](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/3c7ba920d69da96437963692155d56ebf67f3b97))
* **ecs:** add TransformComponentProps to init the component ([#119](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/119)) ([6803e9f](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/6803e9f19aeb79b47f38eeb8a6f295726f7aa5e3))

## [0.5.1](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.5.0...sparkengineweb-v0.5.1) (2024-02-10)


### Features

* **engine:** add Scene to automatically register components inside a scene systems [[#111](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/111)][[#113](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/113)] ([368fa4e](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/368fa4edb2e5a221aba51070d90e9fb539049c28))
* **inputs:** trigger input listener only once per frame ([9845b8c](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/9845b8c8f6efe8a83a752d8691ad9e17844720c0))

## [0.5.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.4.3...sparkengineweb-v0.5.0) (2024-02-09)


### ⚠ BREAKING CHANGES

* **inputs:** fix delayed inputs when keeping button pressed - #82 ([#107](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/107))

### Bug Fixes

* **inputs:** fix delayed inputs when keeping button pressed - [#82](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/82) ([#107](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/107)) ([91401aa](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/91401aa2b35e1c1c2aad9af317522b25ece4d0fd))

## [0.4.3](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.4.2...sparkengineweb-v0.4.3) (2024-02-08)


### Features

* **core:** return Vec2 this instance in in place methods ([cd552c8](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/cd552c878a55dcb32cf6e992300ac07477072cd9))

## [0.4.2](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.4.1...sparkengineweb-v0.4.2) (2024-02-01)


### Features

* **ecs:** add sounds to entity components systems [[#52](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/52)][[#53](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/53)] ([#95](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/95)) ([44d0802](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/44d08025d780f88b93638db15080aac30e33ff4a))


### Bug Fixes

* **SoundComponent:** avoid flagging as non playing if not loaded ([f423223](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/f423223ddb19efd2647851ea7f3b5bdb64f25532))

## [0.4.1](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.4.0...sparkengineweb-v0.4.1) (2024-01-31)


### Features

* **game:** add GameEngine class ([6b247c9](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/6b247c9650295bd57c5dd8f00ba5772de866a8bd))

## [0.4.0](https://github.com/RuggeroVisintin/SparkEngineWeb/compare/sparkengineweb-v0.3.1...sparkengineweb-v0.4.0) (2024-01-29)


### ⚠ BREAKING CHANGES

* **renderer:** Renderer requires new parameter to be succesfully created

### Features

* **renderer:** impelement resolution indipendent rendering - [#84](https://github.com/RuggeroVisintin/SparkEngineWeb/issues/84) ([40047ca](https://github.com/RuggeroVisintin/SparkEngineWeb/commit/40047ca4cbc9cb3d8277727245299bfdcc33ed40))

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
