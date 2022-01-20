//require routers
const authRouter = require('./auth.router');
const postRouter = require('./post.router');



function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/posts', postRouter);
}

module.exports = route;