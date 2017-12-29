const fs = require('fs');

//异步方法
fs.unlink('./test.txt', (err => {
    if (err) {
        console.log('delete fail');
        //throw err;
    } else {
        console.log('delete ok');
    }
}));

//同步
// fs.unlinkSync('./test.txt');

fs.open('./message.txt', 'wx', (err, fd) => {
    if (err) {
        if (err.code === 'EEXIST') {
            console.error('message.txt already exists');
            return;
        }
        throw err;
    }
});
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
