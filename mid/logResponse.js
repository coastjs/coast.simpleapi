module.exports = function (req, res, next) {
    console.log(new Date().toUTCString() + ': ' + res.statusCode);
    next();
};
