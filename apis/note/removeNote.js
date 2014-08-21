(function () {
    var db = require('../../db/notedb');
    module.exports = function (env, next) {
        env.response.statusCode = 204;
        delete db[env.route.params.id];
        if (env.request.headers['accept'] === 'multipart/nav-data') {
            env.response.statusCode = 200;
            env.hypermedia = ['listNotes'];
        }
        next(env);
    };
})();
