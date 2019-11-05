#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -ev

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

sudo docker-compose -f docker-compose.yml down

sudo docker-compose -f docker-compose.yml up -d --build peer6.org1.example.com cli

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
export FABRIC_START_TIMEOUT=10
#echo ${FABRIC_START_TIMEOUT}
sleep ${FABRIC_START_TIMEOUT}

echo Create the channel
sudo docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel create -o orderer.example.com:7050 -c mychannel -f /etc/hyperledger/configtx/channel.tx
echo Join peer0.org1.example.com to the channel.
sudo docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel join -b mychannel.block
echo Install and instantiate chaincode
sudo docker exec -i cli peer chaincode install -n mycc -v 1.0 -p "/opt/gopath/src/github.com/newcc" -l "node"
sudo docker exec -i cli peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n mycc -l "node" -v 1.0 -c '{"Args":[]}'

docker exec -i peer1.org1.example.com bash < ./setup-scripts/joinChannel.sh
docker exec -i peer2.org1.example.com bash < ./setup-scripts/joinChannel.sh
docker exec -i peer3.org1.example.com bash < ./setup-scripts/joinChannel.sh
docker exec -i peer4.org1.example.com bash < ./setup-scripts/joinChannel.sh
docker exec -i peer5.org1.example.com bash < ./setup-scripts/joinChannel.sh
docker exec -i peer6.org1.example.com bash < ./setup-scripts/joinChannel.sh
