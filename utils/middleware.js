const logger = require("./logger");

const requestTime = function (req, res, next) {
	let dateObj = new Date();
	let hours = (dateObj.getUTCHours()+2)%24;
	let minutes = dateObj.getUTCMinutes();
	let seconds = dateObj.getUTCSeconds();
	req.horaire = hours + ":" + minutes + ":" + seconds ;
	next();
};

const requestLogger = (req, res, next) => {
	logger.info("Method:", req.method);
	logger.info("Path:  ", req.path);
	logger.info("Body:  ", req.body);
	logger.info("At:  ", req.horaire);
	logger.info("---");
	next();
};

const tokenExtractor = (request,response,next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		request.token = authorization.replace("Bearer ", "");
	} else {
		request.token = null;
	}
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "It seems that you got lost :(" });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name ===  "JsonWebTokenError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};


module.exports = {
	requestLogger,
	requestTime,
	tokenExtractor,
	unknownEndpoint,
	errorHandler
};