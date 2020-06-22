const gulp = require("gulp")
const scss = require("gulp-sass");
const connect = require("gulp-connect")
const sourcemaps = require("gulp-sourcemaps")

gulp.task("copy-html", () => {
    return gulp.src("html/**/*")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload())
})

gulp.task("copy-css", () => {
    return gulp.src("css/reset.css")
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
})

gulp.task("data", () => {
    return gulp.src("data/*.json")
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload())
})


gulp.task("scss", () => {
    return gulp.src("scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
})

gulp.task("img", () => {
    return gulp.src("img/*.{png,jpg}")
        .pipe(gulp.dest("dist/img"))
        .pipe(connect.reload())
})

gulp.task("js", () => {
    return gulp.src("js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload())
})

gulp.task("watch", () => {
    gulp.watch("html/**/*", ["copy-html"])
    gulp.watch("css/reset.css", ["copy-css"])
    gulp.watch("scss/*.scss", ["scss"])
    gulp.watch("img/*.{png,jpg}", ["img"])
    gulp.watch("js/*.js", ["js"])
    gulp.watch("data/*.json", ["data"])
})

gulp.task("server", function() {
    connect.server({
        root: "dist",
        port: 1234,
        livereload: true
    })
})
gulp.task("default", ["watch", "server"])

// gulp.task("server", function() {
//     connect.server({
//         root: "dist",
//         port: 8888,
//         livereload: true
//     })
// })

// gulp.task("default", ["watch", "server"])