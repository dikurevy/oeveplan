/* Extensions to Array's prototype */

(function(arrayPrototype) {
	if (!arrayPrototype.forEach) {
		arrayPrototype.forEach = function(lambda, thisObject) {
			for (var i=0 ; i<this.length ; i++) {
				lambda.call(thisObject || window, this[i], i, this);
			}
		};
	}

	if (!arrayPrototype.map) {
		arrayPrototype.map = function(lambda, thisObject) {
			var ret = [];
			for (var i=0 ; i<this.length ; i++) {
				ret.push(lambda.call(thisObject || window, this[i], i, this));
			}
			return ret;
		};
	}

	if (!arrayPrototype.filter) {
		arrayPrototype.filter = function(lambda, thisObject) {
			var result = [];
			for (var i=0 ; i<this.length ; i++) {
				if (lambda.call(thisObject || window, this[i], i, this)) {
					result.push(this[i]);
				}
			}
			return result;
		};
	}

	if (!Array.indexOf) {
		arrayPrototype.indexOf = function(obj, fromIndex) {
			for (var i = fromIndex || 0; i < this.length; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}

	 /* Returns the index of 'item'. A negative index means that the item wasn't found, but should occupy index abs(index+1) if inserted. */
	arrayPrototype.findInSorted = function(item, comparator) {
		comparator = comparator || this.comparator;
		var left = -1;
		var right = this.length;
		var mid;
		while (right - left > 1) {
			mid = (left + right) >>> 1;
			var c = comparator(this[mid], item);
			if(c<0) {
				left = mid;
			}else{
				right = mid;
				if (!c) {
					break;
				}
			}
		}
		return (right === this.length || comparator(this[right], item)) ? -right-1 : right;
	};

	/* This is more efficient than relying on findInSorted: */

	arrayPrototype.comparator = function (a, b) { return a<b ? -1 : (a>b ? 1 : 0); };

	arrayPrototype.insertIntoSorted = function(item, comparator) {
		comparator = comparator || this.comparator;
		var left = -1;
		var right = this.length;
		var mid;
		while (right - left > 1) {
			mid = (left + right) >>> 1;
			if(comparator(this[mid], item) < 0) {
				left = mid;
			}else{
				right = mid;
			}
		}
		this.splice(right, 0, item);
		return right;
	};

	arrayPrototype.removeFromSorted = function(item, comparator) {
		comparator = comparator || this.comparator;
		var existingIndex = this.findInSorted(item, comparator);
		if (existingIndex >= 0) {
			this.splice(existingIndex, 1);
		}
	};
})(Array.prototype);
