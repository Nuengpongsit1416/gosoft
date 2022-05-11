const express = require('express');
const game24solver = require('24game-solver/dist/24game-solver');

const app = express();
app.use(express.json());

const isnum = (n) => (typeof n) == "number";
const isnum1to9 = (n) => (n > 0 && n < 10);

app.post('/post',(req,res) =>{
    const bdy = req.body;

    console.log(bdy)

    if(!bdy.n1 || !bdy.n2 || !bdy.n3 || !bdy.n4){
        return res.status.send('Error')
    }
    
    if(!isnum(bdy.n1) || !isnum(bdy.n2) || !isnum(bdy.n3)  || !isnum(bdy.n4)){
        return res.status(403).send('Not number ')
    }

    if(!isnum1to9(bdy.n1) || !isnum1to9(bdy.n2) || !isnum1to9(bdy.n3) || !isnum1to9(bdy.n4) ){
        return res.status(403).send('Not 1-9')
    }

    const result = game24solver([bdy.n1,bdy.n2,bdy.n3,bdy.n4], 24);

    if(result.length == 0) return res.send('Error1')

    res.send({ msg: 'Susses', data:result})

})

app.listen(3000 , () => {
    console.log('Listening on port: 3000');
});