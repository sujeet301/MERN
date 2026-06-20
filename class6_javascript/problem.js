// function loadUser(userId, fun) {
//     setTimeout(() => {
//         const user = {
//             id: userId,
//             name: "Student"
//         };

//         fun(user);
//     }, 1000);
// }

// loadUser(45, function(user) {
//     console.log("User loaded:", user.id, user.name);
// });


function loadUser(userId, callback, onError) {
    setTimeout(() => {
        if (userId < 1) {
            onError("Invalid ID");
            return;
        }

        const user = {
            id: userId,
            name: "Student"
        };

        callback(user);
    }, 1000);
}

// Valid ID
loadUser(
    101,
    function(user) {
        console.log("User loaded:", user.name);
    },
    function(error) {
        console.log("Error:", error);
    }
);