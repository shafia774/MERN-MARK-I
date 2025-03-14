const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
];
app.get('/', (req,res) => {
 res.send('hello world!');
});

app.get('/api/courses' ,(req,res) => {
    res.send(courses);
   });


app.get('/api/course/:id' ,(req,res) => {
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) res.status(404).send(`The course with ID "${req.params.id}" was not found`)
    res.send(course);
});

app.get('/api/date/:year/:month' ,(req,res) => {
    res.send(req.params);
    // res.send(req.query); // for ? params
    });

app.post('/api/courses', (req,res) => {

    const course = {
        id: courses.length + 1,
        name:req.body.name
    }
    courses.push(course);
    res.send(courses);

})