const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs);
});


blogRouter.post("/", async (request, response) => {
	const body = request.body;

	const decodedToken = jwt.verify(request.token,process.env.SECRET);
	if (!decodedToken.id){
		return response.status(401).json({error:"invalid token"});
	}
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: body.title,
		user: user.id,
		url: body.url || "no url",
		likes: body.likes || 0,
	});

	const savedBlog = await blog.save();
	user.blogPosts = user.blogPosts.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog);
});

blogRouter.get("/:id", async (req,res) => {
	const blog = await Blog.findById(req.params.id);
	if(blog){
		res.json(blog);
	} else {
		res.status(404).end();
	}
});

blogRouter.delete("/:id", async (req,res) => {

	const decodedToken = jwt.verify(req.token,process.env.SECRET);
	if (!decodedToken.id){
		return res.status(401).json({error:"invalid token"});
	}
	const user = await User.findById(decodedToken.id);
	const blog = await Blog.findById(req.params.id);

	if (blog.user.toString() === user.id){
		await Blog.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} else {
		res.status(401).json({error:"You cannot delete a post you did not create"});
	}
});

blogRouter.put("/:id", async (req, res) => {
	const body = req.body;

	const decodedToken = jwt.verify(req.token,process.env.SECRET);
	if (!decodedToken.id){
		return res.status(401).json({error:"invalid token"});
	}
	const user = await User.findById(decodedToken.id);
	const blog = await Blog.findById(req.params.id);

	if(blog){
		if (blog.user.toString() === user.id) {
			await Blog.findByIdAndUpdate(req.params.id, { likes: body.likes }, { new: true });
			res.status(204).json(blog);
		} else {
			return res.status(401).json({error:"You cannot update a post you did not create"});
		}
	} else {
		res.status(404).end();
	}
	
});

module.exports = blogRouter;