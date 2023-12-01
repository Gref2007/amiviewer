const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const answerjs = require("./answer.json");

let mode = 'development'; // По умолчанию режим development
if (process.env.NODE_ENV === 'production') { // Режим production, если 
    // при запуске вебпака было указано --mode=production
    mode = 'production';
}

module.exports = {
    mode,
    entry: './src/index.js', // Указываем точку входа - главный модуль приложения,
    // в который импортируются все остальные

    output: {
        path: path.resolve(__dirname, 'public/src'), // Директория, в которой будет
        // размещаться итоговый бандл, папка dist в корне приложения
        publicPath: "public/src",
        //publicPath: path.join(__dirname, 'public/src'),
        clean: true, // Очищает директорию dist перед обновлением бандла        
        filename: 'index.js',
    },

    devtool: 'source-map',
    //watch: true,

    devServer: {
        hot: true, // Включает автоматическую перезагрузку страницы при изменениях
        port: 80,
        onAfterSetupMiddleware: function (devServer) {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            devServer.app.post('/api/v1/draw', function (req, res) {
                res.json(answerjs);
            });
        },
        static: {
            directory: path.join(__dirname, './public/src'),
            //publicPath: '/public/src',
        },
    },

    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",   // определяем загрузчик
                options: {
                    presets: ["@babel/preset-react"]    // используемые плагины
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'views', 'index.html'),
            filename: 'index.html',
            minify: false,
        }),
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, "src", "vendor"), to: 'vendor' }]
        }),
    ]
}