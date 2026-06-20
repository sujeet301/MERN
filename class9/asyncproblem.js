async function loadStudentReport(id) {
    try {
        const student = await getStudent(id);

        const courses = await getCourses(student);

        const grades = await getGrades(courses);

        console.log("Grades:", grades);

    } catch (err) {
        console.log("Error:", err);
    }
}

loadStudentReport(101);