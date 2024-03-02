const Blog = require('../models/Blog');

const BlogController = {
   index : async (req,res) => {
        let blogs = await  Blog.find().sort({createdAt : -1});//order descending
        console.log(blogs);
    
        res.render('home',{
            blogs,
            title : "Home"
        })
    },
   store : async (req,res) => {
    let {title,intro,body} = req.body;
    let blog = new Blog({
        title,
        intro,
        body
    });

    await blog.save();
    res.redirect('/');
},
   create : (req,res) => {
    res.render('blogs/create',{
        title : 'Blog Create'
    });
},

destry : async (req,res) => {
    try {
        let id = req.params.id;
        await Blog.findByIdAndDelete(id);//how to get one blog with id
        res.redirect('/');
    } catch (e) {
        console.log(e)
        next()
        
    }
},

show : async (req,res) => {
    try {
        let id = req.params.id;
    let blog = await Blog.findById(id);//how to get one blog with id
    res.render('blogs/show', {
        blog,
        title : "Blog Detail"
    })
    } catch (e) {
        console.log(e)
        next()
        
    }
}

//MVC flow 

}

module.exports = BlogController;