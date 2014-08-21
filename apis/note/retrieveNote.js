(function () {
    var db = require('../../db/notedb');
    module.exports = function (env, next) {
        var id = env.route.params.id,
            entry = db[id];
        env.response.headers = env.response.headers || {};
        env.response.headers['content-type'] = 'application/json';
        env.response.headers['x-my-header'] = 'The Value';
        if (entry) {
            var note = {};
            for (var field in entry) {
                note[field] = entry[field];
            }
            note.id = id;
            env.response.statusCode = 200;
            env.response.body = JSON.stringify(note, null, '    ');
            if (env.request.headers['accept'] === 'multipart/nav-data') {
                env.hypermedia = ['removeNote'];
            }
        } else {
            env.response.statusCode = 404;
            env.response.body = JSON.stringify({
                "error": "Could not find a Note with id: " + env.route.params.id
            }, null, '    ');
            if (env.request.headers['accept'] === 'multipart/nav-data') {
                env.hypermedia = ['listNotes'];
            }
        }
        next(env);
    };
})();
