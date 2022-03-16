const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
		console.log(req.body); 
  })
 //   .get('/', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
   .get('/:username', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
  //   // TODO Create get method API
     const username = req.params.username
	  userController.get(username, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
		 
  })
    .put('/', (req, resp) => {
    userController.update(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
		console.log(req.body); 
    })

    .delete('/', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
        //   // TODO Create get method API
      //  const username = req.body,
            userController.delete(req.body, (err, res) => {
            let respObj
            if (err) {
                respObj = {
                    status: "error",
                    msg: err.message
                }
                return resp.status(400).json(respObj)
            }
            
               respObj = {
                status: "success",
                   msg: res
               }
             
            resp.status(201).json(respObj)
        })
    })


    .purge('/', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
        //   // TODO Create get method API
      //  const username = req.body,
        client.flushall('ASYNC', callback);
    })
module.exports = userRouter
