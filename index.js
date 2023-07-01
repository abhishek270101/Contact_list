// // const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

// var contactList = [
//     {
//         name: "Pooja",
//         phone: "88993894828"
//     },
//     {
//         name: "pihu",
//         phone: "8899601557"
//     },
//     {
//         name: "Akshay",
//         phone: "7216742270"
//     },
//     {   
//         name: "Mahima",
//         phone: "91944662634"
//     }
// ]

app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error', err); 
            return; 
        }
        //console.log(contacts);
        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });

    })
    
});



// app.get('/practice', function(req, res){
//     return res.render('practice', {
//         title: "Playing with EJS",
//     });
// });

app.post('/create-contact', async function(req,res){
    // contactList.push(req.body)
    let newContact  =  Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    if(newContact){
        return res.redirect('back');
    }
    // return res.redirect('back');
});

app.get('/delete-contact/', function(req, res){
    // console.log(req.query);
    //get the if from query in url
    let id = req.query.id;
    //find the contact in database using id abd delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error', err); 
            return; 
        }
        return res.redirect('back');
    })
    
    
});



app.listen(port, function(err){
    if(err){console.log('ERROR!', err)}
    console.log('server is running on port', port);
})
