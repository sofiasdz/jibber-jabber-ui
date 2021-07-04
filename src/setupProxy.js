const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        "/posts",
        createProxyMiddleware ({
            target: "http://localhost:8001",
            changeOrigin: true
        }),
    );
    app.use(
        "/login",
        createProxyMiddleware ({
            target: "http://localhost:8002",
            changeOrigin: true
        })
    );
    app.use(
        "/users",
        createProxyMiddleware ({
            target: "http://localhost:8002",
            changeOrigin: true
        })
    );


};