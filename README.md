# Basic-Chain

This is the Senior Research project of Liz Tucker and Juan Matiz. 

We aim to build a voting system using Hyperledger Fabric (https://www.hyperledger.org/projects/fabric) 
which is a distributed ledger framework maintained by the Linux Foundation. The purpose of this project 
is to bring accountability, reliability, and more security to voting systems. 

## Prerequisites to run this application

In order to run this application you must have Docker version 17.06.2-ce or greater.
The only caveat to this is that if the version of Docker installed on your machine does not 
have Docker Compose version 1.14 or greater, it is recommended that you install a greater version 
of Docker.

This application does also have OS dependent tools which are used to generate cryptoconfig materials 
which are necessary for the application to run. The below cURL command will install necessary binaries
to run the application. Please run this command in the `basic-chain/bin` directory.

`curl -sSL https://goo.gl/6wtTN5 | bash -s 1.4.3 1.4.3 0.4.15`

## Network commands

**Please note** this only brings up a basic blockchain network with 7 peer nodes under 1 organization. 
Chaincode (the smart contract) is currently under development. 

After you have cloned this project, open a terminal/command prompt and navigate to the folder 
where the locally cloned version of this project is.

In order to start the fabric network for the first time, run the following commands in the project folder.

1. `cd basic-network`
2. `./generate.sh`
3. `./start.sh`

To pause the network, make sure you are in the basic-network folder and run `./stop.sh`

To completely dismantle the network and remove the generated containers, make sure you are in 
the basic-network folder and run `./teardown.sh`

**Please note** each time `./teardown.sh` is run, it will run the `generate.sh` script. This will 
regenerate the cryptoconfig material. In order to ensure the Certificate Authority container runs properly, 
make sure to double check that the value of `FABRIC_CA_SERVER_CA_KEYFILE` in the `docker-compose.yml` is set to the file name of the generated
key file in the `basic-network/crypto-config/peerOrganizations/org1.example.com/ca` directory.

## Installing the Application (the chaincode)
This must be done **after** booting up the blockchain network.

After navigating to the `basic-chain/chaincode` directory, run `npm install` to install all of the 
application dependencies.