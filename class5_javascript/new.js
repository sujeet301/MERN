//   // const myInfo = {
//             //     name: "sujeet",
//             //     place: "delhi",
//             //     qualification: "B.Tech CSE"
//             // };
//             // console.log(myInfo);

//             // 2.  array destructuring code

//             const numbers = [10, 20, 30, 40];
//             const [, second, third] = numbers;

//             console.log(second); 
//             console.log(third);  

//              const user = { name: "sujeet", city: "delhi" };

//        // Original key : New variable name


//     //      const { name, city: location } = user;

//     //    console.log(location); // "delhi"
//     //    console.log(city);     

//     //    const user = { name: "sujeet" };


//     // 3. What happens if you destructure a key that doesn't exist?

//       const { name, age } = user;

//        console.log(name); // "sujeet"
//         console.log(age);  // undefined 


// const person=["rahil","amit","aditya"];

// const [first,...remaining]=person

// console.log(first)

// console.log(remaining)




// Merge arrays [1,2] and [3,4] using spread operator.

// 2. Write a function using rest that accepts any number of marks and returns their average.

// 3. What is the difference between: const b=[...a]  vs  const b=a ?




const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];

console.log(merged);



function average(...marks) {
    let sum = 0;

    for (let mark of marks) {
        sum += mark;
    }

    return sum / marks.length;
}

console.log(average(80, 90, 70, 60));




const a = [1, 2, 3];
const b = [...a];

b.push(4);

console.log(a);     
console.log(b); 