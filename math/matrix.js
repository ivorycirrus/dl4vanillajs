const DlMatrix = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlMatrix')) _root.DlMatrix = {};

	/* create matrix */
	let _create_matrix = function(size, initial_value = 0){
		if(!Array.isArray(size) || size.length == 0) throw "MatrixException : size parameter is not array.";
		else if(size.length == 1) return Array(size[0]).fill(initial_value);
		else return Array(size[0]).fill(initial_value).map(() => _create_matrix(size.slice(1), initial_value));
	};

	/* Size of matrix */
	let _matrix_shape = function(arr){
		if(!Array.isArray(arr)) {
			throw "MatrixException : parameter is not array.";
		}

		let size = [];
		let retriever = a => Array.isArray(a)?(size.push(a.length),retriever(a[0])):null;
		retriever(arr);
		
		return size;
	};

	/* Transpose */
	let _matrix_transpose = function(arr) {
		const arr_shape = _matrix_shape(arr);
		if(!arr_shape){
			throw "MatrixException : parameter is not array.";
		} else if(arr_shape.length == 1) {
			let tr_arr = [];
			for(let i = 0 ; i < arr.length ; i++) tr_arr.push([arr[i]]);
			return tr_arr;
		} else if(arr_shape.length == 2) {
			let tr_arr = [];
			for(let i = 0 ; i < arr_shape[1] ; i++) {
				let tr_row = [];
				for(let j = 0 ; j < arr_shape[0] ; j++) {
					tr_row.push(arr[j][i]);
				}
				tr_arr.push(tr_row);
			}
			return tr_arr;
		} else {
			throw "MatrixException : transpose only works 1-d and 2-d arrays.";			
		}
	};

	/* Flat */
	let _matrix_flat = function(arr){
		if(!Array.isArray(arr)){
			throw "MatrixException : parameter is not array.";
		}

		const flatten = function(arr) {
			return arr.reduce(function (flat, toFlatten) {
				return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
			}, []);
		};
		return flatten(arr);
	}

	/* Reshape */
	let _matrix_reshape = function(arr, shape) {
		if(!Array.isArray(arr) && !Array.isArray(shape)){
			throw "MatrixException : parameters are not array.";
		} else if(!shape.every(x=>(typeof x == `number` || x == 0))) {
			throw "MatrixException : second parameter is 1-d number(exclude zero) array.";
		}  else if(shape.filter(x=>x<0) > 1) {
			throw "MatrixException : infered index allows only 1 cell.";
		}
		
		const flatted = _matrix_flat(arr);

		let infered_size = -1;
		let output_size = shape.reduce((prev,next)=>(next>0?prev*next:prev), 1);
		if(output_size < flatted.length) {
			infered_size = flatted.length/output_size;
		} else if(output_size > flatted.length) {
			throw "MatrixException : output size is larger than input size.";
		}
		
		let arr_pointer = 0;
		let func_reshape = function(flat_arr, child_shape) {
			let curr_layer;
			let curr_size = (child_shape[0]>0?child_shape[0]:infered_size);
			if(child_shape.length == 1) {
				const next_pointer = arr_pointer + curr_size;
				if(flat_arr.length < next_pointer) throw "MatrixException : cannnot reshape size.";
				else {
					curr_layer = flat_arr.slice(arr_pointer, next_pointer);
					arr_pointer = next_pointer;
				}
			} else {
				curr_layer = [];
				for(let i = 0 ; i < curr_size ; i++) {
					curr_layer.push(func_reshape(flat_arr, child_shape.slice(1)));
				}
			}
			return curr_layer;
		}

		return func_reshape(flatted, shape);
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
			let mapper = x => Array.isArray(x)?x.map(mapper):x+num;
			return arr1.map(mapper);
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
			let mapper = x => Array.isArray(x)?x.map(mapper):x*num;
			return arr1.map(mapper);
		}
	};

	/* Max */
	let _matrix_max = function(arr){
		if(!Array.isArray(arr)) throw "MatrixException : first parameter is not array.";
		else if(arr.length == 0) return null;
		else {
			let reducer = function(prev, curr){
				const prevMax = (Array.isArray(prev))?prev.reduce(reducer):prev;
				const currMax = (Array.isArray(curr))?curr.reduce(reducer):curr;
				return Math.max(prevMax, currMax);
			};
			return arr.reduce(reducer);
		}
	};

	/* Min */
	let _matrix_min = function(arr){
		if(!Array.isArray(arr)) throw "MatrixException : first parameter is not array.";
		else if(arr.length == 0) return null;
		else {
			let reducer = function(prev, curr){
				const prevMin = (Array.isArray(prev))?prev.reduce(reducer):prev;
				const currMin = (Array.isArray(curr))?curr.reduce(reducer):curr;
				return Math.min(prevMin, currMin);
			};
			return arr.reduce(reducer);
		}
	};

	/* Reduce sum */
	let _matrix_reduce_sum = function(arr){
		if(!Array.isArray(arr)) throw "MatrixException : first parameter is not array.";
		else {
			let reducer = function(prev, curr){
				const prevSum = (Array.isArray(prev))?prev.reduce(reducer):prev;
				const currSum = (Array.isArray(curr))?curr.reduce(reducer):curr;
				return prevSum + currSum;
			};
			return arr.reduce(reducer);
		}
	};

	/* Evaluate function */
	let _eval_mat = function(arr1, func) {
		if(!Array.isArray(arr1)) throw "MatrixException : first parameter is not array.";
		else if(typeof func != `function`) throw "MatrixException : second parameter is not function.";
		else {
			let mapper = x => Array.isArray(x)?x.map(mapper):func(x);
			return arr1.map(mapper);
		}
	}

	/* Public methods */
	_root.DlMatrix.matrix = function(size, initial_value){
		return _create_matrix(size, initial_value);
	};
	_root.DlMatrix.shape = function(arr){
		return _matrix_shape(arr, undefined);
	};
	_root.DlMatrix.tran = function(arr){
		return _matrix_transpose(arr);
	};
	_root.DlMatrix.flat = function(arr){
		return _matrix_flat(arr);
	};
	_root.DlMatrix.reshape = function(arr, shape){
		return _matrix_reshape(arr, shape);
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
	_root.DlMatrix.max = function(arr){
		return _matrix_max(arr);
	};
	_root.DlMatrix.min = function(arr){
		return _matrix_min(arr);
	};
	_root.DlMatrix.reduce_sum = function(arr){
		return _matrix_reduce_sum(arr);
	};
	_root.DlMatrix.eval = function(arr, func){
		return _eval_mat(arr, func);
	};

	/* Export */
	return _root;
};

/* Export for node.js */
if(typeof module !== `undefined`) {
	let ctx = DlMatrix();
	module.exports = ctx.DlMatrix;
}
