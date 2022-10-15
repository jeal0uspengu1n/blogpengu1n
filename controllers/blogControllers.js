const Blog = require('../models/blogs.js');

const blog_index = (req, res) => {
    Blog.find().then((result) => {
            res.render('index', {title: 'Home', blogs: result})
        }).catch((err) => {
            console.log(err);
        });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((result) => {
        res.render('details', {blog: result, title: 'Blog details'})
    }).catch((err) =>{
        console.log(err);
        res.render('404', { title: 'Blog not found' });
    });
}


const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blogs');
    }).catch((err) => {
        console.log(err);
    });
}

const blog_delete = (req, res) => {
    const id=req.params.id;
    Blog.findByIdAndDelete(id).then(result => {
        res.json({redirect: '/blogs'})
    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_post,
  blog_delete
}
