//Required
var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	compass = require('gulp-compass');

//Scripts Task
gulp.task('scripts', function(){
	gulp.src(['app/js/*.js', '!app/js/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js/'));
});

//Compass / Sass Tasks
gulp.task('compass', function(){
	gulp.src('app/scss/style.scss')
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css',
			sass:'app/scss'
		}))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.stream());
});

//HTML Task
gulp.task('html', function(){
	gulp.src('app/**/*.html');
});



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});

//Watch Task
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js',['scripts']);
	gulp.watch('app/scss/**/*.scss',['compass']);
	gulp.watch('app/**/*.html',['html']);
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
	
});


//Default Task
gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync', 'watch']);