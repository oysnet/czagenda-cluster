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

Create the initial account
==========================

In order to use the api, you must create an account, a consumer and get access token. 
To do this you must enter on a virtual machine that hold an instance of czagenda-api server.

You can found it by executing the vzlist command on a proxmox host. CzAgendaApi VM have hostname like vmXXX.czagendaapi.*

Enter in the vm

>>> vzctl enter XXX

Create a super user

>>> cd /home/czagenda-api/
    node tools/createSuperuser.js <LOGIN> <PASSWORD> <EMAIL>
    
After the log you have a summary of the newly created account.

Get consumer token and access token

>>> cd /home/czagenda-api/
    node tools/createOAuthTokens.js <USER_ID> <CONSUMER_NAME> <CONSUMER_DESCRIPTION>
    
What's next
===========

Read the Agenda api documentation at http://readthedocs.org/docs/czagenda-api/en/latest/
