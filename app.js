const express = require('express');
let morgan = require('morgan') //package name - morgan


const app = express();

app.set('views', './views')
app.set('view engine', 'ejs')

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
// app.use((req,res,next) => {
//     console.log(`${req.method} ${req.originalUrl} --`);
//     next();
// })

app.get('/',(req,res) => {


    let blogs = [
        { title : 'Blog title 1', intro : 'this is blog intro 1'},
        { title : 'Blog title 2', intro : 'this is blog intro 2'},
        { title : 'Blog title 3', intro : 'this is blog intro 3'},

    ];

    res.render('home',{
        blogs,
        title : "Home"
    })
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

app.use((req,res) => {
    res.status(404).render('404',{
        title : "404 not found"
    });
    
});

app.listen(3000,() => {
    console.log('app is running on port 3000');
})