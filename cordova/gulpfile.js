'use strict';

var gulp = require('gulp')
    , fs = require('fs')
    , clean = require('gulp-clean')
    , runSequence = require('gulp-run-sequence')
    , exec = require('child_process').exec
    , shell = require('shelljs')
    ;

var path = {
    cordova: {
        root: './',
        repo: './repo/',
        app: './app/',
        installConfig: './install-config/'
    }
};

var installConfig = require(path.cordova.installConfig + 'config.json');
console.log(installConfig);



gulp.task('cordova:app:clean', function (cb) {
    gulp.src(path.cordova.app, {read: false})
        .pipe(clean())
        .on('finish', function () {
            console.log('Cordova '+path.cordova.app+' cleaned.');
            cb();
        });
});


gulp.task('cordova:app:init', function (cb) {
    try{
        fs.statSync(path.cordova.app + 'config.xml');
    }catch(err){
        if(err.code == 'ENOENT'){
            gulp
                .src('./'+path.cordova.repo+'clearapp/*')
                .pipe(gulp.dest(path.cordova.app))
                .on('finish', function() {
                    console.log('ClearApp copied to '+path.cordova.app);

                    var configXml = path.cordova.app + 'config.xml';
                    shell.sed('-i', /__PACKAGE__/g, installConfig.package, configXml);
                    shell.sed('-i', /__VERSION__/g, installConfig.version, configXml);
                    shell.sed('-i', /__NAME_SYSTEM_/g, installConfig.name.system, configXml);
                    shell.sed('-i', /__FB_DISPLAY_NAME__/g, installConfig.facebook.displayName, configXml);
                    shell.sed('-i', /__FB__APP_ID__/g, installConfig.facebook.appId, configXml);
                    shell.sed('-i', /__ANDROID_BILLINT_KEY__/g, installConfig.android.billingKey, configXml);

                    console.log(configXml + ' prepared.');
                    cb();
                });
            return;
        }
    }

    return cb();
});


gulp.task('cordova:app:prepare', function (cb) {
    exec('cd ./'+path.cordova.app+' && cordova prepare', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        gulp
            .src('./'+path.cordova.repo+'keystore/*')
            .pipe(gulp.dest(path.cordova.app + 'platforms/android/'))
            .on('finish', function() {
                shell.cp(
                    './app/plugins/cordova-plugin-facebook/www/CordovaFacebook.js',
                    './app/platforms/android/platform_www/plugins/cordova-plugin-facebook/www/CordovaFacebook.js'
                );
                shell.cp(
                    './app/plugins/cordova-plugin-facebook/www/CordovaFacebook.js',
                    './app/platforms/ios/platform_www/plugins/cordova-plugin-facebook/www/CordovaFacebook.js'
                );
                shell.cp(
                    './app/plugins/cordova-plugin-facebook/www/CordovaFacebook.js',
                    './app/platforms/android/assets/www/plugins/cordova-plugin-facebook/www/CordovaFacebook.js'
                );
                shell.cp(
                    './app/plugins/cordova-plugin-facebook/www/CordovaFacebook.js',
                    './app/platforms/ios/www/plugins/cordova-plugin-facebook/www/CordovaFacebook.js'
                );

                cb(err);
            });
    });
});

gulp.task('cordova:app:prepareres:android', function (cb) {
    var destPath = path.cordova.app + 'platforms/android/';
    gulp
        .src('./'+path.cordova.installConfig+'android/**/*')
        .pipe(gulp.dest(destPath))
        .on('finish', function() {
            console.log('Android res copied to '+destPath);

            var stringsXml = destPath + 'res/values/strings.xml';
            shell.sed('-i', /name="app_name"([\s\w"'=]*)>[\s\w0-9]*</g, 'name="app_name"$1>'+installConfig.name.en+'<', stringsXml);

            stringsXml = destPath + 'res/values-ru/strings.xml';
            shell.sed('-i', /name="app_name"([\s\w"'=]*)>[\s\w0-9]*</g, 'name="app_name"$1>'+installConfig.name.ru+'<', stringsXml);

            cb();
        });
});
gulp.task('cordova:app:prepareres:ios', function (cb) {
    var destPath = path.cordova.app + 'platforms/ios/';
    gulp
        .src('./'+path.cordova.installConfig+'ios/**/*')
        .pipe(gulp.dest(destPath+installConfig.name.system+'/'))
        .on('finish', function() {
            console.log('iOS res copied to '+destPath);

            var stringsXml = destPath+installConfig.name.system+'/Resources/en.lproj/InfoPlist.strings';
            shell.sed('-i', /CFBundleDisplayName[\s]*=[\s«\w»"']*;/g, 'CFBundleDisplayName = "'+installConfig.name.en+'";', stringsXml);

            stringsXml = destPath+installConfig.name.system+'/Resources/ru.lproj/InfoPlist.strings';
            shell.sed('-i', /CFBundleDisplayName[\s]*=[\s«\w»"']*;/g, 'CFBundleDisplayName = "'+installConfig.name.ru+'";', stringsXml);

            cb();
        });
});

gulp.task('cordova:app:install', function (cb) {
    runSequence(
        'cordova:app:init',
        'cordova:app:prepare',
        'cordova:app:prepareres:android',
        'cordova:app:prepareres:ios',
        cb);
});
gulp.task('cordova:app:reinstall', function (cb) {
    runSequence(
        'cordova:app:clean',
        'cordova:app:install',
        cb);
});

