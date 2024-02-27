const express = require('express');
let morgan = require('morgan') //package name - morgan
const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(express.urlencoded({extended:true}));//form data for pass and then userreq of body submit

//db url
let mongoUrl = "mongodb+srv://naingwinphyoe:test1234@cluster0.q0gvjex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUrl).then(() => {
    console.log('connected to db')
    app.listen(3000,() => {
        console.log('app is running on port 3000');
    })
}).catch(e => {
    console.log(e)
})


app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/default');

//custom middleware fun
// let logger = (env) => {
//     return (req,res,next) => {
//         if(env === 'dev'){
//             console.log(`${req.method} ${req.originalUrl} --`);

//         }
        
//         next();
//     };
// }

//call third party middleware
app.use(morgan('dev'))//this working pretty format response
app.use(express.static('public'))

app.get('/add-blog',async (req,res) => {
    let blog = new Blog({
        title : "blog title 3",
        intro : "blog intro 3",
        body : "blog body 3"
    });

    await blog.save();
    res.send('blog saved');
});

app.get('/single-blog',async (req,res) => {
    let blog = await Blog.findById('65db80c86f6b1b8b01ee6f6a');//how to get one blog with id
    res.json(blog);
});
// app.use((req,res,next) => {
//     console.log(`${req.method} ${req.originalUrl} --`);
//     next();
// })

app.get('/',async (req,res) => {


    // let blogs = [
    //     { title : 'Blog title 1', intro : 'this is blog intro 1'},
    //     { title : 'Blog title 2', intro : 'this is blog intro 2'},
    //     { title : 'Blog title 3', intro : 'this is blog intro 3'},

    // ];

    let blogs = await  Blog.find().sort({createdAt : -1});//order descending
    console.log(blogs);

    res.render('home',{
        blogs,
        title : "Home"
    })
});
//data pass for backends
app.post('/blogs',async (req,res) => {
    let {title,intro,body} = req.body;
    let blog = new Blog({
        title,
        intro,
        body
    });

    await blog.save();
    res.redirect('/');
});




app.get('/about',(req,res) => {
    res.render('about',{
        title : "About"  
    });
});

app.get('/contact',(req,res) => {
    res.render('contact',{
        title : "Contact"
    });
});

app.get('/blogs/create',(req,res) => {
    res.render('blogs/create',{
        title : 'Blog Create'
    });
});

app.use((req,res) => {
    res.status(404).render('404',{
        title : "404 not found"
    });
    
});

