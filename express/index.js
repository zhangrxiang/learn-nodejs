//express_demo.js 文件
let express = require('express');
let fs = require('fs');
let iconv = require('iconv-lite');
let os = require('os');
let bodyParser = require('body-parser');

let app = express();
let urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'pug')

app.get('/test', function (req, res) {
    res.render('test', {title: 'Hey', message: 'Hello there!'})
})
app.post('/post', urlencodedParser, function (req, res) {
    // 输出 JSON 格式
    let response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
app.get('/postTest', function (req, res) {
    res.sendFile(__dirname + "/" + "post.html");
});
app.get('/', function (req, res) {
    res.render('index', {
        a: {
            "get": "get",
            "post": "postTest",
            "full-text": "fullText"
        }
    })
});
app.get('/get', function (req, res) {
    res.sendFile(__dirname + "/" + "get.html");
});
app.get('/fullText', function (req, res) {
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
            console.log("err11")
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

app.post('/insertOne', urlencodedParser, function (req, res) {
    let title = req.body.title.trim() || '';
    let desc = req.body.desc || '';
    if (desc !== '' && desc !== undefined && title !== '' && title !== undefined) {
        let content = {
            'title': title,
            'desc': desc,
            'time': new Date().toLocaleString()
        };
        console.log(content);
        fs.writeFile('./data/' + title + '.json', JSON.stringify(content) + os.EOL, {'flag': 'w'}, (err) => {
            if (err) throw err;
            else {
                let path = './data/all.json';
                fs.access(path, (err) => {
                    if (!err) {
                        fs.readFile(path, {encoding: "utf-8"}, (err, buf) => {
                            if (!err) {
                                let list = [];
                                if (buf.toString()){
                                    list = JSON.parse(buf.toString())
                                }
                                list.push(title);
                                let string = JSON.stringify(list);
                                console.log(string)
                                if (string !== '') {
                                    fs.writeFile(path, string, {encoding: "utf-8"}, (err) => {
                                        if (err) {
                                            throw  err;
                                        } else {
                                            console.log("saved...........")
                                        }
                                    })
                                }
                            } else {
                                console.log("err2222")
                            }
                        })
                    } else {
                        console.log("err3333")
                    }
                });
            }
            console.log('The file has been saved!');
        });
        // res.sendFile(__dirname + "/" + "full-text.html")
        // res.render("full-text");
        res.redirect("fullText")
    }
});
app.use(express.static('public'));
let server = app.listen(8888, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});