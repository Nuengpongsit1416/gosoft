const express = require('express');

const app = express();
app.use(express.json());

let data = []

app.get('/getdata',(req,res) => {
    res.send(data);
})

app.post('/postdata',(req,res) => {
    
    const dataemp = {
        fname: req.body.fname,
        lname: req.body.lname,
        id: req.body.id,
        tel: req.body.tel,
        email: req.body.email,
        position: req.body.position
    }

    if (!dataemp.fname ||
        !dataemp.lname ||
        !dataemp.id ||
        !dataemp.tel ||
        !dataemp.email ||
        !dataemp.position
        ){
        return res.status(400).send("Error");
    }
    
    for(let i = 0; i < data.length; i++){
        if (data[i].id == dataemp.id ||
            data[i].email == dataemp.email ||
            data[i].tel == dataemp.tel){
            return res.status(400).send("Your information has already been used.");
        }
    }

    data.push(dataemp)
    console.log(dataemp)

    res.send('Create Data Success');
})

app.put('/updatedata',(req,res) => {
    if (!req.body.id ||
        !req.body.tel ||
        !req.body.email ||
        !req.body.position 
        ) {
        return res.status(400).send("Error");
    }
    for(let i = 0; i < data.length; i++){
        if (data[i].id == req.body.id){
        
        data[i].id = req.body.id
        data[i].tel = req.body.tel
        data[i].email = req.body.email
        data[i].position = req.body.position

        return res.send("Update Success");
        }
    }
    return res.status(400).send("Error");
})

app.delete('/deletedata',(req,res) => {
    if (!req.body.id){
        return res.status(400).send("Error");
    }
    for(let i = 0; i < data.length; i++){
        if (data[i].id == req.body.id){
        data.splice(i, 1);    
        return res.send("Delete  Success");
        }
    }
    res.status(400).send("Error");
})


app.listen(3000 , () => {
    console.log('Listening on port: 3000');
});