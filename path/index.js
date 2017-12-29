let path = require("path");

let basename = path.basename('C:\\temp\\myfile.html');
console.log(basename);
basename = path.basename('C:\\temp\\myfile.html', '.html');
console.log(basename);

console.log(process.env.PATH);
// 输出: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

process.env.PATH.split(path.delimiter);
// 返回: ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']

console.log(path.dirname('.'));
console.log(path.extname('a.html'));

console.log(path.format({
    dir: 'c:\\dev\\node',
    base: 'index.html'
}));

console.log(path.parse('C:\\path\\dir\\file.txt'));

