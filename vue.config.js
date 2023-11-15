module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 3000,
        https: false,
        hotOnly: false,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8090',
                secure: true,
                changeOrigin: true,
                ws: true
            }
        }
    },
    transpileDependencies: [
        /\bvue-awesome\b/
    ],
    lintOnSave: false
}
