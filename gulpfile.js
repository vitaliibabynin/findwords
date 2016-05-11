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
    runSequence = require('gulp-run-sequence'),
    sass = require('gulp-sass'),
    replace = require('gulp-replace'),
    exec = require('child_process').exec
    , shell = require('shelljs')
    ;



var path = {
    cordova: {
        root: 'cordova/app/',
        www: 'cordova/app/www/',
        wwwbuild: 'cordova/app/www/build/'
    },
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        root: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        music: 'build/music/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        jsInitial: 'source/js/initialcheck/initialcheck.app.js',
        jsApp: 'source/js/app/init.app.js',
        cssInitial: 'source/scss/init.scss',
        cssApp: 'source/scss/full.scss'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        jsInitial: 'source/js/initialcheck/**/*.js',
        jsApp: 'source/js/app/**/*.js',
        jsLib: 'source/jslib/**/*.js',
        css: 'source/scss/**/*.scss',
        cssLib: 'source/csslib/**/*.css',
        img: 'source/img/**/*.*',
        music: 'source/music/**/*.*',
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

gulp.task('clean:music', function() {
    gulp.src(path.build.music+'**/*.*', {read: false})
        .pipe(clean())
        .on('finish', function () {
            console.log('MUSIC cleaned');
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
    , 'clean:music'
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
            .on("error", function (err) { console.log("Error: " + err.message); this.emit('end'); })
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
            .on("error", function (err) { console.log("Error: " + err.message); this.emit('end'); })
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
            .on("error", function (err) { console.log("Error: " + err.message); this.emit('end'); })
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
            .on("error", function (err) { console.log("Error: " + err.message); this.emit('end'); })
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
            .pipe(sass())
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
            .pipe(sass())
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
            .pipe(sass())
            .pipe(sourcemaps.init()) //Инициализируем sourcemap
            .pipe(prefixer()) //Добавим вендорные префиксы
            .pipe(cssmin()) //Сожмем
            .pipe(sourcemaps.write())
            .pipe(out('./'+path.build.css+'bundle.init.css'))
            //.pipe(reload({stream: true}))
            .on('finish', function() {
                console.log('DEV Finished '+path.src.cssInitial);
            })
        ;

        gulp.src(path.src.cssApp)
            .pipe(plumber())
            .pipe(sourcemaps.init()) //Инициализируем sourcemap
            .pipe(sass())
            .pipe(prefixer()) //Добавим вендорные префиксы
            .pipe(cssmin()) //Сожмем
            .pipe(sourcemaps.write())
            .pipe(out('./'+path.build.css+'bundle.app.css'))
            //.pipe(reload({stream: true}))
            .on('finish', function() {
                console.log('DEV Finished '+path.src.cssApp);
            })
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

gulp.task('music:build', function(){
    return gulp
        .src(path.watch.music)
        .pipe(gulp.dest(path.build.music))
        .on('finish', function() {
            console.log('MUSIC copied to '+path.build.music);
        });
});


gulp.task('app:settings:prepare', function(cb){
    shell.cp(
        './cordova/install-config/source/game.data.js',
        './source/js/initialcheck/game.data.js'
    );
    shell.cp(
        './cordova/install-config/source/app.colors.scss',
        './source/scss/app.colors.scss'
    );

    console.log('AppSettings prepared.');

    cb();
});

gulp.task('fonts:build', function(){
    return gulp
        .src(path.watch.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .on('finish', function() {
            console.log('Fonts copied to '+path.build.fonts);
        });
});


gulp.task('cordova:clean', function (cb) {
    gulp.src(path.cordova.www, {read: false})
        .pipe(clean())
        .on('finish', function () {
            console.log('Cordova '+path.cordova.www+' cleaned.');
            cb();
        });
});

gulp.task('cordova:prepare:www', function (cb) {

    var c = 0;

    gulp.src('index.html')
        //.pipe(replace(/var[\s]*CURRENT_ENV[\s]*=[\s]*ENV_ALEK;/gi, 'var CURRENT_ENV = ENV_PRODUCTION;'))
        .pipe(replace(/var[\s]*CURRENT_ENV[\s]*=[\s]*[\w_]+;/gi, 'var CURRENT_ENV = ENV_PRODUCTION;'))
        .pipe(replace(/<\/script>/i,'</script>\n<script src="cordova.js" type="text/javascript"></script>'))
        .pipe(replace(/\/build/gi,'build'))
        .pipe(gulp.dest(path.cordova.www))
        .on('finish', function() {
            console.log('Cordova: index.html copied to '+path.cordova.www+' and ENV replaced');
            c++;
            if(c >= 2){
                cb();
            }
        });
    gulp
        .src(path.build.root+'**/*.*')
        .pipe(gulp.dest(path.cordova.wwwbuild))
        .on('finish', function() {
            console.log('Build '+path.build.root+'**/*.* copied to '+path.cordova.wwwbuild);
            c++;
            if(c >= 2){
                cb();
            }
        });
});

gulp.task('cordova:prepare:app', function (cb) {
    console.log('cd ./'+path.cordova.root+' && cordova prepare');
    exec('cd ./'+path.cordova.root+' && cordova prepare', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        //shell.cp(
        //    './cordova/app/plugins/cordova-plugin-facebook/www/CordovaFacebook.js',
        //    './cordova/app/platforms/android/assets/www/plugins/cordova-plugin-facebook/www/CordovaFacebook.js'
        //);
        //shell.cp(
        //    './cordova/app/plugins/cordova-plugin-facebook/www/CordovaFacebook.js',
        //    './cordova/app/platforms/ios/www/plugins/cordova-plugin-facebook/www/CordovaFacebook.js'
        //);

        cb(err);
    });
});

gulp.task('cordova:all', function (cb) {
    runSequence(
        'cordova:clean',
        'cordova:prepare:www',
        'cordova:prepare:app',
        cb);
});

gulp.task('build', function(cb) {
    runSequence(
        'app:settings:prepare',
        'fonts:build',
        'img:build',
        'music:build',
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
    watch([path.watch.music], function(event, cb) {
        gulp.start('music:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('css:build');
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'watch']);
