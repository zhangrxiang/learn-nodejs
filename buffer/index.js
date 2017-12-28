// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);
console.log(buf1);
// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);
console.log(buf2);
// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);
console.log(buf4);
// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');
console.log(buf5);
// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
console.log(buf6);

const buf7 = Buffer.from('hello world', 'ascii');
// 输出 68656c6c6f20776f726c64
console.log(buf7.toString('hex'));
// 输出 aGVsbG8gd29ybGQ=
console.log(buf7.toString('base64'));

const buf8 = Buffer.from([1, 2, 3]);
// 输出:
//   1
//   2
//   3
for (const b of buf8) {
    console.log(b);
}

const buf11 = Buffer.from('1234');
const buf22 = Buffer.from('0123');
const arr = [buf11, buf22];

// 输出: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// (结果相当于: [buf2, buf1])
console.log(arr.sort(Buffer.compare));