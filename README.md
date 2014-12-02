#Dependencies
You will need to install and configure the following:

####Git
http://git-scm.com/downloads

Windows users are advised to set up msysgit for Git Bash command line

http://msysgit.github.io/


####Node.js 
http://nodejs.org/

Windows users can use the .msi installer but may have to edit PATH variables
  http://stackoverflow.com/questions/8768549/node-js-doesnt-recognize-system-path

OSX Users can use HomeBrew

  http://brew.sh/

```
brew install node
```
Ubuntu users should add the following repository
```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

####Gulp & Bower
with Node's package manager (npm) installed, installed Gulp & Bower becomes trivial
```
gulp install bower -g
```
```
gulp install gulp -g
```
NOTE: the -g flag installs the package globally, so it will be accessible on your whole system, not just the project folder


#Obtain a copy of the project repository on your local machine

Navigate to the local folder you want to contain the project files (they will be created in  /frontend/)

Clone the .git repository

```
git clone https://github.com/fendgroupproject/frontend.git
```

Change directory to project
```
cd frontend
```
Checkout appropriate branch
```
git checkout <branch-name>
```
#Install the project
Use npm to install project dependencies defined in project.json
```
npm install
```

If npm isntall this fails with any error containing npm ERR! code EEXIST, try running:
```
npm install -g npm
```
then
```
npm install
```
again

install bower depency files
```
bower install
```

#Build the project
For more info on the tasks in gulpfile.js, see James' write up:
http://blog.jgroeder.com/getting-started-with-gulp/
```
gulp build
```
builds the site to /build/
```
gulp connect
```
sets up a local server to display page (default: http://localhost:8080/)
```
gulp watch
```
will re-build the site whenever you save changes to .css or .js files
