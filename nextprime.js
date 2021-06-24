// Determine the next prime from this number
var n = 31398n
	, next = getDistanceToNextPrime(n)
	, prev = getDistanceToPrevPrime(n)

console.log(
	  "Input number: \t\t\t", n.toString(), '\n'
	, "Next prime distance: \t\t", 	next.toString(), '\n'
	, "Next prime: \t\t\t", 	(n + next).toString(), '\n'
	, "Previous prime distance: \t", prev.toString(), '\n'
	, "Previous Prime: \t\t", (n - prev).toString(), '\n'
)


// Find all modulo of "-n" for factors 2..n and return the lowest missing mod value + original input - this is our next prime number
function getDistanceToNextPrime(n) {
	var candidates = []

	for (let i = 2n; i < n; i++) {
		candidates.push(trueMod(-n, i))
	}
	
	// This part of the function is *a way* to get the lowest missing modular value
	// I'm sure it could be improved but not important for demonstrating the overall concept of this script.
	candidates.sort((a,b) => a > b ? 1 : -1)

	var searchValue = 1n
	for (const i in candidates) {
		if (candidates[i] == searchValue + 2n) return searchValue + 1n
		searchValue = candidates[i]
	}

	throw "Oops, something went wrong"
}


// Find all modulo of "n" for factors 2..n/2 and return the largest missing mod value + original input - this is our previous prime number
function getDistanceToPrevPrime(n) {
	var candidates = []
		,searchValue = 0n

	for (let i = 2n; i < n / 2n; i++) {
		var modVal = trueMod(n, i)
		if (modVal > searchValue) searchValue = modVal
		candidates.push(modVal)
	}

	// This part of the function is *a way* to get the lowest missing modular value
	// I'm sure it could be improved but not important for demonstrating the overall concept of this script.
	candidates.sort((a,b) => a > b ? 1 : -1)

	var searchValue = 1n
	for (const i in candidates) {
		if (candidates[i] == searchValue + 2n) return searchValue + 1n
		searchValue = candidates[i]
	}

	throw "Oops, something went wrong"
}

// Some helper functions:

// Support negative modulo, rather than just "remainder" (thanks stackoverflow, can't remember which post sorry)
function trueMod(n, m) {
  return ((n % m) + m) % m;
}


// Non-recursive newtonian square root (no stack overflow and reduced memory usage)
function sqrt(value) {	
    if (value < 0n) {
        throw 'square root of negative numbers is not supported'
    }

    if (value < 2n) {
        return value;
    }

    x0 = 1n

    do {
    	x1 = ((value / x0) + x0) >> 1n
    	isRoot = x0 === x1 || x0 === (x1 - 1n)
    	x0 = x1
	} while (!isRoot)

    return x0
}
