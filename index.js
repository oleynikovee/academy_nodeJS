const http = require('http');
const readline = require('readline'); 
const fs=require('fs');


let html="";
let json="";

const hostname = '127.0.0.1';
const port = 3000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Input name of html file(Ex:index.html) ', (answer) => {
      html=answer;
      resolve();
    })
  })
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Input name of json file(Ex:index.json)', (answer) => {
      json=answer;
      resolve();
    })
  })
}

const main = async () => {
    await question1();
    await question2();
    rl.close();
    server.listen(port, hostname, () => {
        console.log(`HTML:${html}`);
        console.log(`JSON:${json}`);
        console.log(__dirname+`/${json}`);
        console.log(`Server running on ${hostname} by port ${port}`);
    });
}

main();

const server = http.createServer((req, res) => {
    if(req.url==='/'||req.url==='/index'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        fs.createReadStream(__dirname+`/${html}`).pipe(res);
    }
    if(req.url==='/getjson'){
        res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
        fs.createReadStream(__dirname+`/${json}`).pipe(res);
    }
  }
);