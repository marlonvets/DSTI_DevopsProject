const { expect } = require('chai')
const userController = require('../src/controllers/user')

describe('User', () => {

  
    describe('Create', () => {

        it('clear db', (done) => {
        userController.clear('username', (err, result) => {
                expect(err).to.be.equal(null)
         //       expect(result).to.be.equal('OK')
            done()  
        })  
        })

        it('create a new user', (done) => {
            const user = {
                username: 'bob',
                firstname: 'Robert',
                lastname: 'Marley'
            }
            userController.create(user, (err, result) => {
                expect(err).to.be.equal(null)
                expect(result).to.be.equal('OK')
                done()
            })
        })

        it('passing wrong user parameters', (done) => {
            const user = {
                firstname: 'Robert',
                lastname: 'Marley'
            }
            userController.create(user, (err, result) => {
                expect(err).to.not.be.equal(null)
                expect(result).to.be.equal(null)
                done()
            })
        })

        it('avoid creating an existing user', (done) => {
            const user = {
                username: 'bob',
                firstname: 'Robert',
                lastname: 'Marley'
            }
            userController.create(user, (err, result) => {
                console.log(result);
             expect(err).to.not.be.equal(null)
             //  expect(result).to.be.equal("user already exists!")
              //  expect(result).to.be.equal('OK')
               
                // TODO create this test
                //   // Warning: the user already exists
                done()
            })
        })
    })
    describe('Get', ()=> {
        //   // TODO Create test for the get method
        it('get a user by username', (done) => {
          const user = {
                username: 'teacha',
                firstname: 'Vybz',
                lastname: 'Kartel'
          }

          userController.create(user, (err, result) => {
   
              const username = user.username
          userController.get(username, (err, result) => {
              expect(err).to.be.equal(null)
              console.log(result);
              expect(result.firstname).to.be.equal(user.firstname)
              expect(result.lastname).to.be.equal(user.lastname)
                done()
          })
          })

        })

        it('get a user that doesn\'t exist', (done) => {
                 const username = 'poppy'
           userController.get(username, (err, result) => {
            expect(err).to.not.be.equal(null)
            console.log(result);
               expect(result).to.be.equal(null)
             done()
                
            })
        })

        it('get a user with no parameter', (done) => {
            const username = null
            userController.get(username, (err, result) => {
                expect(err).to.not.be.equal(null)
                console.log(result);
                expect(result).to.be.equal(null)
                done()

            })
        })


    })
 

        describe('Update', () => {

            it('clear db', (done) => {
                userController.clear('username', (err, result) => {
                    expect(err).to.be.equal(null)
                    //       expect(result).to.be.equal('OK')
                    done()
                })

            })

            it('update a user that doesn\'t exist', (done) => {
                const user = {
                    username: 'teacha',
                    firstname: 'Vybz',
                    lastname: 'Kartel'
                }

                userController.update(user, (err, result) => {
                    expect(err).to.not.be.equal(null)
                    console.log(result);
                    expect(result).to.be.equal(null)
                    done()

                })
            })

           it('passing wrong user parameters', (done) => {
                const user = {
                    firstname: 'Robert',
                    lastname: 'Marley'
                }
                userController.update(user, (err, result) => {
                    expect(err).to.not.be.equal(null)
                    expect(result).to.be.equal(null)
                    done()
                })
            })

            it('update an existing user', (done) => {
               const user = {
                    username: 'teacha',
                    firstname: 'Vybz',
                    lastname: 'Kartel'
                }

                userController.create(user, (err, result) => {
                    userController.update(user, (err, result) => {
                        expect(err).to.be.equal(null)
                        console.log(result);
                     //   expect(result.firstname).to.be.equal(user.firstname)
                     //   expect(result.lastname).to.be.equal(user.lastname)
                        done()
                    })
                })
            })

        })
        
        describe('Delete', () => {

            it('clear db', (done) => {
                userController.clear('username', (err, result) => {
                    expect(err).to.be.equal(null)
                    //       expect(result).to.be.equal('OK')
                    done()
                })

            })

            it('Delete a user that doesn\'t exist', (done) => {
                const user = {
                    username: 'teacha',
                    firstname: 'Vybz',
                    lastname: 'Kartel'
                }

                userController.delete(user, (err, result) => {
                    expect(err).to.not.be.equal(null)
                    console.log(result);
                    expect(result).to.be.equal(null)
                    done()

                })
            })

            it('passing wrong user parameters', (done) => {
                const user = {
                    firstname: 'Robert',
                    lastname: 'Marley'
                }
                userController.delete(user, (err, result) => {
                    expect(err).to.not.be.equal(null)
                    expect(result).to.be.equal(null)
                    done()
                })
            })

            it('Delete an existing user', (done) => {
                const user = {
                    username: 'teacha',
                    firstname: 'Vybz',
                    lastname: 'Kartel'
                }

                userController.create(user, (err, result) => {
                    userController.delete(user, (err, result) => {
                        expect(err).to.be.equal(null)
                        console.log(result);
                        expect(result).to.be.equal( "user deleted: " + user.username)
                        //   expect(result.lastname).to.be.equal(user.lastname)
                        done()
                    })
                })
            })

        })

    })
 