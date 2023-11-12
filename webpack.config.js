
const path = require("path");

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
        clean: true, // Очищает директорию dist перед обновлением бандла        
        filename: 'index.js',
    },

    devtool: 'source-map',

    devServer: {
        hot: true, // Включает автоматическую перезагрузку страницы при изменениях
        port: 80,
        // static: {
        //     directory: path.join(__dirname, 'public'),
        //   },
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
    }
}