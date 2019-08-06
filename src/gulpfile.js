const { series,src,dest,watch,task } = require('gulp');
//转译javascript
function webpackTask() {
    // place code for your default task here
    const webpack = require('webpack-stream')
    const config = require('./webpack.config.js')
    return src('./js/**/*.ts')
        .pipe(webpack(config,require("webpack")))
        .pipe(dest('../www/js'))
}
//转移less
function lessTask(){
    const less = require('gulp-less')
    return src('./less/*.less')
        .pipe(dest('../www/css'))
}

function watchTask(done){
    watch(['less/**/*.less'],series(lessTask));
    watch(["js/**/*.ts"],series(webpackTask))
    done()
}

task('default',series(webpackTask,lessTask,watchTask))