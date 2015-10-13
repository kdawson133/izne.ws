var gulp    = require("gulp"),
    notify  = require("gulp-notify");
    del     = require("del");
    bower   = require("gulp-bower");
    shell   = require("gulp-shell");
    cssmin  = require('gulp-cssmin');
    rename  = require('gulp-rename');
    sass    = require('gulp-sass');
/**
 * Copy any needed files.
 *
 * Do a 'gulp copy' after bower updates
 */
var config = {
  paths: {
    src: ["components"],
    dest: "source/components"
  }
}
gulp.task("clean", function () {
  return del([
    'output_dev',
    'output_prod'
  ]);
});
gulp.task('bower', function () {
  return bower({ cmd: 'update'});
});
gulp.task("copy", function () {
    // jquery
    gulp.src("components/jquery/dist/*.min.js")
        .pipe(gulp.dest("source/components/js"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    gulp.src("components/jquery/dist/*.min.map")
        .pipe(gulp.dest("source/components/js"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    // clean-blog
    gulp.src("components/clean-blog/js/clean-blog.min.js")
        .pipe(gulp.dest("source/components/js"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    gulp.src("components/clean-blog/css/clean-blog.min.css")
        .pipe(gulp.dest("source/components/css"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    // bootstrap
    gulp.src("components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("source/components/css"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    gulp.src("components/bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest("source/components/js"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    gulp.src("components/bootstrap/dist/fonts/*.*")
        .pipe(gulp.dest("source/components/fonts"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    // font-awesome
    gulp.src("components/font-awesome/css/font-awesome.*.*")
        .pipe(gulp.dest("source/components/css"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    gulp.src("components/font-awesome/fonts/*.*")
        .pipe(gulp.dest("source/components/fonts"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    // highlightjs
    gulp.src("components/highlightjs/highlight.pack.min.js")
        .pipe(gulp.dest("source/components/js"))
        .pipe(notify("Found file: <%= file.relative %>!"));
    gulp.src("components/highlightjs/styles/tomorrow-night-bright.css")
        .pipe(gulp.dest("source/components/css"))
        .pipe(notify("Found file: <%= file.relative %>!"));
});
gulp.task('sass', function () {
    gulp.src('assets/sass/extra.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('source/assets/css'))
});
gulp.task('sass:watch', function () {
    gulp.watch('assets/sass/*.scss', ['sass']);
});
gulp.task('dev', shell.task([
  'sculpin generate --watch --server'
]));
gulp.task('pro', shell.task([
  'sculpin generate --env=prod'
]));
gulp.task('pub', shell.task([
  "rsync -avze ssh --delete --exclude='.*' output_prod/  aso:public_html/izne.ws/"
]));

gulp.task('default', ['copy']);
