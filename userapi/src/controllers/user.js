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
                console.log('user exists!');
                const object = "user by that name"

                return callback(null, object)
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
               const object =  "no user by that name"
                       
               return callback(null, object)
           }
            });

},
	update: (user, callback) => {
	
        const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
        }
	    client.put(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })

}
}


 