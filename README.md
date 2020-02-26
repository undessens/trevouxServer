
# Trevoux 
This repo contains client(vue) and server(ts-node) part of ipad webpage controlling universalmediaplayer and vermuth

# Installing

`git clone ... && cd ...`

`./install.sh` (only first time or if npm modules are added)

### building for deployment
`./build.sh` will build both client and server


### run
`./run.sh` will run server serving client files and dispatching "osc"



# Configuration

### general
all configuration can be changed in `config.json` \
supported values are visible in `server/src/conf.ts`


## vermuth

special presets named `autoOff`or `autoOn` can be created, if so, they will be called when mode is changed from manual to auto


names displayed on webpage in manual mode will be called as preset :
  * e.g, a preset named `pot onguent` will be recalled when clicked


if using csvFile from universalMediaplayer, timestamp names (second column?) will be recalled


transition time can be setted with fadeTimeAuto/fadeTimeManual in `config.json` or `conf.ts`



## universalMediaplayer

??

# Dev notes


* `./watch.sh` : develop with hot reload watching all source files (client and server)

* `services/` folder contains some script to install services to run each part on rpi boot

