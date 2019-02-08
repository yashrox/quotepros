const mongoose = require("mongoose");
const util = require("util");

const redis = require("redis");

const client = redis.createClient( );
client.hget  = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;



mongoose.Query.prototype.cache = async function(option = {}) {
 this.cachevals = true ;
this.hashvals = JSON.stringify(option.key || " ");

return this;
}

mongoose.Query.prototype.exec = async function() {

      //console.log(this.getQuery);  //which take what query is used for the result
      //console.log(this.mongooseCollection.name)  //gives the name of the mongooseCollection

      if(!this.cachevals) {
        return exec.apply(this , arguments);
      }



  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
                              collection : this.mongooseCollection.name
                                                                })
                            );

     const cacheval = await client.hget(this.hashvals , key);   //it has an array of items [ item1 , item2 , item3,...]

      if (cacheval) {

              const doc  = JSON.parse(cacheval);
                console.log("i am to run a query");
                return  Array.isArray(doc)
                ? doc.map(d => new this.model(d))
                   : new this.model(doc)
                  }


        const result =  await exec.apply(this , arguments);   //document instance of mongodb
         console.log("run 1");
       client.hset(this.hashvals , key , JSON.stringify(result));
      client.expire(this.hashvals , 5);
      console.log("run query on db");
        return result;

              }


module.exports =  {
             cachedel(hashkey) {
                        client.del(JSON.stringify(hashkey));
                      }
};
