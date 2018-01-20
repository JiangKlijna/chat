
// npm run server # config file

module.exports = {
    port: 9876,
    assetsPublicPath: './dist',
    session: {
        resave: false,
        secret: 'jiangKlijna',
        saveUninitialized: true
    },
    mongoUrl: 'mongodb://jiangKlijna:74898489@localhost:27017/chat'

}
