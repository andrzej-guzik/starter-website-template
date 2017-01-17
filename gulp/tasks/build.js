var gulp = require('gulp'),
	del = require('del'),
	$ = require("gulp-load-plugins")();

gulp.task('previewDist', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: docs
		}
	});
});

gulp.task('clearDocs', function() {
	del('./docs');
});

gulp.task('copyGeneralFiles', ['clearDocs'], function() {
	var pathsToCopy = [
	    './app/**/*',
	    '!./app/index.html',
	    '!./app/assets/images/**',
	    '!./app/assets/styles/**',
	    '!./app/assets/scripts/**',
	    '!./app/temp',
	    '!./app/temp/**'
  ]

  return gulp.src(pathsToCopy)
  			.pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['clearDocs'], function() {
	return gulp.src('./app/assets/images/**/*')
		.pipe($.imagemin({
      		progressive: true,
      		interlaced: true,
      		multipass: true
    	}))
    	.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('usemin', ['clearDocs', 'styles', 'scripts'], function() {
	return gulp.src('./app/index.html')
			.pipe($.usemin({
				css: [function() {return $.rev()}, function() {return $.cssnano()}],
				js: [function() {return $.rev()}, function() {return $.uglify()}]
			}))
			.pipe(gulp.dest('./docs'))
});

gulp.task('build', ['clearDocs', 'copyGeneralFiles', 'optimizeImages', 'usemin']);
