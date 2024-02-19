[![cov](https://ruggerovisintin.github.io/SparkEngineWeb/badges/coverage.badge.svg/coverage.badge.svg)](https://github.com/RuggeroVisintin/SparkEngineWeb/actions)

# Spark Engine Web

![Alt text](./assets/a_gear_icon_with_electric_spar%20(2).jpeg)

Spark Engine Web is a lightweight browser based web game engine we are building for fun.

We are building the engine with Security and performance in mind, to provide the best possible experience to our engine's users and contributors.

That being said, it will be an iterative journey and we won't bump the major version until we won't feel confident to have reached our goal.

## Getting Started

### Requirements

* Node ^20
* NPM ^10

Run `npm i` to install packages. After that, you are good to go

### Commands

Here you can find the list of commands. **Commands with the :ci flag are reserved for the CI setup of the project and not recommended for normal use**

* `npm test` to run the unit test suite
* `npm run test:perf` to run the performance test suite
* `npm run build` to build the engine
* `npm run build:dev` to build the engine in development mode
* `npm run build:docs` to build the documentation directory
* `npm run clean` to clean the dist folder
* `npm run serve:examples` to serve examples in a local webserver, getting rid of annoying CORS issues and similar. Requires `npm run build:*`

## Usage

TBD

## Examples

You can add more examples in the [examples](./examples) folder. In order to correctly serve them, especially if you are having problems with CORS, see the `npm run serve:examples` command.

or just visit <https://ruggerovisintin.github.io/SparkEngineWeb/examples> for a ready to use version, updated to the latest release

## Contributing

To contribute to the project just open a pull request. If you are working on an existing issue remember to link the pull request to it.

Once opened a core maintainer will review the PR and eventually approve it

## License

See [LICENSE](./LICENSE) file

## Contact

See maintainers section in package.json
