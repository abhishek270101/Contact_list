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

app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error', err); 
            return; 
        }
        
        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });

    })
    
});

app.post('/create-contact', async function(req,res){
   
    let newContact  =  Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    if(newContact){
        return res.redirect('back');
    }
   
});

app.get('/delete-contact/', function(req, res){

    let id = req.query.id;
    
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
