const express = require('express');
const { findByIdAndRemove } = require('../model/Employee');
const Employee=require('../model/Employee');
const router=express.Router()
const jwt=require('jsonwebtoken')

// create employee
router.post('/', async(req,res) => {
    let response={}
    const token = req.headers.authorization;
    if(!token){
    response.status=204;
    response.message="Token missing from header";
    response.body={};
    return res.status(response.status).send(response);
    }
    const token2 = req.headers.authorization.split("Bearer")[1].trim();
    if(token2=="null"){
        console.log("Subhamay")
        response.status=204;
        response.message="You are not authorized";
        response.body={};
        return res.status(response.status).send(response);
    }
    const decoded = jwt.verify(token2, process.env.ACESS_TOKEN || 'my-secret-key');
    if(!decoded.username){
        response.status=204;
        response.message="You are not authorized";
        response.body={};
        return res.status(response.status).send(response);
    }
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        position: req.body.position,
        about: req.body.about,
        joining_data: req.body.joining_data,      
    })
    try{
        const a1 =  await emp.save() 
        response.status=200;
        response.message="Successfull";
        response.body=a1;
        return res.status(response.status).send(response);
    }catch(err){
        response.status=400;
        response.message="Error";
        response.body={};
        return res.status(response.status).send(response);
    }
})
// update
router.put('/:id',async(req,res)=> {
    try{
        const emp = await Employee.findById(req.params.id) 
        emp.name = req.body.name
        emp.email = req.body.email
        emp.position = req.body.position
        emp.about = req.body.about
        emp.joining_data = req.body.joining_data


        const a1 = await emp.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

// get all employee
router.get('/', async(req,res) => {
    try{
        const emp = await Employee.find()
        res.json(emp)
    }catch(err){
        res.send('Error ' + err)
    }
})
// get employe by id

router.get('/:id', async(req,res) => {
    try{
        const emp = await Employee.findById(req.params.id)
        res.json(emp)
    }catch(err){
        res.send('Error ' + err)
    }
})
// delete the employee

router.delete('/:id',async(req,res)=>{
    try{
        const emp = await Employee.findByIdAndRemove(req.params.id)
        res.json(emp)

    }catch(err){
        res.send('Error ' + err)
    }
})
// router.delete('/emp/:id', (req, res) => {
//     const id = req.params.id;
//     // logic to delete a resource with the given id
//     // ...
  
//     // example using a database:
//     let resource = findByIdAndRemove(id);
//     if (!resource) {
//       return res.status(404).send({ error: 'Resource not found' });
//     }
//     deleteResource(id);
//     res.sendStatus(200);
//   });
  
// search the employee by name
// router.get('/search/:key', (req, res, next) => {
//     const filters = req.query;
//     const filteredUsers = data.filter(user => {
//       let isValid = true;
//       for (key in filters) {
//         console.log(key, user[key], filters[key]);
//         isValid = isValid && user[key] == filters[key];
//       }
//       return isValid;
//     });
//     res.send(filteredUsers);
//   });
// router.get('/search/:name', (req, res) => {
//     const searchTerm = req.query.name;
//     const results = data.filter(item => item.name.includes(searchTerm));
//     res.send(results);
//   });

//   
router.get("/search/:key",async (req,resp)=>{
    let data = await Employee.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {brand:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);

})


module.exports=router