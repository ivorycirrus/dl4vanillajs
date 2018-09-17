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
	}
	

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
	}

	/* Public methods */
	_root.DlMatrix.shape = function(arr){
		return _matrix_shape(arr, undefined);
	};
	_root.DlMatrix.add = function(arr1, arr2){
		return _matrix_add(arr1, arr2);
	};

	/* Export */
	return _root;
};

/* Export for node.js */
if(module) {
	module.exports = DlMatrix();
}
