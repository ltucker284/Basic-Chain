# Basic-Chain

This is the Senior Research project of Liz Tucker and Juan Matiz. 

We aim to build a voting system using Hyperledger Fabric (https://www.hyperledger.org/projects/fabric) 
which is a distributed ledger framework maintained by the Linux Foundation. The purpose of this project 
is to bring accountability, reliability, and more security to voting systems. 

Let it be known that this application currently only runs as intended on macOS. Linux binaries are included 
in the case that someone may wish to run this application on a Linux distribution if they wished. As is,
there are known issues when running this on a Linux machine or VM.

The python folder is an implementation of a linked list and merkle tree derived from this repository here:
https://github.com/JaeDukSeo/Simple-Merkle-Tree-in-Python. It is completely seperate from the Hyperledger 
application.

## Prerequisites to run this application

In order to run this application you must have Docker version 17.06.2-ce or greater, Node v8 or greater,
and npm v5 or greater.
The only caveat to this is that if the version of Docker installed on your machine does not 
have Docker Compose version 1.14 or greater, it is recommended that you install a greater version 
of Docker.

This application does also have OS dependent tools which are used to generate cryptoconfig materials 
which are necessary for the application to run. By default, this application uses the `bin` folder which
contains the necessaries binaries to run this application on macOS. In order to run this on a linux machine,
you must use the binaries in the `linux_bin` folder. To make sure the `linux_bin` is used, 
edit the `generate.sh` script in the `basic-network` folder accordingly.

## Installing the Application (the chaincode)
This must be done **before** booting up the blockchain network.

After navigating to the `basic-chain/organization/application` directory, run `npm install` to install all of the 
application dependencies.

## Network commands

**Please note** this only brings up a basic blockchain network with 7 peer nodes under 1 organization. 
Chaincode (the smart contract) is currently under development. 

After you have cloned this project, open a terminal/command prompt and navigate to the folder 
where the locally cloned version of this project is.

In order to start the fabric network for the **first time**, you should run the generate.sh script in the basic-network 
folder of this repository. This script will generate the necessary config material the application needs
to run. 

To pause the network, make sure you are in the basic-network folder and run `./stop.sh`

To completely dismantle the network and remove the generated containers, make sure you are in 
the basic-network folder and run `./teardown.sh`

**Please note** each time  `generate.sh` is run, new crypto-config material is generated. This means that any files that reference crypto material must be double checked for correct values. The below files must be checked to be sure they correctly reference crypto-config materials.

`basic-chain/basic-network/docker-compose.yml`
`basic-chain/organization/application/addToWallet.js`

### Credit

This project was taken from Hyperledger's Fabric-Samples repository, found here:
https://github.com/hyperledger/fabric-samples. Specifically, the Commercial-Paper tutorial files were used. Files that have been taken from Fabric Samples are marked with `SPDX-License-Identifier: Apache-2.0`. Please keep in mind that these files have been edited for the purposes of this project, but the originals are credited to hyperledger via the Apache 2.0 license markings.