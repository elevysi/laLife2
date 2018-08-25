module.exports = (req, res, next) => {
	// res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Credentials", true);
    // res.setHeader('Content-Type', 'application/json');
    next();
};