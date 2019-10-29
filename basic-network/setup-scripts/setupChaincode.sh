export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_ADDRESS=peer0.org1.example.com:7051
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/tls/ca.crt

peer chaincode install -n votingChaincode -v 0.1 -p "/opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode" -l "node"
#peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n chaincode -l "node" -v 0.1 -c '{"Args":[]}'


#ORG1_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
#ORDERER_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
#set -x

/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/

#export ORG1_MSPCONFIGPATH=/etc/hyperledger/msp/peer/admincerts/Admin@org1.example.com/msp
#export ORG1_TLS_ROOTCERT_FILE=/etc/hyperledger/msp/peer
#export ORDERER_TLS_ROOTCERT_FILE=
