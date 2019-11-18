/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../../../basic-network');

// A wallet stores a collection of identities
const walletAdmin = new FileSystemWallet('../identity/admin/wallet');
const wallet1 = new FileSystemWallet('../identity/user1/wallet');
const wallet2 = new FileSystemWallet('../identity/user2/wallet');
const wallet3 = new FileSystemWallet('../identity/user3/wallet');
const wallet4 = new FileSystemWallet('../identity/user4/wallet');
const wallet5 = new FileSystemWallet('../identity/user5/wallet');
const wallet6 = new FileSystemWallet('../identity/user6/wallet');
const wallet7 = new FileSystemWallet('../identity/user7/wallet');
const wallet8 = new FileSystemWallet('../identity/user8/wallet');
const wallet9 = new FileSystemWallet('../identity/user9/wallet');
const wallet10 = new FileSystemWallet('../identity/user10/wallet');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPathAdmin = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com');
        const certAdmin = fs.readFileSync(path.join(credPathAdmin, '/msp/signcerts/Admin@org1.example.com-cert.pem')).toString();
        const keyAdmin = fs.readFileSync(path.join(credPathAdmin, '/msp/keystore/1186945c2af94f5465fc9aaf348bdae34a6a4be1b8adc07799a9452a0722c657_sk')).toString();

        const credPath1 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User1@org1.example.com');
        const cert1 = fs.readFileSync(path.join(credPath1, '/msp/signcerts/User1@org1.example.com-cert.pem')).toString();
        const key1 = fs.readFileSync(path.join(credPath1, '/msp/keystore/61b907e9399aff861df4e55b786349d590a1399f73c450178c38873ce5b53529_sk')).toString();

        const credPath2 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User2@org1.example.com');
        const cert2 = fs.readFileSync(path.join(credPath2, '/msp/signcerts/User2@org1.example.com-cert.pem')).toString();
        const key2 = fs.readFileSync(path.join(credPath2, '/msp/keystore/c9615cb44249db0391de1a2fd249b859a6ad630eeceb21c141cfda92e3ab027e_sk')).toString();

        const credPath3 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User3@org1.example.com');
        const cert3 = fs.readFileSync(path.join(credPath3, '/msp/signcerts/User3@org1.example.com-cert.pem')).toString();
        const key3 = fs.readFileSync(path.join(credPath3, '/msp/keystore/328faa5b1222fb432c2605667e415a46b16b77f7037a28a6d631a8eae041f7b4_sk')).toString();

        const credPath4 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User4@org1.example.com');
        const cert4 = fs.readFileSync(path.join(credPath4, '/msp/signcerts/User4@org1.example.com-cert.pem')).toString();
        const key4 = fs.readFileSync(path.join(credPath4, '/msp/keystore/086fed89dead7d2d380c35731d200a262ac9b5179eaa607854f4fc7e4555be76_sk')).toString();

        const credPath5 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User5@org1.example.com');
        const cert5 = fs.readFileSync(path.join(credPath5, '/msp/signcerts/User5@org1.example.com-cert.pem')).toString();
        const key5 = fs.readFileSync(path.join(credPath5, '/msp/keystore/f6988c46d98d651885ea00259560bbd159f63abe8be2332c8f7360cb082f9ad0_sk')).toString();

        const credPath6 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User6@org1.example.com');
        const cert6 = fs.readFileSync(path.join(credPath6, '/msp/signcerts/User6@org1.example.com-cert.pem')).toString();
        const key6 = fs.readFileSync(path.join(credPath6, '/msp/keystore/73cb66eaedf7e0b512f6f63a97c46ebe002b699f231fc8907ea34f855778088a_sk')).toString();

        const credPath7 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User7@org1.example.com');
        const cert7 = fs.readFileSync(path.join(credPath7, '/msp/signcerts/User7@org1.example.com-cert.pem')).toString();
        const key7 = fs.readFileSync(path.join(credPath7, '/msp/keystore/49a93beced285bff867d3b9f8b10bb20fe5cb9a77bef6fb37e186d4f17601fab_sk')).toString();

        const credPath8 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User8@org1.example.com');
        const cert8 = fs.readFileSync(path.join(credPath8, '/msp/signcerts/User8@org1.example.com-cert.pem')).toString();
        const key8 = fs.readFileSync(path.join(credPath8, '/msp/keystore/0a17d571639ec7ee40fd88b0ca3a8394b8d234da0ed9c4d45d216b52bf7edc5a_sk')).toString();

        const credPath9 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User9@org1.example.com');
        const cert9 = fs.readFileSync(path.join(credPath9, '/msp/signcerts/User9@org1.example.com-cert.pem')).toString();
        const key9 = fs.readFileSync(path.join(credPath9, '/msp/keystore/7533a9c6bc62687693dbf5b8bc042eeade6866725664125454d8220add3ca664_sk')).toString();

        const credPath10 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User10@org1.example.com');
        const cert10 = fs.readFileSync(path.join(credPath10, '/msp/signcerts/User10@org1.example.com-cert.pem')).toString();
        const key10 = fs.readFileSync(path.join(credPath10, '/msp/keystore/a0e016b413e3d8d3d45256804e222e7eeb3dbe2ba8d66164aff55481e0b987cf_sk')).toString();

        // Load credentials into wallet
        const identityLabelAdmin = 'Admin@org1.example.com';
        const identityAdmin = X509WalletMixin.createIdentity('Org1MSP', certAdmin, keyAdmin);
        await walletAdmin.import(identityLabelAdmin, identityAdmin);

        const identityLabel1 = 'User1@org1.example.com';
        const identity1 = X509WalletMixin.createIdentity('Org1MSP', cert1, key1);
        await wallet1.import(identityLabel1, identity1);

        const identityLabel2 = 'User2@org1.example.com';
        const identity2 = X509WalletMixin.createIdentity('Org1MSP', cert2, key2);
        await wallet2.import(identityLabel2, identity2);

        const identityLabel3 = 'User3@org1.example.com';
        const identity3 = X509WalletMixin.createIdentity('Org1MSP', cert3, key3);
        await wallet3.import(identityLabel3, identity3);

        const identityLabel4 = 'User4@org1.example.com';
        const identity4 = X509WalletMixin.createIdentity('Org1MSP', cert4, key4);
        await wallet4.import(identityLabel4, identity4);

        const identityLabel5 = 'User5@org1.example.com';
        const identity5 = X509WalletMixin.createIdentity('Org1MSP', cert5, key5);
        await wallet5.import(identityLabel5, identity5);

        const identityLabel6 = 'User6@org1.example.com';
        const identity6 = X509WalletMixin.createIdentity('Org1MSP', cert6, key6);
        await wallet6.import(identityLabel6, identity6);

        const identityLabel7 = 'User7@org1.example.com';
        const identity7 = X509WalletMixin.createIdentity('Org1MSP', cert7, key7);
        await wallet7.import(identityLabel7, identity7);

        const identityLabel8 = 'User8@org1.example.com';
        const identity8 = X509WalletMixin.createIdentity('Org1MSP', cert8, key8);
        await wallet8.import(identityLabel8, identity8);

        const identityLabel9 = 'User9@org1.example.com';
        const identity9 = X509WalletMixin.createIdentity('Org1MSP', cert9, key9);
        await wallet9.import(identityLabel9, identity9);

        const identityLabel10 = 'User10@org1.example.com';
        const identity10 = X509WalletMixin.createIdentity('Org1MSP', cert10, key10);
        await wallet10.import(identityLabel10, identity10);
    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});