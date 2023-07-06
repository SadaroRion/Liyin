const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');

const miniCssExtractPlugin =require("mini-css-extract-plugin")

const spm =require("webpack-spritesmith");



module.exports = {
    mode: "development",//development为开发模式，production为生产模式
    // 配置打包模式

    entry:'./src/index.js',
    // 配置出口路径

    plugins: [
        //webpack-server必须要配置这个才能运行后直接显示出html页面。
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './src/index.html', //
            filename: 'index.html' //生成在目录中
        }),
        new miniCssExtractPlugin({
            //指定输出文件目录和文件名
            filename:'[name].[chunkhash:6].css',
          
        }),
        new spm({
          //设置源路径
          src:{
            cwd:path.resolve(__dirname,'src/img/icon'),
            glob:'*.png'

          },
          //设置导出文件位置
          target:{
            image:path.resolve(__dirname,'liyin/img/sprite.png'),
            css:path.resolve(__dirname,"liyin/sprite.css")
          },
          apiOptions:{
            cssImageRef:'./img/sprite.png'
          }
        })
        
    ],
    output:{
        path:path.join(__dirname,'./liyin'),//输出文件路径
        filename:'index.[hash:8].js'//输出文件名
    },
    // 配置输出文件

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
            {test:/\.css$/,use:[
              // "style-loader",
            miniCssExtractPlugin.loader,
              'css-loader'
            ]},
          {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
          {test:/\.s[ac]ss$/,use:['style-loader','css-loader','sass-loader']},
          {
            test: /\.(png|jpe?g|gif|svg)/,
          
              use: {
                loader: 'file-loader',
          
                options: {
                  name: 'img/[name].[hash:6].[ext]',
                  esModule:false,
                  limit:8196
                },
              },
              dependency:{not:["url"]}
              // 加上此方法解决图片不显示问题
            },
        //   {loader:'postcss-loader',
        //     options:{
        //       ident:'postcss',
        //       plugins:()=>[
        //         require('postcss-sprites')(),
        //         require('postcss-preset-env')()
        //       ]
        //     }
        // }
        ],
      },
    
    //引入加载器
}
