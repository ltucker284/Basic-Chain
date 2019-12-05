/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

// Enumerate commercial paper state values
const cpState = {
    ISSUED: 1,
    UNREDEEMED: 2,
    REDEEMED: 3
};

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class CommercialPaper extends State {

    constructor(obj) {
        super(CommercialPaper.getClass(), [obj.voter, obj.paperNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getVoter() {
        return this.voter;
    }

    setVoter(newVoter) {
        this.voter = newVoter;
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
        this.currentState = cpState.ISSUED;
    }

    setUnredeemed() {
        this.currentState = cpState.UNREDEEMED;
    }

    setRedeemed() {
        this.currentState = cpState.REDEEMED;
    }

    isIssued() {
        return this.currentState === cpState.ISSUED;
    }

    isUnredeemed() {
        return this.currentState === cpState.UNREDEEMED;
    }

    isRedeemed() {
        return this.currentState === cpState.REDEEMED;
    }

    static fromBuffer(buffer) {
        return CommercialPaper.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, CommercialPaper);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createInstance(voter, paperNumber, candidate, redeemingUsername, issueDate) {
        return new CommercialPaper({voter, paperNumber, candidate, redeemingUsername, issueDate});
    }

    static getClass() {
        return 'org.papernet.commercialpaper';
    }
}

module.exports = CommercialPaper;
