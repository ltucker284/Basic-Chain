'use strict';
const {Contract} = require('fabric-contract-api');

class testContract extends Contract {


   async queryVote(ctx,voterId) {
   
    let marksAsBytes = await ctx.stub.getState(voterId);
    if (!marksAsBytes || marksAsBytes.toString().length <= 0) {
      throw new Error('A voter with this Id does not exist: ');
       }
      let marks=JSON.parse(marksAsBytes.toString());
      
      return JSON.stringify(marks);
     }

   async addVote(ctx,voterId,candidate) {
   
    let vote={
       candidate: candidate
       };

    await ctx.stub.putState(voterId,Buffer.from(JSON.stringify(vote)));
    
    console.log('This vote was added to the ledger succesfully..');
    
  }

}
module.exports=testContract;
