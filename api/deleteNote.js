module.exports = function (req, res, next) {
    var id = req.param('id');
    if (id) {
        req.db.splice(id, 1);
    }
    res.status(204);
    if (req.get('accept') === 'multipart/nav-data') {
        res.status(200).hype = ['getNotes'];
    }
    next();
};
