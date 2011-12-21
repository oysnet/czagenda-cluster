Installation
============

## Requirements

One or more Proxmox VE server running. See http://www.proxmox.com/

A server to run czagenda-cluster management tools.

## Setup proxmox

* Install the public ssh key of the server that will run czagenda-cluster management tools on each proxmox server.
* Install some python dependencies

>>> apt-get update && apt-get install python-setuptools
    easy_install pip
    pip install ipcalc
    
    
## Install czagenda-cluster

* Install nodejs. See http://nodejs.org/
* Install npm. See http://npmjs.org/

* Create a file settings.js from settings.sample.js

* from inside the repository:

>>>  npm install
     node tools/install.js # this will setup containers on your proxmox servers
     
Installation is complete. To run the supervisor script just do

>>> node supervisor.js