var db = [
    {
        "title": "Buy cheese and bread for breakfast."
    }
];

module.exports = function (req, res, next) {
    req.db = req.db || db;
    next();
};
