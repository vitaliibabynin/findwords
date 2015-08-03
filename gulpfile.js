'use strict';

var gulp = require('gulp'),
    out = require('gulp-out'),
    watch = require('gulp-watch'),
    browserify = require('browserify'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    styletto = require("styletto"),
    plumber = require('gulp-plumber'),
    clean = require('gulp-clean'),
    source = require('vinyl-source-stream'),
    runSequence = require('gulp-run-sequence')
    ;



var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        jsInitial: 'source/js/initialcheck/initialcheck.app.js',
        jsApp: 'source/js/app/init.app.js',
        cssInitial: 'source/css/init.css',
        cssApp: 'source/css/full.css'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        jsInitial: 'source/js/initialcheck/**/*.js',
        jsApp: 'source/js/app/**/*.js',
        jsLib: 'source/jslib/**/*.js',
        css: 'source/css/**/*.css',
        cssLib: 'source/csslib/**/*.css',
        img: 'source/img/**/*.*',
        fonts: 'source/fonts/**/*.*'
    }
    //, clean: ['./build/css', './build/js', './build/fonts', './build/img']
};


gulp.task('clean:img', function() {
    gulp.src(path.build.img+'**/*.*', {read: false})
        .pipe(clean())
        .on('finish', function () {
            console.log('IMG cleaned');
        });
});

gulp.task('clean:js', function() {
    gulp.src(path.build.js+'*.*', {read: false})
        .pipe(clean())
        .on('finish', function () {
            console.log('JS cleaned');
        });
});

gulp.task('clean:css', function() {
    gulp.src(path.build.css+'*.*', {read: false})
        .pipe(clean())
        .on('finish', function () {
            console.log('CSS cleaned');
        });
});

gulp.task('clean:fonts', function() {
    gulp.src(path.build.fonts+'*.*', {read: false})
        .pipe(clean())
        .on('finish', function () {
            console.log('FONTS cleaned');
        });
});

gulp.task('clean:all', [
    'clean:img'
    , 'clean:js'
    , 'clean:css'
    , 'clean:fonts'
]);

gulp.task('js:build:initial', function () {
    if(process.env.NODE_ENV == "production"){
        //for prod
        var b = browserify({
            entries: path.src.jsInitial
            , debug: false
            //, insertGlobals: true
            , transform: ['reactify', 'envify']
        });

        b.bundle()
            .pipe(plumber())
            .pipe(source(path.src.jsInitial))
            .pipe(buffer())
            .pipe(uglify()) //Сожмем наш js
            .pipe(out('./'+path.build.js+'bundle.initialcheck.js'))
            .on('finish', function() {
                console.log('PROD Finished '+path.src.jsInitial);
            })
        ;
    }else{
        //for dev
        var b = browserify({
            entries: path.src.jsInitial
            , debug: false
            //, insertGlobals: true
            , transform: ['reactify', 'envify']
        });

        b.bundle()
            .pipe(plumber())
            .pipe(source(path.src.jsInitial))
            .pipe(buffer())
            .pipe(sourcemaps.init()) //Инициализируем sourcemap
            //.pipe(uglify()) //Сожмем наш js
            .pipe(sourcemaps.write()) //Пропишем карты
            .pipe(out('./' + path.build.js + 'bundle.initialcheck.js'))
            .on('finish', function () {
                console.log('DEV Finished ' + path.src.jsInitial);
            })
        ;
    }
});
gulp.task('js:build:app', function () {
    if(process.env.NODE_ENV == "production"){
        //for prod
        var b = browserify({
            entries: path.src.jsApp
            , debug: false
            //, insertGlobals: true
            , transform: ['reactify', 'envify']
        });

        b.bundle()
            .pipe(plumber())
            .pipe(source(path.src.jsApp))
            .pipe(buffer())
            .pipe(uglify()) //Сожмем наш js
            .pipe(out('./'+path.build.js+'bundle.app.js'))
            .on('finish', function() {
                console.log('PROD Finished '+path.src.jsApp);
            })
        ;
    }else{
        //for dev
        var b = browserify({
            entries: path.src.jsApp
            , debug: false
            //, insertGlobals: true
            , transform: ['reactify', 'envify']
        });

        b.bundle()
            .pipe(plumber())
            .pipe(source(path.src.jsApp))
            .pipe(buffer())
            .pipe(sourcemaps.init()) //Инициализируем sourcemap
            //.pipe(uglify()) //Сожмем наш js
            .pipe(sourcemaps.write()) //Пропишем карты
            .pipe(out('./' + path.build.js + 'bundle.app.js'))
            .on('finish', function () {
                console.log('DEV Finished ' + path.src.jsApp);
            })
        ;
    }
});
gulp.task('js:copy:lib', function () {
    gulp
        .src(path.watch.jsLib)
        .pipe(gulp.dest(path.build.js))
        .on('finish', function() {
            console.log('JSLibs copied to '+path.build.js);
        });
});
gulp.task('js:build', [
    'js:build:initial'
    , 'js:build:app'
    , 'js:copy:lib'
]);


