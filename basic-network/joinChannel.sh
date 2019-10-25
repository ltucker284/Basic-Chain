#!/bin/bash
# This script joins all peer nodes to the fabric network

export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp
peer channel fetch oldest mychannel.block -c mychannel --orderer orderer.example.com:7050
exit