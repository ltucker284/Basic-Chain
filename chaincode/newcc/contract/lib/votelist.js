/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('../ledger-api/statelist.js');

const Vote = require('./vote.js');

class VoteList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.example');
        this.use(Vote);
    }

    async addVote(vote) {
        return this.addState(vote);
    }

    async getVote(voteKey) {
        return this.getState(voteKey);
    }

    async updateVote(vote) {
        return this.updateState(vote);
    }
}


module.exports = VoteList;