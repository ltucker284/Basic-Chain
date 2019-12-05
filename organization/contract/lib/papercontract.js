/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// PaperNet specifc classes
const CommercialPaper = require('./paper.js');
const PaperList = require('./paperlist.js');

/**
 * A custom context provides easy access to list of all commercial papers
 */
class CommercialPaperContext extends Context {

    constructor() {
        super();
        // All papers are held in a list of papers
        this.paperList = new PaperList(this);
    }

}

/**
 * Define commercial paper smart contract by extending Fabric Contract class
 *
 */
class CommercialPaperContract extends Contract {

    constructor() {
        // Unique name when multiple contracts per chaincode file
        super('org.papernet.commercialpaper');
    }

    /**
     * Define a custom context for commercial paper
    */
    createContext() {
        return new CommercialPaperContext();
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
     * @param {String} voter the voter in which a particular vote is issued to
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} issueDate paper issue date
     * @param {String} candidate candidate field for user to vote for
    */
    async issue(ctx, voter, paperNumber, issueDateTime, candidate) {

        // create an instance of the paper
        let paper = CommercialPaper.createInstance(voter, paperNumber, issueDateTime, candidate);

        // Smart contract, rather than paper, moves paper into UNREDEEMED state
        paper.setUnredeemed();

        // Newly issued paper is owned by the voter it's issued to
        paper.setOwner(voter);

        // Add the paper to the list of all similar commercial papers in the ledger world state
        await ctx.paperList.addPaper(paper);

        // Must return a serialized paper to caller of smart contract
        return paper;
    }

    /**
     * Redeem commercial paper
     *
     * @param {Context} ctx the transaction context
     * @param {String} voter 
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} candidate
     * @param {String} redeemingUsername
     * @param {String} issueDate
    */
    async redeem(ctx, voter, paperNumber, candidate, redeemingUsername, issueDate) {

        let paperKey = CommercialPaper.makeKey([voter, paperNumber]);

        let paper = await ctx.paperList.getPaper(paperKey);

        // Check paper is not REDEEMED
        if (paper.isRedeemed()) {
            throw new Error('Vote ' + paperNumber + ' has already been redeemed');
        }

        // Verify that the redeemer owns the commercial paper before redeeming it
        if (paper.getOwner() === voter) {
            paper.setOwner(paper.getOwner());
            paper.setRedeemed();
            console.log('Vote ' + paper.paperNumber + 'has been redeemed by ' + voter);
        } else {
            throw new Error('Redeeming voter does not own vote' + voter + paperNumber);
        }

        await ctx.paperList.updatePaper(paper);
        return paper;
    }

}

module.exports = CommercialPaperContract;
