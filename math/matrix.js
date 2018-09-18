const DlMatrix = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlMatrix')) _root.DlMatrix = {};

	/* Size of matrix */
	let _matrix_shape = function(arr, _size){
		if(Array.isArray(arr)) {
			if(!arr || arr.length == 0) {
				return _size?_size:[0];
			} 

			let size = _size?_size:[];
			size.push(arr.length);

			if(Array.isArray(arr[0])) {
				size = size.concat(_root.DlMatrix.shape(arr[0], size));
			}

			return size;
		} else {
			if(_size) return _size;
		}
	};
	

	/* Matrix addition */
	let _matrix_add = function(arr1, arr2){
		if(!Array.isArray(arr1) || !Array.isArray(arr2)) throw "MatrixException : parameters are not array.";
		else if(arr1.length != arr2.length) throw "MatrixException : Size of arrays are different.";
		else if(arr1.length == 0) return null;
		else {
			let result = [];
			for(let i = 0 ; i < arr1.length ; i++) {
				if(Array.isArray(arr1[i])) result[i] = _matrix_add(arr1[i], arr2[i]);
				else result[i] = arr1[i] + arr2[i];
			}
			return result;
		}
	};

	/* Scalar addition */
	let _scalar_add = function(arr1, num){
		if(!Array.isArray(arr1)) throw "MatrixException : first parameter is not array.";
		else if(arr1.length == 0) return null;
		else {
			let result = [];
			for(let i = 0 ; i < arr1.length ; i++) {
				if(Array.isArray(arr1[i])) result[i] = _scalar_add(arr1[i], num);
				else result[i] = arr1[i] + num;
			}
			return result;
		}
	};

	/* Matrix multiply */
	let _matrix_mul = function(arr1, arr2){
		if(!Array.isArray(arr1) || !Array.isArray(arr2)) throw "MatrixException : parameters are not array.";

		const s1 = _matrix_shape(arr1, []);
		const s2 = _matrix_shape(arr2, []);
		if(s1.length != 2 || s2.length != 2) throw "MatrixException : input arrays are not 2d array.";
		else if(s1[1] != s2[0]) throw "MatrixException : array shapes are mismatch.";
		else if(s1[0] == 0 || s2[1] == 0) throw "MatrixException : cannot multiple zseo-size array.";

		const rows = s1[0], cols = s2[1], middle = s1[1];
		let result = [];
		for(let i = 0 ; i < rows ; i++) {
			let row = [];
			for(let j = 0 ; j < cols ; j++) {
				let cell = 0;
				for(let k = 0 ; k < middle ; k++) {
					cell += (arr1[i][k] * arr2[k][j])
				}
				row[j] = cell;
			}
			result[i] = row;
		}

		return result;
	};

	/* Scalar multiply */
	let _scalar_mul = function(arr1, num){
		if(!Array.isArray(arr1)) throw "MatrixException : first parameter is not array.";
		else if(arr1.length == 0) return null;
		else {
			let result = [];
			for(let i = 0 ; i < arr1.length ; i++) {
				if(Array.isArray(arr1[i])) result[i] = _scalar_mul(arr1[i], num);
				else result[i] = arr1[i] * num;
			}
			return result;
		}
	};

	/* Evaluate function */
	let _eval_mat = function(arr1, func) {
		if(!Array.isArray(arr1)) throw "MatrixException : first parameter is not array.";
		else if(typeof func != `function`) throw "MatrixException : second parameter is not function.";
		else {
			let result = [];
			for(let i = 0 ; i < arr1.length ; i++) {
				if(Array.isArray(arr1[i])) result[i] = _eval_mat(arr1[i], func);
				else result[i] = func(arr1[i]);
			}
			return result;
		}
	}

	/* Public methods */
	_root.DlMatrix.shape = function(arr){
		return _matrix_shape(arr, undefined);
	};
	_root.DlMatrix.add = function(arr1, arr2){
		if(Array.isArray(arr2)) return _matrix_add(arr1, arr2);
		else if(!isNaN(arr2)) return _scalar_add(arr1, arr2);
		else null;
	};
	_root.DlMatrix.mul = function(arr1, arr2){
		if(Array.isArray(arr2)) return _matrix_mul(arr1, arr2);
		else if(!isNaN(arr2)) return _scalar_mul(arr1, arr2);
		else null;
	};
	_root.DlMatrix.eval = function(arr, func){
		return _eval_mat(arr, func);
	};

	/* Export */
	return _root;
};

/* Export for node.js */
if(module) {
	let ctx = DlMatrix();
	module.exports = ctx.DlMatrix;
}
