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
 A docker file was used to build a docker image of the application excluding all unneccessary files, files were excluded using a docker ignore file
5. Push image to dockerhub:
 The application docker image was pushed to docker hub and is available via `docker pull marlont876/userapidocker-mt:latest`
6. Container orchestration with docker compose:
 Docker compose was used to build and run the application and redis database on two containers.
 Containers were able to comunicate and provide access to the application from host machine.

7. Docker orchestration using Kubernetes - 
	Deployments were configured for the application and redis database.
	Service was also configured a persistent volume and volume claim was also configured for the cluster.


## Requirements
1. Host machine with resources available(20GB drive, 4GB Ram, 2Ghz Cpu)
2. PowerShell (or equilalent CLI tool)
3. VirtualBox
4. Vagrant
5. Centos/7 Vagrant box for the Virtualbox provider
6. Docker
7. Kubernetes/Minikube
8. Internet access to pull images
*Administrator access is required on host machine

## Installation

This application is written on NodeJS and it uses Redis database. 
 1. Provided requirements above are satisfied.
 2. Download the package from the git repo [git repo](https://github.com/marlonvets/DSTI_DevopsProject.git)
 3. The app may be deployed in a any of the ways below:
 
 #### 1. Vagrant & Ansible
 a. Open a Administrative shell console in the IAC folder of the package directory where "vagrantfile" is located and run: 
 ```
Vagrant up 
```
b. This will provision a linux VM with cent os 7 and install and test the application, which can be accessed via `http://localhost:3000/` on the host machine.
c. You may connect to the VM via SSH  and run commands using:
 ```
Vagrant ssh or vagrant ssh userapi_server
```
d. If you want to sync app changes to the VM you can run this command from the SSH connection:
 ```
vagrant rsync-auto
```
This will sync any changes from the host to the VM
e. You may check the VM status using:
 ```
Vagrant status
```
f. You may stop the VM using:
 ```
Vagrant halt
```
g. To remove the VM and deployement execute the command:
 ```
Vagrant destroy
```
 
 #### 2. Docker

The docker image for the application can built using the docker file included in the package or it can be pulled from docker hub.

1. Build docker image by running the command below in the root of the package folder where the dockerfile is located:
 ```
docker build -t userapidocker-mt .
```
This will create an image using the application files and requirements described in the dockerfile.

2. The docker image can be pulled from docker hub using the command below:

 ```
docker pull marlont876/userapidocker-mt:latest
```
 #### 3. Docker Compose
 1. The application can be started from the docker compose file using the command below:
  ```
  docker-compose up
```
This will load  the required docker images and start the application, which can be accessed via `http://localhost:3000/` on the host machine.

2. The deployment/containers can stoppped the by running `CTRL+C` in the  terminal:
 
3. The deployment can be removed using this command:
  ```
  docker-compose rm
```
 #### 3. Kubernetes/Minikube
1.  The application is exposed on port 3000 which may not be open by default in minikube, 
 to ensure the port is available, start minkube with the command below:
   ```
minikube start --extra-config=apiserver.service-node-port-range=1-5000
```

 2. The aplication can be started as kubernetes cluster using the command below:
   ```
kubectl apply -f web-service.yaml,web-deployment.yaml,redis-deployment.yaml,data-persistentvolumeclaim.yaml
```
This will deploy a single instance of the application, with a network and a persistent volume.

3. On windows you will have to run the command `minikube service web` to expose the configured service.
This will allow you to connect to the application from the host on `http://localhost:3000/`

4. To see the pods running on the instance run the command `kubectl get pods`
5. To see the services running on the instance run the command `kubectl get services`
6. To delete the service run `kubectl delete service <name of service>` or on this case `kubectl delete service web`
7. To delete the a deployment run the command `kubectl delete deployment <deployment name>` or on this case `kubectl delete deployment web` and `kubectl delete deployment redis`
8. To delete the entire instance run `minikube delete`


## Usage

1. All deployment options will start the application and expose it at http://localhost:3000.
	To confirm the application is running test in by:
	a. Browsing to `http://localhost:3000` in browser of your choice
	b. Using curl with the command `curl http://localhost:3000/`
	It will output:

```
Hello World!
```

2. Create a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"champ","firstname":"Usain","lastname":"Bolt"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"OK"}
```

Another way to test your REST API is to use [Postman](https://www.postman.com/) or [SoapUI](https://www.soapui.org/downloads/soapui/).

3. Getting a user information

Send a get (REST protocol) request using terminal:

```bash
curl -X GET "http://localhost:3000/user/champ" -H "accept: application/json"
```

It will output:

```
{"status":"success","msg":{"firstname":"Usain","lastname":"Bolt"}}
```
4. Update a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"username":"champ","firstname":"Usain","lastname":"Bolt"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"OK"}
```

5. Delete a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request DELETE \
  --data '{"username":"champ","firstname":"Usain","lastname":"Bolt"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"user deleted: champ"}
```
 
## Testing

### Vagrant Deployment

From the vagrant directory of the project folder, open a bash/shell window and run:
1. To connect to the create VM run the command:

```
vagrant ssh userapi_server
```
This will grant bash/shell access to the created VM

2. To move to the app directory run the command below:

```
cd /tmp/app/
```
This will change the bash working directory to the app folder

3. To execute the application tests run the command below:

```
npm test

```
This will execute all tests a display the results in the window.

### Docker/Docker compose Deployment

From the vagrant directory of the project folder, open a bash/shell window and run:
1. To excecute commands on the docker container run this will open an interactive prompt to the container

```
docker-compose exec web sh
```
This will grant bash/shell access to the created VM

2. The propmt will open in the app folder, if not move to the app directory run with command below:

```
cd /usr/src/app
```
This will change the bash working directory to the app folder

3. To execute the application tests run the command below:

```
npm test

```
This will execute all tests a display the results in the window.


### Kubernetes/minikube Deployment

From the project folder, open a bash/shell window and run:

1. To excecute tests on the pod/container run this command

```
kubectl exec -it --namespace=tools web -- bash -c "npm test"
```
 
This will execute all tests a display the results in the window.



## Author

Marlon Thompson   
mmthompson1011@gmail.com 
