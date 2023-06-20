const Blog = require("../models/blog");
const User = require("../models/user");


const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		url: "https://reactpatterns.com/",
		likes: 7,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 50,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
		likes: 10,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
	}
];

const initialUsers = [
	{
		username: "vincentporte",
		name: "Vincent Porte",
		password: "cristaline78"
	},
	{
		username: "matthiu",
		name: "Matthieu Porte",
		password: "motdepasse"
	},
	{
		username: "asticot",
		name: "Johan Emmanuelli",
		password: "quoicoubeh"
	},
	{
		username: "storburlost",
		name: "Luca Sarrubi",
		password: "pargmigniano"
	},
	{
		username: "mister V",
		name: "Yvick Letexier",
		password: "glenda"
	}
];

const nonExistingId = async () => {
	const blog = new Blog({
		title: "willremovethissoon",
		author: "willremovethissoon"
	});
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};


const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map(blog => blog.toJSON());
};


const usersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
};

module.exports = {
	initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
};