(function () {
    var db = require('../../db/notedb');
    module.exports = function (env, next) {
        var note = '';
        env
            .request
            .on('data', function (chunk) {
                note += chunk;
            })
            .on('end', function () {
                env.response.headers = env.response.headers || {};
                env.response.headers['content-type'] = 'application/json';
                try {
                    note = JSON.parse(note);
                } catch (error) {
                    note = '';
                    console.error(error.message);
                }
                if (note && typeof note === 'object' && typeof note.title === 'string') {
                    var keys = Object.keys(db),
                        lastKey = keys[keys.length - 1] || '-1';
                    db[String(Number(lastKey) + 1)] = note;
                    env.response.statusCode = 201;
                    env.response.body = JSON.stringify(note, null, '    ');
                } else {
                    env.response.statusCode = 400;
                    env.response.body = JSON.stringify({
                        "error": "Expected { \"title\": \"[title]\" }"
                    }, null, '    ');
                }
                if (env.request.headers['accept'] === 'multipart/nav-data') {
                    env.hypermedia = ['listNotes'];
                }
                next(env);
            });
    };
})();
