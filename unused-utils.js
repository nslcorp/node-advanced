

//pm2 start index.js -i 0
//pm2 delete index
//pm2 list

const cluster = require('cluster')
if(cluster.isMaster){
  cluster.fork()
}
else {
  //const app = express();  const PORT = 3000 ...
}


function doWork(delay=5000) {
  const start = Date.now()
  while ((Date.now() - start) < delay ) {}
}

process.env.UV_THREADPOOL_SIZE = 1;


const start = Date.now()
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1: ', Date.now() - start)
})







