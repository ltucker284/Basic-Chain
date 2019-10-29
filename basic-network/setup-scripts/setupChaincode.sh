export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_ADDRESS=peer0.org1.example.com:7051
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp
export CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/tls/ca.crt

peer chaincode install -n votingChaincode -v 0.1 -p "/opt/gopath/src/github.com/hyperledger/fabric/chaincode" -l "node"
peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n chaincode -l "node" -v 0.1 -c '{"Args":[]}'
