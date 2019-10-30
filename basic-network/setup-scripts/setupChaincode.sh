export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_ADDRESS=peer0.org1.example.com:7051
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/tls/ca.crt

peer chaincode install -n votingChaincode -v 0.1 -p "/opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode" -l "node"

#export ORDERER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

#peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n votingChaincode -l "node" -v 0.1 -c '{"Args":[]}' --tls --cafile ${ORDERER_TLS_ROOTCERT_FILE} --peerAddresses peer0.org1.example.com:7051

#  peer chaincode instantiate \
#    -o orderer.example.com:7050 \
#    -C mychannel \
#    -n marbles \
#    -l "$CC_RUNTIME_LANGUAGE" \
#    -v 1.0 \
#    -c '{"Args":[]}' \
#    -P "AND('Org1MSP.member','Org2MSP.member')" \
#    --tls \
#    --cafile ${ORDERER_TLS_ROOTCERT_FILE} \
#    --peerAddresses peer0.org1.example.com:7051 \
#    --tlsRootCertFiles ${ORG1_TLS_ROOTCERT_FILE}