
const Joi = require('joi');
const express = require('express')
const expressObj = express();

expressObj.use(express.json());

expressObj.use(express.static('public'));



const courses = [{
    id : 1, name : 'course1'
}, {id : 2, name : 'course2'}, {id : 3, name: 'course3'}];



expressObj.get('/', (req, res) => {
    res.send("Hello world")
})


expressObj.get('/api/courses', (req, res) => {
     res.send(courses)
});


expressObj.get('/api/courses/:id', (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Course not found")
 
})


function validateId(course){
    const isSchema = Joi.object({
        name : Joi.string().min(3).required()
    });

    return isSchema.validate(course);
  
}



expressObj.post('/api/courses', (req, res) => {
    
    

    const result = validateId(req.body)

    if(result.error) return res.status(400).send(result.error.details[0].message);
        
    


    const course = {
        id: courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});





expressObj.put('/api/courses/:id', (req, res) => {

    const course = courses.find(x => x.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Course not found")
   


    //validate 
   
     const result = validateId(req.body)
    if(result.error)
     {
        res.status(400).send(result.error.details[0].message);
        return;
     }


     //update
     course.name = req.body.name
     res.send(course)


});



expressObj.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("Course not found")
   

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)


});








const port = process.env.PORT || 2000
expressObj.listen(port, () => console.log(`Listening on ${port}...`))