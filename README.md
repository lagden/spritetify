# spritetify

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Build Status][ci-img]][ci]
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
$ npx spritetify -d 'dir/with/svg/files'
```


### API

```js
const spritetify = require('@tadashi/svg-sprite');

(async () => {
  const data = await spritetify('dir/with/svg/files')
  // => <svg width="0" height="0" display="none" version="1.1...
})()
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
