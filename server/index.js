const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const course = require('./routes/course.js');
const review = require('./routes/review.js');
const users = require('./routes/users.js');
const PORT = 3000;
const cors = require('cors')

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(bodyParser.json());

app.use(cors())

app.get('/api', (req, res) => {
    res.send('YU-Reviews API')
})

app.use('/api/course', course);
app.use('/api/review', review);
app.use('/api/users', users);


app.listen(PORT, (err) => {
    if (err) 
        console.log('<< Err: Could not connect >>');
    console.log(`Listening on localhost:${PORT}`);
});
