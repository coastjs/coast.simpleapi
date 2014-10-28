module.exports = function (req, res, next) {
    var id = req.param('id'),
        entry = req.db[id];
    res
        .set('content-type', 'application/json')
        .set('x-my-header', 'The Value');
    if (entry) {
        entry.id = id;
        res.status(200).body = JSON.stringify(entry, null, '    ');
        delete entry.id;
        if (req.get('accept') === 'multipart/nav-data') {
            res.hype = ['deleteNote'];
        }
    } else {
        res.status(404).body = JSON.stringify({ "error": "Could not find a Note with id: " + id }, null, '    ');
        if (req.get('accept') === 'multipart/nav-data') {
            res.hype = ['getNotes'];
        }
    }
    next();
};
