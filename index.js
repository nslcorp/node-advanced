process.env.UV_THREADPOOL_SIZE = 1;

const express = require('express')
const crypto = require('crypto')


const app = express();
const PORT = 3000


app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('pbkdf2 -- it done')
  })

  // res.send('pbkdf2 -- it done')

})

app.get('/fast', (req, res) => {
  res.send('This is fast...')

})

app.listen(PORT, () => {
  console.log('Listening :' + PORT)
})


