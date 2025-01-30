let { Student } = require('../model/schemas');

// Fetch all students
function getAll(req, res) {
    Student.find()
        .then((students) => {
            res.send(students);
        })
        .catch((err) => {
            res.send(err);
        });
}

// Create a new student
function create(req, res) {
    let student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;

    student.save()
        .then((student) => {
            res.json({ message: `Student saved with id ${student.id}!` });
        })
        .catch((err) => {
            res.send('Can\'t post student ', err);
        });
}

// Delete a student by ID
function deleteStudent(req, res) {
    const studentId = req.params.id; // Get the ID from the URL params

    Student.findByIdAndDelete(studentId)
        .then((deletedStudent) => {
            if (!deletedStudent) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json({ message: `Student with id ${studentId} deleted!` });
        })
        .catch((err) => {
            res.status(500).send('Error deleting student: ' + err);
        });
}

module.exports = { getAll, create, deleteStudent };
