function twoNumberSum(array, targetSum) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === targetSum) {
                console.log(array[i], array[j]);
                return [array[i], array[j]];
            }
        }
    }
}

// using set in o(n) complexity
function twoNumberSum2(array, targetSum) {
    const seen = new Set();
    for (let num of array) {
        const compliment = targetSum - num;
        if (seen.has(compliment))
            return [num, compliment];
        seen.add(num);
    }
}

console.log(twoNumberSum([4, 6, 1, -3], 3));