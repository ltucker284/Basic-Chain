const {Contract}=require('fabric-contract-api');
class voterContract extends Contract {


    async addVote(ctx, voterId, candidate) {
        let vote={
            voterId: voterId,
            candidate: candidate
        };
        await  ctx.stub.putState(voterId,Buffer.from(JSON.stringify(vote)));
        console.log('A vote has been added To the ledger Succesfully..');
    }

    async queryVote(ctx, voterId){
        let marksAsBytes = await ctx.stub.getState(voterId);
        if (!marksAsBytes || marksAsBytes.toString().length <= 0) {
            throw new Error('A voter with this ID does not exist: ');
        }
        let marks=JSON.parse(marksAsBytes.toString());
        return JSON.stringify(marks);
    }
}

module.exports=voterContract;