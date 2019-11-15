/*
SPDX-License-Identifier: Apache-2.0
*/
'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');

// Enumerate commercial paper state values
const votingState = {
    ISSUED: 1,
    REDEEMED: 2
};

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class Vote extends State {

    constructor(obj) {
        super(Vote.getClass(), [obj.issuer, obj.paperNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
     */
    getIssuer() {
        return this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    setIssued() {
        this.currentState = votingState.ISSUED;
    }

    setRedeemed() {
        this.currentState = votingState.REDEEMED;
    }

    isIssued() {
        return this.currentState === votingState.ISSUED;
    }

    isRedeemed() {
        return this.currentState === votingState.REDEEMED;
    }

    static fromBuffer(buffer) {
        return Vote.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Vote);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createInstance(issuer, paperNumber, issueDateTime, maturityDateTime, faceValue) {
        return new Vote({ issuer, paperNumber, issueDateTime, maturityDateTime, faceValue });
    }

    static getClass() {
        return 'org.example';
    }
}

module.exports = Vote;
