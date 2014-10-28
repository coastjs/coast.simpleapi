module.exports = function (req, res, next) {
    res.status(200).set('content-type', 'application/json').body = JSON.stringify(req.db, null, '    ');
    if (req.get('accept') === 'multipart/nav-data') {
        res.hype = ['createNote', 'getNote', 'deleteNote'];
    }
    next();
};
