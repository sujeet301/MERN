


// arry = [1, 2, 3, 4, 5]

// // Using reduce to sum the array
// const total = arry.reduce((sum, current) => {
//     return sum + current;
// }, 0);
// console.log(total);


// // step1: sum = 0, current = 1 → sum + current = 0 + 1 = 1
// // step2: sum = 1, current = 2 → sum + current = 1 + 2 = 3 
// // step3: sum = 3, current = 3 → sum + current = 3 + 3 = 6
// // step4: sum = 6, current = 4 → sum + current = 6 + 4 = 10
// // step5: sum = 10, current = 5 → sum + current = 10 + 5 = 15


// // sort


// fruits = ['banana', 'apple', 'cherry', 'date'];
// fruits.sort();
// console.log(fruits);


// array = [5, 2, 9, 1, 5, 6];
// array.sort((a, b) => a - b);
// console.log(array); 




// reverse

const numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers);

//join()

const words = ['Hello', 'World', 'from', 'JavaScript'];
const sentence = words.join(' ');
console.log(sentence); 

//flat

const nestedArray = [1, [2, 3], [4, [5, 6]]];
const flattenedArray = nestedArray.flat(2);
console.log(flattenedArray);