module.exports = function (req, res, next) {
    var note = '';
    req
        .on('data', function (chunk) {
            note += chunk;
        })
        .on('end', function () {
            try {
                note = JSON.parse(note);
            } catch (error) {
                note = '';
                console.error(error.message);
            }
            if (note && typeof note === 'object' && typeof note.title === 'string') {
                req.db.push(note);
                res.status(201).set('content-type', 'application/json').body = JSON.stringify(note, null, '    ');
            } else {
                res.status(400).set('content-type', 'application/json').body = JSON.stringify({
                    "error": "Expected { \"title\": \"[title]\" }"
                }, null, '    ');
            }
            if (req.get('accept') === 'multipart/nav-data') {
                res.hype = ['getNotes'];
            }
            next();
        });
};
