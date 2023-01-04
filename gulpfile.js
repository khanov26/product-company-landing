import gulp from 'gulp';
import sassCompiler from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import fileInclude from 'gulp-file-include';
import { deleteAsync } from 'del';
import { create as createBrowserSync } from 'browser-sync';
import imagemin from 'gulp-imagemin';
import webpConverter from 'gulp-webp';
import sprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import newer from 'gulp-newer';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import uglifyes from 'gulp-uglify-es';

const { src, dest, watch, series, parallel } = gulp;
const sass = gulpSass(sassCompiler);
const browserSync = createBrowserSync();
const { default: uglify } = uglifyes;

export function htmlTask() {
  return src('src/*.html').pipe(fileInclude()).pipe(dest('dist'));
}

export function stylesTask() {
  return src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ['node_modules'],
        outputStyle: 'compressed',
      })
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
}

export function scriptsTask() {
  return src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
}

function clearTask() {
  return deleteAsync('dist/');
}

export function videosTask() {
  return src('src/video/*')
    .pipe(newer('dist/video/'))
    .pipe(dest('dist/video/'));
}

export function imagesTask(cb) {
  return parallel(webpTask, svgTask)(cb);
}

export function webpTask() {
  return src('src/images/*.+(png|jpg|jpeg)')
    .pipe(newer('dist/images/'))
    .pipe(webpConverter())
    .pipe(dest('dist/images'));
}

export function imageMinTask() {
  return src('src/images/*.+(png|jpg|jpeg)')
    .pipe(newer('dist/images/'))
    .pipe(imagemin())
    .pipe(dest('dist/images'));
}

export function svgTask() {
  return src('src/images/*.svg')
    .pipe(newer('dist/images/'))
    .pipe(dest('dist/images'));
}

export function svgSpriteTask() {
  return src('src/**/svg/*.svg')
    .pipe(svgmin())
    .pipe(
      sprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
        shape: {
          id: {
            generator: (_, file) => file.basename.slice(0, -4),
          },
        },
      })
    )
    .pipe(dest('dist'));
}

export function fontsTask() {
  return src('src/fonts/*.woff2').pipe(dest('dist/fonts'));
}

function serve() {
  browserSync.init({
    server: './dist',
  });

  watch('src/**/*.html', htmlTask).on('change', () =>
    browserSync.reload('*.html')
  );
  watch('src/**/*.scss', stylesTask).on('change', () =>
    browserSync.reload('*.css')
  );
  watch('src/**/*.js', scriptsTask).on('change', () =>
    browserSync.reload('*.js')
  );
  watch('src/**/images/*', imagesTask).on('change', () =>
    browserSync.reload('images/*')
  );
  watch('src/**/svg/*', svgSpriteTask).on('change', browserSync.reload);
}

export const build = series(
  clearTask,
  parallel(
    htmlTask,
    stylesTask,
    imagesTask,
    svgSpriteTask,
    fontsTask,
    videosTask
  )
);
export default series(
  parallel(
    htmlTask,
    stylesTask,
    imagesTask,
    svgSpriteTask,
    fontsTask,
    videosTask
  ),
  serve
);
