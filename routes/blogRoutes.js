const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {

    const redis = require('redis')
    const {promisify} = require('util');
    const client = redis.createClient('redis://127.0.0.1:6379');
    client.get = promisify(client.get)

    const rawBlogsData = await client.get(req.user.id);

    if(rawBlogsData){
      console.log('FROM REDIS')

      return res.send(JSON.parse(rawBlogsData));
    }

    const blogs = await Blog.find({ _user: req.user.id });
    console.log('FROM MONGODB')

    res.send(blogs);
    const what = client.set(req.user.id, JSON.stringify(blogs))
    console.log(what)
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
