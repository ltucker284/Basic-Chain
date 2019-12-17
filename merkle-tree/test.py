from collections import OrderedDict

def create_block_chain(vote_block):
    """This function takes the merkle roots from each vote instance and inserts them into a dictionary."""
    block_chain = OrderedDict()
    vote_block = vote_block[::-1]  # Reverses the order of the list
    for index in range(0, len(vote_block)):  # Loops through the list of merkle roots for each vote and assigns them as key,value.
        if index == len(vote_block)-1:
            break
        else:
            block_chain[vote_block[index][4]] = vote_block[index+1][4]  # First merkle root is the root from the genesis block.

    return block_chain, vote_block

def alter_block_chain(block_chain, vote_block):
    print("\nCurrent Block Chain: {}".format(block_chain))
    index = input("Type Index: ")
    index = int(index)
    current_block_key = vote_block[index][4]
    previous_block_key = vote_block[index+1][4]
    if vote_block[index][2] == 'candidate':
        del vote_block[index][-1]
        vote_block[index][2] = 'error'
        block_chain['Tampered Block'] = block_chain.pop(current_block_key)
        print("\nBlock Chain with tampered block: {}".format(block_chain))
    

if __name__ == "__main__":
    vote_block = [['0', '0', 'Nonce', 'time_stamp', 'genesis'], ['1', '1', 'candidate', 'time_stamp', 'hash1'], ['2', '2', 'candidate', 'time_stamp','hash2'], ['3', '3', 'candidate', 'time_stamp','hash3'], ['4', '4', 'candidate', 'time_stamp','hash4']]
    block_chain = create_block_chain(vote_block)
    alter_block_chain(block_chain[0], block_chain[1])
