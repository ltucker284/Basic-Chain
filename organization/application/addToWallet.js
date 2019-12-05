/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../basic-network');

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
        const keyAdmin = fs.readFileSync(path.join(credPathAdmin, '/msp/keystore/8cc1bff899376e872bc5a4d32bc6a861d7518bf27fd7b2e5a7936969a5797eb2_sk')).toString();

        const credPath1 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User1@org1.example.com');
        const cert1 = fs.readFileSync(path.join(credPath1, '/msp/signcerts/User1@org1.example.com-cert.pem')).toString();
        const key1 = fs.readFileSync(path.join(credPath1, '/msp/keystore/445e198d3a3da46ab74e6c5188eacaad58e54c0c72f78c43e6aa9615cb0adb22_sk')).toString();

        const credPath2 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User2@org1.example.com');
        const cert2 = fs.readFileSync(path.join(credPath2, '/msp/signcerts/User2@org1.example.com-cert.pem')).toString();
        const key2 = fs.readFileSync(path.join(credPath2, '/msp/keystore/4a4f27d2bda9c5a614c145e008356bcbddd77ddf9817c08d815a84a15d738d46_sk')).toString();
        
        const credPath3 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User3@org1.example.com');
        const cert3 = fs.readFileSync(path.join(credPath3, '/msp/signcerts/User3@org1.example.com-cert.pem')).toString();
        const key3 = fs.readFileSync(path.join(credPath3, '/msp/keystore/ba68edce1ae56bd0916537b53cf02dba8dccec4020550e3d079944be99fc9255_sk')).toString();
        
        const credPath4 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User4@org1.example.com');
        const cert4 = fs.readFileSync(path.join(credPath4, '/msp/signcerts/User4@org1.example.com-cert.pem')).toString();
        const key4 = fs.readFileSync(path.join(credPath4, '/msp/keystore/e6796a31e7453d786677a8b1e30a4ac2bf52d28eb3b48f68f2cff2d6db0c9547_sk')).toString();
        
        const credPath5 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User5@org1.example.com');
        const cert5 = fs.readFileSync(path.join(credPath5, '/msp/signcerts/User5@org1.example.com-cert.pem')).toString();
        const key5 = fs.readFileSync(path.join(credPath5, '/msp/keystore/a891ba88a94d20c15a4ce2999440993816b94fca5679bab31c507f6708ac550a_sk')).toString();
        
        const credPath6 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User6@org1.example.com');
        const cert6 = fs.readFileSync(path.join(credPath6, '/msp/signcerts/User6@org1.example.com-cert.pem')).toString();
        const key6 = fs.readFileSync(path.join(credPath6, '/msp/keystore/6c1b61be38c3d89b4082e0a9a50eada6ede2efd8b5e50f71e8755423b738681c_sk')).toString();
        
        const credPath7 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User7@org1.example.com');
        const cert7 = fs.readFileSync(path.join(credPath7, '/msp/signcerts/User7@org1.example.com-cert.pem')).toString();
        const key7 = fs.readFileSync(path.join(credPath7, '/msp/keystore/9284038e636cfebc69024c5c105b8ec9fa775af535bf7bf4369249372da9b3e4_sk')).toString();
        
        const credPath8 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User8@org1.example.com');
        const cert8 = fs.readFileSync(path.join(credPath8, '/msp/signcerts/User8@org1.example.com-cert.pem')).toString();
        const key8 = fs.readFileSync(path.join(credPath8, '/msp/keystore/249c7eafa225d6be4fe2a80338964f39dd2cc791bb4bef35be2ef082e6a98fb5_sk')).toString();
        
        const credPath9 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User9@org1.example.com');
        const cert9 = fs.readFileSync(path.join(credPath9, '/msp/signcerts/User9@org1.example.com-cert.pem')).toString();
        const key9 = fs.readFileSync(path.join(credPath9, '/msp/keystore/e8d8b66eb2fa7f14f3a9e7dea2d26c8a12fdff2ab9e90072147a2fa6f88e4aef_sk')).toString();
        
        const credPath10 = path.join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/User10@org1.example.com');
        const cert10 = fs.readFileSync(path.join(credPath10, '/msp/signcerts/User10@org1.example.com-cert.pem')).toString();
        const key10 = fs.readFileSync(path.join(credPath10, '/msp/keystore/2fdf21926ce6edf6e9796b41395abaaa9e54f3a2438d3b25d9e728f4963c5713_sk')).toString();

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