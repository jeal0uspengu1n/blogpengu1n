const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const mongo_password= process.env.MONGO_PASS;
// connecting mongoDB
const mongoDBUrl="mongodb+srv://pengu1n:"+mongo_password+"@cluster0.klzq56o.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDBUrl).then((result) => console.log('connected to mongoDB')).catch((err) => console.log(err));

// start of code

app.listen(6969);

app.get('/', (req,res) => {
    res.redirect('/blogs');
});
app.get('/about', (req,res) => {
    res.render('about', {title: "About"});
});


// blogs

app.use('/blogs', blogRoutes);

app.get('/create', (req,res) => {
    res.render('create', {title: "Create"});
});

// 404

app.use((req,res) => {
    res.render('404', {title: '404'});
});
