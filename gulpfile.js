const { src, dest, parallel, watch } = require('gulp');

function copy({ from, to }) {
  return function copy() {
    console.log(`copy from ${from} to ${to}`)
    return src(from)
      .pipe(dest(to));
  }
}

function makeDevTasks() {
  return ['wx', 'alipay', 'swan'].map((platform) => (
    copy({
      from: 'lib/**/*',
      to: `example/mp/${platform}/lib`
    })
  ));
}

function dev() {
  const watchOptions = {
    ignoreInitial: false
  }
  watch(
    'lib/**/*',
    watchOptions,
    parallel(...makeDevTasks())
  )
}

module.exports = {
  dev,
  default: dev
}
