# User API web application

It is a basic NodeJS web application exposing REST API that creates and stores user parameters in [Redis database](https://redis.io/).

## Functionality

List all the work performed (briefly, describing features and bonus tasks).
This project includes a NodeJS web application that is able to create and manage users and thier parameters.

## Features
### Web Application
1. Create users by making a post request to the rest endpoint with json object of user information and stores user details in Redis db.
2. Retrieve user details using a get request containing the username desired.
3. Update user details by making a post request to the rest endpoint with json object of user information for an existing username.
4. Delete user by making a delete request to the rest endpoint with json object of user information for an existing username.
5. Config test for each feature unit, configuration, connections and api routes.

## Deployments and testing
1. CI/CD pipeline with Github actions:
 A Github actions workflow was configured to test and deploy the application once all tests pass.
2. Configure a VM with Vagrant:
 Vagrant file was configured to  to build a VM running a Cent Os 7, copying required files to the VM and using Rsync to sync the SRC folder containing the source code of the app.
3. Provision VM using ansible:
 Ansible was used to install nodejs, redis, application requirements, configure app, run tests and start the application.
4. Build docker image:
 A docker file was used to build a docker image of the application excluding all unneccessary files, files were excluded using s docker ignore file
5. Push image to dockerhub:
 The application docker image was pushed to docker hub and is available via "docker pull marlont876/userapidocker-mt:latest"
6. Container orchestration with docker compose:
 Docker compose was used to build and run the application and redis database on two containers.
 Containers were able to comunicate and provide access to the application from host machine.

7. Docker orchestration using Kubernetes - 
	Deployments were configured for the application and redis database.
	Service was also configured a persistent volume and volume claim was also configured for the cluster.




## Installation

This application is written on NodeJS and it uses Redis database.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Install application

Go to the root directory of the application (where `package.json` file located) and run:

```
npm install 
```

## Usage

1. Start a web server

From the root directory of the project run:

```
npm start
```

It will start a web server available in your browser at http://localhost:3000.

2. Create a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"OK"}
```

Another way to test your REST API is to use [Postman](https://www.postman.com/).

## Testing

From the root directory of the project, run:

```
npm test

tests stuff
```

## Author

Sergei Kudinov   
sergei@adaltas.com
 test 