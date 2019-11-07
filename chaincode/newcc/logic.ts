'use strict';
const {Contract} = require('fabric-contract-api');

class testContract extends Contract {

  async addVote(ctx,voterID,candidate, timeStamp) {
    timeStamp = Date.now();
   
    let vote={
       voterID: voterID,
       candidate: candidate,
       timeStamp: timeStamp
       };

    await ctx.stub.putState(voterID,Buffer.from(JSON.stringify(vote)));
    
    console.log('This vote was added to the ledger succesfully..');
    
  }
   async queryVote(ctx,voterID) {
   
    let marksAsBytes = await ctx.stub.getState(voterID);
    if (!marksAsBytes || marksAsBytes.toString().length <= 0) {
      throw new Error('A voter with this Id does not exist: ');
       }
      let marks=JSON.parse(marksAsBytes.toString());
      
      return JSON.stringify(marks);
     }
}
module.exports=testContract;
