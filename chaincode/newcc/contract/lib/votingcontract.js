/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// PaperNet specifc classes
const CommercialPaper = require('./vote.js');
const VoteList = require('./votelist.js');

/**
 * A custom context provides easy access to list of all commercial papers
 */
class VoteContext extends Context {

    constructor() {
        super();
        // All papers are held in a list of papers
        this.voteList = new VoteList(this);
    }

}

/**
 * Define commercial paper smart contract by extending Fabric Contract class
 *
 */
class VotingContract extends Contract {

    constructor() {
        // Unique name when multiple contracts per chaincode file
        super('org.example');
    }

    /**
     * Define a custom context for commercial paper
     */
    createContext() {
        return new VoteContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }

    /**
     * Issue commercial paper
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} issueDateTime paper issue date
     * @param {String} maturityDateTime paper maturity date
     * @param {Integer} faceValue face value of paper
     */
    async issue(ctx, issuer, voteNumber, issueDateTime, maturityDateTime, faceValue) {

        // create an instance of the paper
        let vote = Vote.createInstance(issuer, voteNumber, issueDateTime, maturityDateTime, faceValue);

        // Smart contract, rather than paper, moves paper into ISSUED state
        vote.setIssued();

        // Newly issued paper is owned by the issuer
        vote.setOwner(issuer);

        // Add the paper to the list of all similar commercial papers in the ledger world state
        await ctx.votetList.addVote(vote);

        // Must return a serialized paper to caller of smart contract
        return vote;
    }

    /**
     * Buy commercial paper
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} currentOwner current owner of paper
     * @param {String} newOwner new owner of paper
     * @param {Integer} price price paid for this paper
     * @param {String} purchaseDateTime time paper was purchased (i.e. traded)
     */
    // async buy(ctx, issuer, paperNumber, currentOwner, newOwner, price, purchaseDateTime) {
    //
    //     // Retrieve the current paper using key fields provided
    //     let paperKey = CommercialPaper.makeKey([issuer, paperNumber]);
    //     let paper = await ctx.paperList.getPaper(paperKey);
    //
    //     // Validate current owner
    //     if (paper.getOwner() !== currentOwner) {
    //         throw new Error('Paper ' + issuer + paperNumber + ' is not owned by ' + currentOwner);
    //     }
    //
    //     // First buy moves state from ISSUED to TRADING
    //     if (paper.isIssued()) {
    //         paper.setTrading();
    //     }
    //
    //     // Check paper is not already REDEEMED
    //     if (paper.isTrading()) {
    //         paper.setOwner(newOwner);
    //     } else {
    //         throw new Error('Paper ' + issuer + paperNumber + ' is not trading. Current state = ' +paper.getCurrentState());
    //     }
    //
    //     // Update the paper
    //     await ctx.paperList.updatePaper(paper);
    //     return paper;
    // }

    /**
     * Redeem commercial paper
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} redeemingOwner redeeming owner of paper
     * @param {String} redeemDateTime time paper was redeemed
     */
    async redeem(ctx, issuer, voteNumber, redeemingOwner, redeemDateTime) {

        let voteKey = Vote.makeKey([issuer, voteNumber]);

        let vote = await ctx.voteList.getPaper(voteKey);

        // Check paper is not REDEEMED
        if (paper.isRedeemed()) {
            throw new Error('Vote ' + issuer + voteNumber + ' already redeemed');
        }

        // Verify that the redeemer owns the commercial paper before redeeming it
        if (paper.getOwner() === redeemingOwner) {
            paper.setOwner(paper.getIssuer());
            paper.setRedeemed();
        } else {
            throw new Error('Redeeming owner does not own paper' + issuer + voteNumber);
        }

        await ctx.voteList.updateVote(vote);
        return vote;
    }

}

module.exports = VotingContract;
