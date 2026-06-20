
// problem 1
// Create array of 5 names.
// • Print all using forEach
// • Print first & last
// • Add 6th using push()
// • Count using .length

console.log("Problem 1: Array of Students");

const students = ["Sujeet", "Rahul", "Amit", "Priya", "Neha"];

// Print all using forEach
students.forEach(student => console.log(student));

// First and Last
console.log("First:", students[0]);
console.log("Last:", students[students.length - 1]);

// Add 6th student
students.push("Rohan");

console.log("Updated Array:", students);

// Count
console.log("Total Students:", students.length);


// problem 2
// Count vowels in a string.
// Input: 'JavaScript'
// Output: 3
// Hint: loop + includes()
console.log("Problem 2: Count Vowels");


function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i].toLowerCase())) {
            count++;
        }
    }
    return count;
}

console.log(countVowels('JavaScript')); // Output: 3

// problem3
// Function: salary + exp
// • exp>5 → +10% bonus
// • else → +5% bonus
// Input:50000,6 → Output:55000
console.log("Problem 3: Calculate Salary with Bonus");


function calculateSalary(salary, exp) {
    let bonus = 0;
    if (exp > 5) {
        bonus = salary * 0.1;
    } else {
        bonus = salary * 0.05;
    }
    return salary + bonus;
}

console.log(calculateSalary(50000, 6)); // Output: 55000


// problem4
// Find sum of array numbers.
// Input: [10, 20, 30, 40]
// Output: 100
// Use both forEach & reduce()
console.log("Problem 4: Find Sum of Array Numbers");

const numbers = [10, 20, 30, 40];

// Using forEach
let sum = 0;
numbers.forEach(num => {
    sum += num;
});
console.log("Sum using forEach:", sum);

// Using reduce
const sumReduce = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum using reduce:", sumReduce);



// problem 05
// ES6 Destructuring
// const user={name,age,city}
// • Destructure all 3
// • Rename city→location
// • Use in template literal
console.log("Problem 5: ES6 Destructuring");

const user = { name: "sujeet", age: 30, city: "delhi" };
const { name, age, city: location } = user;
console.log(`Name: ${name}, Age: ${age}, Location: ${location}`);


// problem 06
// Spread & Filter
// Merge [1,5,15]+[8,12,20]
// using spread.
// Filter: keep only >10
// Output: [15, 12, 20]
console.log("Problem 6: Spread & Filter");

const arr1 = [2,3,5,10];
const arr2 = [11, 12, 15];
const merged = [...arr1, ...arr2];
const filtered = merged.filter(num => num > 10);
console.log(filtered); 
