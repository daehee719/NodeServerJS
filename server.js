let http = require("http");

const data = {
    name:"방과후 데이터",
    users:[
        {id:1, name:"강대희"},
        {id:2, name:"윤은서"},
        {id:3, name:"남소정"},
    ]
}
let server = http.createServer((req,res)=>
{
    console.log(data);
    switch(req.url)
    {
        case "/":
            res.end(data);
            break;
        case "/image":
            res.end("Image Page");
            break;
        default:
            res.end("No Exist Page")
            break;
    }
})

server.listen(50000,()=>
{
    console.log("server is running on 50000port");
})