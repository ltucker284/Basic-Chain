##########################################################################
# Author: Juan Matiz
# CSC 450
# Summary: The following script attempts to mimic the two most basic
# components of a blockchain, a merkle tree and linked list, and demonstrates
##########################################################################

import hashlib
import random
import time
from collections import OrderedDict
from merkle_tree import merkle_tree

def generate_genesis_block():
    """This function passes a list to merkle_tree.py that creates the root for the genesis block"""
    time_stamp = time.mktime(time.strptime('11/03/2020-07:59AM', '%m/%d/%Y-%I:%M%p'))  # time.mktime() generates a time_stamp in unix time.
    start_timestamp = time.strftime('%m/%d/%Y-%I:%M%p', time.localtime(time_stamp))  # time.strftime() formats the unix time into a human readable timestamp string.
    genesis_block = ['0', '0', "Nonce", start_timestamp] 

    return genesis_block

def generate_candiate_hash():
    """This function generates the hashes for two candidates"""
    candidate_one = 'Candidate_one'
    candidate_two = 'Candidate_two'

    candidate_one = hashlib.sha256(candidate_one.encode('utf-8'))  # hashlib.sha256() function takes only an encoded string.
    candidate_two = hashlib.sha256(candidate_two.encode('utf-8'))

    return candidate_one.hexdigest(), candidate_two.hexdigest()


def create_id():
    """This function shuffles a list of IDs, and returns them to main"""
    id_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]  # 20 voter_ids have been declared.
    random.shuffle(id_list) 

    return id_list

def create_vote(genesis_block, id_list, candidate_hash):
    """This function takes the voter_ids and the candidate hashes, and creates voter instances with these values"""
    vote_list = []
    vote_list.append(genesis_block)
    vote_number = 0
    start_timestamp = time.mktime(time.strptime('11/03/2020-08:00AM', '%m/%d/%Y-%I:%M%p'))  # time.mktime() generates a time_stamp in unix time.
    end_timestamp = time.mktime(time.strptime('11/03/2020-08:00PM', '%m/%d/%Y-%I:%M%p'))
    

    for i in range(0, len(id_list)):  # Loops through the voter_ids and assigns the corresponding candidate hashes to each vote.
        candidate_chosen = random.randint(1,2)  # A value of 1 and 2 is returned. This will correspond to the voter choosing a candidate.
        vote_cast_time = time.strftime('%m/%d/%Y-%I:%M%p', time.localtime(random.randrange(start_timestamp,end_timestamp)))  # Returns a time_stamp string that is genereated at random.
        vote_number += 1
        if candidate_chosen == 1:
            #vote[id_list[i]] = vote_number, candidate_hash[0], vote_cast_time 
            vote_list.append([str(id_list[i]), str(vote_number), candidate_hash[0], vote_cast_time])  # Creates a list and appends them to vote_list
        else:
            #vote[id_list[i]] = vote_number, candidate_hash[1], vote_cast_time
            vote_list.append([str(id_list[i]), str(vote_number), candidate_hash[1], vote_cast_time])

    return vote_list

def create_block_chain(vote_block):
    """This function takes the merkle roots from each vote instance and inserts them into a dictionary."""
    block_chain = OrderedDict()
    vote_block = vote_block[::-1]  # Reverses the order of the list
    for index in range(0, len(vote_block)):
        if index == len(vote_block)-1:
            break
        else:
            block_chain[vote_block[index][4]] = vote_block[index+1][4]

    return block_chain, vote_block

def create_tampered_vote(block_chain, vote_block, candidate_hash):
    """This function takes a user input and modifies a voter's candidate choice."""
    merk_tree = merkle_tree()
    index = input("Alter a vote by typing an index value from 1 to 20: ")
    index = int(index)
    key = vote_block[index][4]  # The merkle_root of that specific block is assigned to key
    if vote_block[index][2] == candidate_hash[0]:  # Checks whether the value of the candidate hash equals the value of the tuple candidate_hash at index 0.
        print("Current Block Chain: {}".format(block_chain))  
        vote_block[index][2] = candidate_hash[1]  # If true, changes value of candidate hash to candidate_two hash value.
        del vote_block[index][-1]  # Deletes the merkle_root of this specific block. We do not want this value to be hashed with the rest of the data in the list.
        transaction = vote_block[index]
        print("\nVote Candidate One Changed: {}".format(vote_block[index]))
        #print("Vote Instance: {}".format(transaction))
        merk_tree.list1 = transaction
        merk_tree.create_tree()
        merkle_root = merk_tree.Get_root_leaf()
        print("\nMerkle Root: {}".format(merkle_root))
        block_chain[merkle_root] = block_chain.pop(key)  # Remove the old key and assign it the new merkle_root calculated from the tampered data.
        print(block_chain)
        # return block_chain
    else:
        vote_block[index][2] = candidate_hash[0]
        print("Current Block Chain prior to candidate two being changed: {}".format(block_chain))
        del vote_block[index][-1]
        transaction = vote_block[index]
        print("\nVote Candidate Two changed: {}".format(vote_block[index]))
        # #print("Vote Instance: {}".format(transaction))
        merk_tree.list1 = transaction
        merk_tree.create_tree()
        merkle_root = merk_tree.Get_root_leaf()
        print("\nMerkle Root: {}".format(merkle_root))
        block_chain[merkle_root] = block_chain.pop(key)
        print(block_chain)
        # return block_chain

if __name__ == "__main__":
    merkle_root_list = []
    genesis_block = generate_genesis_block()
    candidate_hash = generate_candiate_hash()
    id_list = create_id()
    vote_list = create_vote(genesis_block, id_list, candidate_hash)
    vote_block = []
    
    for vote in vote_list:  # Loops through each vote and creates a merkle tree, returns a list of merkle_roots. 
        merk_tree = merkle_tree()
        transaction = vote
        #print("Vote Instance: {}".format(transaction))
        merk_tree.list1 = transaction
        merk_tree.create_tree()
        merkle_root = merk_tree.Get_root_leaf()
        vote.append(merkle_root)
        vote_block.append(vote)

        #print("Merkle Root: {}".format(merkle_root))
    block_chain = create_block_chain(vote_block)
    create_tampered_vote(block_chain[0], block_chain[1], candidate_hash)
    # tamper_block_chain(block_chain, merkle_root_list, tampered_vote)
    

