const client = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
        client.exists(user.username, function (err, reply) {
      if (reply === 0) {
                client.hmset(user.username, userObj, (err, res) => {
                    if (err) return callback(err, null)
                    callback(null, res) // Return callback
                })

      } else {
       
          return callback(new Error("user already exists!"), null)
      }
    })
  },
	get: (username, callback) => {
        if (!username)
            return callback(new Error("username parameter required!"), null)
        client.exists(username, function (err, reply) {
           if (reply === 1) {
              client.hgetall(username, function (err, object) {
                if (err) return callback(err, null)
                console.log(object)
                  console.log("get sec,  Exists!");
                return callback(null, object)
              })
           } else {
               console.log('Doesn\'t exist!');
           
               return callback(new Error("user does not exist!"), null)            
            
           }
            });

},
    update: (user, callback) => {
        // Check parameters
        if (!user.username)
            return callback(new Error("Wrong user parameters"), null)
        // Create User schema
        const userObj = {
            firstname: user.firstname,
            lastname: user.lastname,
        }
        
        client.exists(user.username, function (err, reply) {
            if (reply === 1) {
                client.hmset(user.username, userObj, (err, res) => {
                    if (err) return callback(err, null)
                    callback(null, res) 
                })

            } else {
                console.log('user exists!');
                return callback(new Error("user does not exists!"), null)
            }
        })
    },

    delete: (user, callback) => {
        if (!user.username)
            return callback(new Error("username parameter required!"), null)
        client.exists(user.username, function (err, reply) {
            if (reply === 1) {
                console.log(' exist!')
                
                client.del(user.username, function (err, object) {
                   if (err) return callback(err, null)
                    object = "user deleted: " + user.username
                   console.log(object)
                return callback(null, object)
                })
       
            } else {
                console.log('Doesn\'t exist!');
            
                return callback(new Error("user doesn't exist!"), null)
        
            }
        
        });

    },

    clear: (username, callback) => {
        client.flushdb(function (err, succeeded) {
            console.log(succeeded); // will be true if successfull
            return callback(null, succeeded)
        });
        
    }  
 

    }


 


 