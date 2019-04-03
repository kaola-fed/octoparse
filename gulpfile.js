const { src, dest, parallel, watch, task } = require('gulp');

function copy({ from, to }) {
  return function copy() {
    console.log(`copy from ${from} to ${to}`)
    return src(from)
      .pipe(dest(to));
  }
}

function makeDevTasks() {
  return ['wx', 'alipay', 'swan', 'tt'].map((platform) => (
    copy({
      from: 'lib/**/*',
      to: `example/mp/${platform}/lib`
    })
  ));
}
function copyTemplate(){
  return copy({
    from: 'src/platform/**/*',
    to: 'lib/platform'
  })
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
  copyTemplate: copyTemplate(),
  dev,
  default: dev
}
