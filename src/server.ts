import http from'http';
import Express,{Application, Request, Response} from 'express';
import Path from 'path'
import fs from 'fs';
import {Pool} from "./db"
import { FieldPacket, ResultSetHeader } from 'mysql2';
const data = {
    name:"방과후 데이터",
    users:[
        {id:1, name:"강대희"},
        {id:2, name:"윤은서"},
        {id:3, name:"짱짱"},
    ]
};

const app : Application = Express();
app.use(Express.json());//들어오는 post 데이터를 json으로 변경해서 body에 박아주는 역할 -> 이러면 req.rawHeader을 안써도 됨.
app.use(Express.urlencoded({extended:true}));// 한글
// 


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

const server = http.createServer(app);

app.post("/insert", async (req:Request, res:Response)=>
{
    console.log(req.rawHeaders);
    let [result, info] : [ResultSetHeader, FieldPacket[]] = await Pool.query(`INSERT INTO scores (score, username, time) VALUES(?,?,NOW())`,[10,'new']);// sql인젝션 해킹 막기 위함.
    res.json({msg:"성공적으로 기록 완료."});
})

//CRUD, RESTFUL
app.get("/", (req:Request,res:Response)=> 
{
    res.json(data); // express가 json이라는 메서드를 이미 만들었기 때문에 그냥 넣어도 된다.
})

app.get("/image/:filename",(req:Request,res:Response)=>
{
    let filename:string = req.params.filename;
    let filePath = Path.join(__dirname,"..","images", filename);
    if(!fs.existsSync(filePath))//파일시스템 없다면,
    {
        res.sendFile(Path.join(__dirname,"..","images","404.png"));
    }
    res.sendFile(filePath);// 파일을 보냄.
})

app.get("/imagelist", (req:Request,res:Response)=>
{
    let imagePath = Path.join(__dirname,"..","images");
    let fileList:string[] = fs.readdirSync(imagePath);
    fileList = fileList.filter( x => x!= "404.png");
    console.log(fileList);

    let msg = {
        text:"성공적으로 로딩",
        count: fileList.length,
        list: fileList,
    }
    res.json(msg);
})

server.listen(50000,()=>
{
    console.log("server is running on 50000 port");
})