gulp.task('css:build:all', function () {
    if(process.env.NODE_ENV == "production"){
        //for prod
        gulp.src(path.src.cssInitial)
            .pipe(plumber())
            //.pipe(sass()) //Скомпилируем
            .pipe(prefixer()) //Добавим вендорные префиксы
            .pipe(cssmin()) //Сожмем
            .pipe(out('./'+path.build.css+'bundle.init.css'))
            //.pipe(reload({stream: true}))
            .on('finish', function() {
                var stylettoConfig = require('./.styletto.json');
                stylettoConfig.input = ["./build/css/bundle.init.css"];
                stylettoConfig.output = "./build/css/bundle.init.embeded.css";
                styletto( stylettoConfig, function(err, sucess, css ) {
                    if(err) console.log(err);
                    console.log('styletto [bundle.init.css] completed. CSS embeded');
                });
            })
        ;

        gulp.src(path.src.cssApp)
            .pipe(plumber())
            //.pipe(sass()) //Скомпилируем
            .pipe(prefixer()) //Добавим вендорные префиксы
            .pipe(cssmin()) //Сожмем
            .pipe(out('./'+path.build.css+'bundle.app.css'))
            //.pipe(reload({stream: true}))
            .on('finish', function() {
                var stylettoConfig = require('./.styletto.json');
                stylettoConfig.input = ["./build/css/bundle.app.css"];
                stylettoConfig.output = "./build/css/bundle.app.embeded.css";
                styletto( stylettoConfig, function(err, sucess, css ) {
                    if(err) console.log(err);
                    console.log('styletto [bundle.app.css] completed. CSS embeded');
                });
            })
        ;
    }else{
        //for dev
        gulp.src(path.src.cssInitial)
            .pipe(plumber())
            .pipe(sourcemaps.init()) //Инициализируем sourcemap
            //.pipe(sass()) //Скомпилируем
            .pipe(prefixer()) //Добавим вендорные префиксы
            .pipe(cssmin()) //Сожмем
            .pipe(sourcemaps.write())
            .pipe(out('./'+path.build.css+'bundle.init.css'))
            //.pipe(reload({stream: true}))
        ;

        gulp.src(path.src.cssApp)
            .pipe(plumber())
            .pipe(sourcemaps.init()) //Инициализируем sourcemap
            //.pipe(sass()) //Скомпилируем
            .pipe(prefixer()) //Добавим вендорные префиксы
            .pipe(cssmin()) //Сожмем
            .pipe(sourcemaps.write())
            .pipe(out('./'+path.build.css+'bundle.app.css'))
            //.pipe(reload({stream: true}))
        ;
    }
});
gulp.task('css:copy:lib', function () {
    return gulp
        .src(path.watch.cssLib)
        .pipe(gulp.dest(path.build.css))
        .on('finish', function() {
            console.log('CSSLibs copied to '+path.build.css);
        });
});
gulp.task('css:build', [
    'css:build:all'
    , 'css:copy:lib'
]);

gulp.task('img:build', function(){
    return gulp
        .src(path.watch.img)
        .pipe(gulp.dest(path.build.img))
        .on('finish', function() {
            console.log('IMG copied to '+path.build.img);
        });
});

gulp.task('fonts:build', function(){
    return gulp
        .src(path.watch.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .on('finish', function() {
            console.log('Fonts copied to '+path.build.fonts);
        });
});

gulp.task('build', function(cb) {
    runSequence(
        'fonts:build',
        'img:build',
        'js:build',
        'css:build', cb);
});



gulp.task('watch', function(){
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.cssLib], function(event, cb) {
        gulp.start('css:copy:lib');
    });
    watch([path.watch.jsInitial], function(event, cb) {
        gulp.start('js:build:initial');
    });
    watch([path.watch.jsApp], function(event, cb) {
        gulp.start('js:build:app');
    });
    watch([path.watch.jsLib], function(event, cb) {
        gulp.start('js:copy:lib');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('css:build');
        gulp.start('img:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('css:build');
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'watch']);
