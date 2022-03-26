const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let client

describe('User REST API', () => {

  before(() => {
      client = require('../src/dbClient')
      it('clear db', (done) => {
          userController.clear('username', (err, result) => {
              expect(err).to.be.equal(null)
              //       expect(result).to.be.equal('OK')
              done()
          })
      })
      });
 
  after(()=> {
    app.close()
    client.quit()
  })

  describe('POST /user', () => {

    it('create a new user', (done) => {
        const user = {
            username: 'bob',
            firstname: 'Robert',
            lastname: 'Marley'
        }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
        const user = {
          
            firstname: 'Robert',
            lastname: 'Marley'
        }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

describe('Get /user', () => {

    it('get user that does not exist', (done) => {
       
        const username='teacha'
        chai.request(app)
            .get('/user/' + username)
            .send(username)
            .then((res) => {
                chai.expect(res).to.have.status(400)
                chai.expect(res.body.status).to.equal('error')
                chai.expect(res).to.be.json
                done()
            })
            .catch((err) => {
                throw err
            })
    })

    it('pass wrong parameters', (done) => {
        const username = null
        chai.request(app)
            .get('/user/' + username)
            .send(username)
            .then((res) => {
                chai.expect(res).to.have.status(400)
                chai.expect(res.body.status).to.equal('error')
                chai.expect(res).to.be.json
                done()
            })
            .catch((err) => {
                throw err
            })
    })

    it('get user  exist', (done) => {
        const user = {
            username: 'teacha',
            firstname: 'Vybz',
            lastname: 'Kartel'
        }
        const username = user.username
        chai.request(app)
            .post('/user')
            .send(user)
            .then((res) => {
                chai.request(app)
                .get('/user/' + username)
                .send(username)
                .then((res) => {
                            chai.expect(res).to.have.status(201)
                        chai.expect(res.body.status).to.equal('success')
                        chai.expect(res).to.be.json
                        done()
            })
            })

            .catch((err) => {
                throw err
            })
    })

})


  // describe('GET /user', ()=> {
  //   // TODO Create test for the get method
    //


    describe('Update /user', () => {

        it('update user that does not exist', (done) => {

            const user = {
                username: 'prince',
                firstname: 'Dennis',
                lastname: 'Brown'
            }
            const username = user.username
            chai.request(app)
                .put('/user')
                .send(user)
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res).to.be.json
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

        it('update passing wrong parameters', (done) => {
                const user = {
                
                firstname: 'Dennis',
                lastname: 'Brown'
            }
            
            chai.request(app)
                .put('/user')
                .send(user)
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

        it('update existing user', (done) => {
            const user = {
                username: 'prince',
                firstname: 'Dennis',
                lastname: 'Brown'
            }
                 chai.request(app)
                .post('/user')
                .send(user)
                .then((res) => {
                    chai.request(app)
                        .put('/user')
                        .send(user)
                        .then((res) => {
                            chai.expect(res).to.have.status(201)
                            chai.expect(res.body.status).to.equal('success')
                            chai.expect(res).to.be.json
                            done()
                        })
                })

                .catch((err) => {
                    throw err
                })
        })

    })

    describe('Delete /user', () => {

        it('Delete user that does not exist', (done) => {

            const user = {
                username: 'queen',
                firstname: 'Marcia',
                lastname: 'Griffiths'
            }
            const username = user.username
            chai.request(app)
                .delete('/user')
                .send(user)
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res).to.be.json
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

        it('Delete passing wrong parameters', (done) => {
            const user = {
                 
                firstname: 'Marcia',
                lastname: 'Griffiths'
            }

            chai.request(app)
                .delete('/user')
                .send(user)
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

        it('Delete existing user', (done) => {
            const user = {
                username: 'queen',
                firstname: 'Marcia',
                lastname: 'Griffiths'
            }
            chai.request(app)
                .post('/user')
                .send(user)
                .then((res) => {
                    chai.request(app)
                        .delete('/user')
                        .send(user)
                        .then((res) => {
                            chai.expect(res).to.have.status(201)
                            chai.expect(res.body.status).to.equal('success')
                            chai.expect(res).to.be.json
                            done()
                        })
                })

                .catch((err) => {
                    throw err
                })
        })

    })

})
 
