const express = require('express');
const app = express();
const course = require('./routes/course.js');
const review = require('./routes/review.js');
const PORT = 3000;

app.get('/api', (req, res) => {
    res.send('YU-Reviews API')
})

app.use('/api/course', course);
app.use('/api/review', review);

app.listen(PORT, (err) => {
    if (err) 
        console.log('<< Err: Could not connect >>');
    console.log(`Listening on localhost:${PORT}`);
});
