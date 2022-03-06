# spritetify

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![XO code style][xo-img]][xo]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/spritetify.svg
[npm]:             https://www.npmjs.com/package/@tadashi/spritetify
[ci-img]:          https://github.com/lagden/spritetify/workflows/Node.js%20CI/badge.svg
[ci]:              https://github.com/lagden/spritetify/actions?query=workflow%3A%22Node.js+CI%22
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo

-----

Generate SVG sprite

## Install

```
$ npm i -S @tadashi/spritetify
```


## Usage

### CLI

```
Usage: spritetify [options]

Generate SVG sprite

Options:
  -V, --version            output the version number
  -d, --inputDir <dir>     directory with the SVG files
  -o, --outputFile <file>  name with path of output file
  -c, --configFile [json]  plugin options
  -h, --help               display help for command
```

#### Samples

```
$ npx spritetify -d dir/with/svg/files > ./sprite.svg
```

```
$ npx spritetify -d dir/with/svg/files -o dir/of/sprite/file.svg -c
```


### API

```js
import spritetify from '@tadashi/spritetify'

const data = await spritetify('dir/with/svg/files')
// => <svg width="0" height="0" display="none" version="1.1...
```

#### spritetify(inputDir \[, outputFile\] \[, options\]):String

parameter      | type                 | required    | default                | description
-----------    | -------------------- | ----------- | -------------------    | ------------
inputDir       | String               | yes         | -                      | directory with the SVG files
outputFile     | String               | no          | -                      | name with path of output file
options        | Object               | no          | [see below](#options)  | plugin options


⚠️ **Attention**

If `outputFile` is not set, the return will be the sprite's string.


##### options

parameter      | type                 | required    | default                | description
-----------    | -------------------- | ----------- | -------------------    | ------------
id             | String               | no          | %s                     | Template for Symbol ID
...rest        | -                    | no          | -                      | SVGO Options


The remaining options are the same of [SVGO](https://github.com/svg/svgo#what-it-can-do)


#### Options

**spritetify.config.json**

```json
{
  "id": "my_app_%s",
  "removeTitle": false
}
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
