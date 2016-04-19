Gulp Documentation

Source : -  https://www.youtube.com/watch?v=LmdT2zhFmn4&list=PLv1YUP7gO_viROuRcGsDCNM-FUVgMYb_G

Joel Longie

What is Gulp?
“Gulp is system builder” but what is a build system ? !
A build system is simply a collection of task (commonly called tasks runner) the automate repetitive work.

Build system work with other tools / components  like “package manager” there are 3 common components might used for front end workflow Package manager, Preprocessor and Tasks runners or build tools. 

Package managers : - 

This refers to, Automates packages and libraries used in your dev (development) environment.
Installation, removal, upgrading and dependencies
Like Bower and npm (node.js)

Bower handle front dependencies e.g jQuery, Backbone, AngularJS etc.
Npm manages environment dependencies e.g. Gulp, Browser-sync, Plumber etc.

Preprocessor :-

Are critical to an efficient modern workflow by adding features and an optimized syntax that compiles into its native language. 

CSS - Sass, Less, Stylus
HTML - Jade, hbs, slim, markdown, HAML
Javascript - coffeeScript, TypeScript 

Tasks runners / Build Tools

Gulp and Grunt

Both run on node and both have similar anatomy.

----------------------------------------------------------------------------------------------------------------

Structure of typical Gulp file:- 

1.Required Modules :- The area where we declared dependencies like
Var gulp = require( ‘ gulp ’);
Var uglify = require (‘ gulp-uglify ’);

2. Named Task :- compressing static images, copying files and deployment build like

gulp.task(‘scripts’, function(){
	//code
});

Command :  gulp scripts

3. Watching Task :- watch folder ‘js’ for all files ending in .js then on change run script task.
Like.

gulp.task(‘watch’, function()
{
gulp.watch(‘app/js/**/*.js’,  [scripts]
});

4. Default Task :- runs both ‘scripts’ and ‘watch’ tasks. Asynchronously, runs all tasks at the same time like

gulp.task(‘default’, [‘scripts’, ‘watch’]);

----------------------------------------------------------------------------------------------------------------

Gulp vs Grunt

Both are act same.

Learning Curve
Learning Curve
Easier to learn and maintain
Code over configuration	

Steeper learning curve
Relies on a lot of configuration
Syntax overlay verbose

Speed
Speed
Faster	
streams

Possibly slower
Writes to temp files
	

----------------------------------------------------------------------------------------------------------------

Basic Setup

Create folder with named “gulp-stater”
With in this create 
app
css images js scss
In above create file for respected folder
index.html in root, scss - style.scss, js - main.js
Done!

Git Setup

Create .gitignore and read.md file and git init to currenet folder add all files to git repository don’t push now :) we are not ready yet

Bower Setup

Setup bower with npm install bower but for windows 1st set path prefix (have tried but bower is not working in windows)

Install other tools like compass, susy and breakpoint, they worked with ruby gem.
Set config.rb for precompilation 

Finally Install Gulp
 
In d:/yourproject/gulp-starter 
Install gulp 
	npm install -g gulp
npm install gulp --save

Install following packages



gulp-plumber
gulp-uglify 
browser-sync 
gulp-compass
gulp-autoprefixer
del auto-rename

In gulpfile.js 
	//Mention all required modules 
		var gulp = require('gulp'),
		      uglify = require('gulp-uglify');
	//And also mention task to run
	gulp.task('scripts', function(){
		console.log('It worked dude!');
});

In command prompt
	Hit gulp scripts
But, 
	In gulp we can mention “default tasks” for multiple task.

Test module gulp-uglify
This module is worked as a js minifier tool
	gulp.task('scripts', function(){
	gulp.src('app/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

Test module gulp-rename
	This module is worked for rename and versioning of file also set desired location
gulp.src(['app/js/*.js', '!app/js/*.min.js'])
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js/'));

OR
If you want any particular js file minified version then you can define single file name with function
	gulp.src("./app/js/**/main.js")
	.pipe(rename(function (path) {
	  path.dirname += "yourfoldername ";
	  path.basename += " yourfilename ";
	  path.extname = ".min.js"
	}))
OR
Please visit https://www.npmjs.com/package/gulp-rename 

Watch task
	By adding this task to gulp.js file gulp will watch the tasks have to perform and no need to hit gulp command in terminal for every changed.
	
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js',['scripts']);
});

And add array to default task
gulp.task('default', ['scripts', 'watch']);


Stylus task (compass and sass task)
	By adding this task to gulp.js file, gulp will compile scss format into css 
		
		gulp.task('compass', function(){
	gulp.src('app/scss/style.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css',
			sass:'app/scss'
		}))
		.pipe(gulp.dest('app/css/'));
});

Install gulp-plumber :-
	What it is?
	Prevent pipe breaking caused by errors from gulp plugins This patch plugin is fixing issue with Node Streams piping. For explanations, read this small article. Briefly it replaces pipe method and removes standard onerror handler on error event, which un-pipes streams on error by default.
	Add with
.pipe(plumber())

Set browserSync Task
	This task work for auto reload and refresh for every new changes made.
		In Global Variable -
		browserSync = require('browser-sync').create(),
		
		Create Server-
		gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});

		In Watch Task
gulp.watch('app/**/*.html').on('change', browserSync.reload);

Browser update on html changed

If sass file need to update at some time then inject below pipe to compass task

.pipe(browserSync.stream());

That’s it
	Now the above process is one time and you no need to refresh, rename etc activities manually :)
	Have a great programming! 
