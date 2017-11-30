
// npm run server # config file

module.exports = {
    port: 9876,
    assetsPublicPath: './dist',
    session: {
        resave: false,
        secret: 'jiangKlijna',
        saveUninitialized: true
    }
}
