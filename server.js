let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let student = require('./routes/students');
let course = require('./routes/courses');
let grade = require('./routes/grades');
let cors = require('cors'); // Import the cors package

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// MongoDB connection (update your URI if necessary)
const uri = 'mongodb+srv://root:admin@cluster0.iylnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = {};

mongoose.connect(uri, options)
    .then(() => {
            console.log("Connexion à la base OK");
        },
        err => {
            console.log('Erreur de connexion: ', err);
        });

// CORS configuration - allow all origins or specify your front-end domain
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your React front-end (update the URL if necessary)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// Define routes
const prefix = '/api';

app.route(prefix + '/students')
    .get(student.getAll)
    .post(student.create);

app.route(prefix + '/courses')
    .get(course.getAll)
    .post(course.create);

app.route(prefix + '/grades')
    .get(grade.getAll)
    .post(grade.create);

// Start the server
app.listen(port, "0.0.0.0", () => {
    console.log('Serveur démarré sur http://localhost:' + port);
});

module.exports = app;
