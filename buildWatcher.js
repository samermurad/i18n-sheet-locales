const filewatcher = require('filewatcher');
const path = require('path');
// the default options
const opts = {
    forcePolling: false,  // try event-based watching first
    debounce: 10,         // debounce events in non-polling mode by 10ms
    interval: 1000,       // if we need to poll, do it every 1000ms
    persistent: true      // don't end the process while files are watched
};

const watcher = filewatcher(opts);
const cp = require('child_process');

const build = () => {
    console.log('\x1Bc');
    console.log('Removing all files..');
    cp.execSync('npm run build:clean').toString();
    try {
        console.log('Building...');
        cp.execSync('npm run build').toString();
        console.log('Success!');
    } catch (e) {
        console.error('Failed to build project');
        console.error(e.message);
    }
};
// cp.execSync('clear');
console.log('\x1Bc');
console.log('Turning on Build watcher');

watcher.add(path.join(path.dirname(require.main.filename), 'src'));

build();

watcher.on('change', function(file, stat) {
    build();
});

