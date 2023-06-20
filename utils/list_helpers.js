const dummy = () => {
	return 1;
};

const totalLikes = (list) => {
	let tot = 0;
	for (let i = 0; i<list.length; i++){
		tot += list[i].likes;
	}
	return tot;
};

const favoriteBlog = (list) => {
	let fav = null;
	let maxLikes = 0;
	for (let i = 0; i<list.length; i++){
		if (list[i].likes > maxLikes){
			fav = list[i];
			maxLikes = list[i].likes;
		}
	}
	if (!fav) return null;
	return {
		title: fav.title,
		author: fav.author,
		likes: fav.likes
	};
};

const mostBlogs = (list) => {
	if (list === null || list === undefined || list.length === 0){
		return null;
	}
	let dict = {};
	let maxKey = null;
	let maxVal = 0;
	for (let i = 0; i<list.length; i++){
		dict[list[i].author] = list[i].author in dict ? dict[list[i].author] + 1 : 1;
		if (dict[list[i].author] > maxVal){
			maxKey = list[i].author;
			maxVal = dict[list[i].author];
		}
	}
	return {
		author: maxKey,
		blogs: maxVal
	};
};

const mostLikes = (list) => {
	if (list === null || list === undefined || list.length === 0){
		return null;
	}
	let dict = {};
	let maxKey = null;
	let maxVal = 0;
	for (let i = 0; i<list.length; i++){
		dict[list[i].author] = list[i].author in dict ? dict[list[i].author] + list[i].likes : list[i].likes;
		if (dict[list[i].author] > maxVal){
			maxKey = list[i].author;
			maxVal = dict[list[i].author];
		}
	}
	return {
		author: maxKey,
		likes: maxVal
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};