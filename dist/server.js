"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const data = {
    name: "방과후 데이터",
    users: [
        { id: 1, name: "강대희" },
        { id: 2, name: "윤은서" },
        { id: 3, name: "짱짱" },
    ]
};
const app = (0, express_1.default)(); // 
// const server = http.createServer((req,res)=>
// {
//console.log(JSON.stringify(data));
// switch(req.url)
// {
//     case "/":
//         let msg = res.end(JSON.stringify(data));// 그냥 data를 넣는다면 오류다. chunk(데이터 덩어리)는 string 이거나 Uint8Array이어야 함.
//         res.writeHead(200, {"Content-Type":"application/json"});// json 형식으로 인코딩해서 보내기
//         break;
//     case "/image":
//         res.end("Image Page");
//         break;
//     default:
//         res.end("No Exist Page")
//         break;
// }
// 하지만 이렇게 스위치문으로 계속 한다면 url개수만큼 case가 늘어날 것이다.
// 때문에 express 라이브러리를 사용할 것이다.
// 그러면 package.json 과 package-lock.json과 폴더가 생길 것이다.
// package.json에는 현재 내가 install 한 라이브러리가 들어있고,
// package-lock.json에는 express를 만드는데 쓰인 라이브러리가 들어있다.
// })
const server = http_1.default.createServer(app);
//CRUD, RESTFUL
app.get("/", (req, res) => {
    res.json(data); // express가 json이라는 메서드를 이미 만들었기 때문에 그냥 넣어도 된다.
});
app.get("/image", (req, res) => {
});
server.listen(50000, () => {
    console.log("server is running on 50000 port");
});
