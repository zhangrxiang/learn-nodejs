//express_demo.js 文件
let express = require('express');
let fs = require('fs');
let iconv = require('iconv-lite');
let os = require('os');
let app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});
app.get('/get', function (req, res) {
    res.sendFile(__dirname + "/" + "get.html");
});
app.get('/full-text', function (req, res) {
    res.sendFile(__dirname + "/" + "full-text.html");
});
app.get('/getDate', function (req, res) {
    // 输出 JSON 格式
    let response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
app.get('/g', function (req, res) {
    fs.readFile("content.txt", function (err, data) {
        if (err) {
            console.log("err")
        } else {
            let str = iconv.decode(data, 'utf-8');
            if (str === 'undefined') {
                str = "{}"
            }
            console.log(str);
            res.end(str);
        }
    })
});

app.get('/getData', function (req, res) {
    let desc = req.query.desc;
    let title = req.query.title;
    if (desc !== null || desc !== undefined || title !== null || title !== undefined) {
        let date = new Date();
        let time = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        let content = {
            'title': title,
            'desc': desc,
            'time': time
        };
        console.log(content);
        fs.writeFile('content.txt', JSON.stringify(content) + os.EOL, {'flag': 'a'}, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
        // res.end(JSON.stringify(content));
        res.sendFile(__dirname + "/" + "full-text.html");
    }
});
app.use(express.static('public'));
let server = app.listen(8888, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});