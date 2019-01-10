const mongoos = require('mongoose')
const redis = require('redis')
const {promisify} = require('util')

const client = redis.createClient('redis://127.0.0.1:6379')
// client.get = promisify(client.get)
client.hget = promisify(client.hget)

const exec = mongoos.Query.prototype.exec;

mongoos.Query.prototype.cache = function(options = {}){
  this.useCach = true;
  this.hashKey = JSON.stringify(options.key || 'default')
  return this; //! it will uses as chanable methods
}

mongoos.Query.prototype.exec = async function () {

  if(!this.useCach) {
    return exec.apply(this, arguments)
  }

  //if we have Key in Redis - return the Value
  //else go to MongoDB and store it data in Redis

  const key = JSON.stringify({...this.getQuery(), collection: this.mongooseCollection.name})
  // const cachedValue = await client.get(key)  //could be array or value
  const cachedValue = await client.hget(this.hashKey, key)  //could be array or value

  if (cachedValue) {
    console.log('FROM REDIS')
    const parse = JSON.parse(cachedValue)

    return Array.isArray(parse)
      ? parse.map(d => new this.model(d))
      : new this.model(parse)

  }



  const result = await exec.apply(this, arguments)
  client.hset(this.hashKey, key, JSON.stringify(result))

  return result
}

module.exports = {
  clearHash(hashKey){
    client.del(JSON.stringify(hashKey))
  }
}
