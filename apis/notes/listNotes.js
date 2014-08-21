(function () {
    var db = require('../../db/notedb');
    module.exports = function (env, next) {
        env.response.statusCode = 200;
        env.response.headers = env.response.headers || {};
        env.response.headers['content-type'] = 'application/json';
        env.response.body = JSON.stringify(db, null, '    ');
        if (env.request.headers['accept'] === 'multipart/nav-data') {
            env.hypermedia = ['createNote', 'retrieveNote', 'removeNote'];
        }
        next(env);
    };
})();
