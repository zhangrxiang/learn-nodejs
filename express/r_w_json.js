let fs = require("fs");

let path = './data/all.json';
fs.access(path, (err) => {
    if (!err) {
        fs.readFile(path, {encoding: "utf-8"}, (err, buf) => {
            if (!err) {
                let list = JSON.parse(buf.toString());
                list.push("赤壁赋");
                list.push("赤壁赋2");
                list.push("赤壁赋3");
                list.push("赤壁赋4");
                list.push("赤壁赋5");
                let string = JSON.stringify(list);
                console.log(string)
                fs.writeFile(path, string, {encoding: "utf-8"}, (err) => {
                    if (err) {
                        throw  err;
                    } else {
                        console.log("saved...........")
                    }
                })
            } else {
                console.log("err")
            }
        })
        // fs.writeFile(path,"aaaaaa", {'flag': 'a'}, (err) => {
        // })
    } else {
        console.log("err")
    }
});