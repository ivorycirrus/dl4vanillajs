# Deep Learning Library using VanillaJS

**dl4vanillajs** is a buldle of function for deeplearning application written in VanillaJS. 

[Vanilla JS](http://vanilla-js.com/) is the alias of pure JavaScript. It does not depends on any frameworks or libraries. <br/>
There are a web browser which supports Javascript/ECMA-Script, all of running and developing environment is prepared.

It is only a expermental approach, not optimized and not commertial purpose.

## Demos
* [dl4vanillajs-node-example](https://github.com/ivorycirrus/dl4vanillajs-node-example)
    * simple binary classification
    * xor problem


## Install
**dl4vanillsjs** has no dependencies.<br/>
You can download released archives or install from **npm**.

### - use npm
```
$ npm install dl4vanillajs
```

### - download archive
Download recent released archives : [link](https://github.com/ivorycirrus/dl4vanillajs/releases)


## Usages

### - for Node.js
```javascript
// import module
const dl = require('dl4vanillajs');

// define matrix for example
let X = [[1,2,3]]
let W = [[1,0,1], [1,1,0], [0,0,1]];

// multiply X and W
let Y = dl.mat.mul(X,W);

// add scalar value 1
let Y1 = dl.mat.add(Y,1);

// print result
console.log(Y1);
```

### - for WebBrowser
```html
<html>
<body>
	<!-- Result output -->
	<div id="result"></div>

	<!-- Import Modules -->
	<script src="math/matrix.js"></script>
	<script src="math/derivative.js"></script>
	<script src="nn/activation_function.js"></script>
	<script src="nn/loss_function.js"></script>
	<script src="nn/optimizer.js"></script>
	<script src="dl4vanilla.js"></script>
	<script>
		// define matrix for example
		let X = [[1,2,3]]
		let W = [[1,0,1], [1,1,0], [0,0,1]];

		// multiply X and W
		let Y = dl.mat.mul(X,W);

		// add scalar value 1
		let Y1 = dl.mat.sub(Y,1);

		// print result
		let resultDiv = document.getElementById("result");
		resultDiv.innerHTML = JSON.stringify(Y1);
	</script>
</html>
```


## Test
You can run test sctipt using **node.js**.

### - run whole tests
```
$ node test/run.js
```

### - test specific module (optional)
**example 1** : test `math` modules
```
$ node test/run.js math
```

**example 2** : test `math/derivative.js` module
```
$ node test/run.js math.derivative
```


## Liecnse
[Apache-2.0](LICENSE)