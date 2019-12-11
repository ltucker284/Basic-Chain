##########################################################################
# Author: Juan Matiz
# CSC 450
# Summary: The following script attempts to mimic the two most basic
# components of a blockchain, a merkle tree and linked list, and demonstrates
# how these two theories allow for the rapid verification of a block chain. 
##########################################################################

import hashlib
import random
import time
import sys
from collections import OrderedDict
from merkle_tree import merkle_tree

def generate_genesis_block():
    """This function passes a list to merkle_tree.py that creates the root for the genesis block"""
    time_stamp = time.mktime(time.strptime('11/02/2020-07:59AM', '%m/%d/%Y-%I:%M%p'))  # time.mktime() generates a time_stamp in unix time.
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
    id_list = list(range(1,21))  # 20 voter_ids have been declared.
    random.shuffle(id_list) 

    return id_list

def create_vote(genesis_block, id_list, candidate_hash):
    """This function takes the voter_ids and the candidate hashes, and creates voter instances with these values"""
    vote_list = []
    vote_list.append(genesis_block)
    vote_number = 0
    start_timestamp = time.mktime(time.strptime('11/02/2020-08:00AM', '%m/%d/%Y-%I:%M%p'))  # time.mktime() generates a time_stamp in unix time.
    end_timestamp = time.mktime(time.strptime('11/02/2020-08:00PM', '%m/%d/%Y-%I:%M%p'))
    

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
    reversed_vote_block = vote_block[::-1]  # Reverses the order of the list
    for index in range(0, len(reversed_vote_block)):
        if index == len(reversed_vote_block)-1:
            break
        else:
            block_chain[reversed_vote_block[index][4]] = reversed_vote_block[index+1][4]

    return block_chain, reversed_vote_block

def create_tampered_vote(block_chain, reversed_vote_block, candidate_hash, index):
    """This function takes a user input and modifies a voter's candidate choice."""
    merk_tree = merkle_tree()
    key = reversed_vote_block[index][4]  # The merkle_root of that specific block is assigned to key
    if reversed_vote_block[index][2] == candidate_hash[0]:  # Checks whether the value of the candidate hash equals the value of the tuple candidate_hash at index 0.
        #print("Current Vote Prior to Tampering: {}".format(reversed_vote_block[index]))
        reversed_vote_block[index][2] = candidate_hash[1]  # If true, changes value of candidate hash to candidate_two hash value.
        del reversed_vote_block[index][-1]  # Deletes the merkle_root of this specific block. We do not want this value to be hashed with the rest of the data in the list.
        transaction = reversed_vote_block[index]
        merk_tree.list1 = transaction
        merk_tree.create_tree()
        merkle_root = merk_tree.Get_root_leaf()
        reversed_vote_block[index].append(merkle_root)
        tampered_vote_block = reversed_vote_block
        #print("Vote Candidate One Changed: {}".format(tampered_vote_block[index]))
        block_chain[merkle_root] = block_chain.pop(key)  # Remove the old key and assign it the new merkle_root calculated from the tampered data.

        return block_chain, tampered_vote_block
    else:
        reversed_vote_block[index][2] = candidate_hash[0]  # Candidate hash value inside the vote_block is assigned Candidate_Two's hash.
        #print("Current Vote Prior to Tampering: {}".format(reversed_vote_block[index]))
        del reversed_vote_block[index][-1]  # Deletes the merkle_root of this specific block.
        transaction = reversed_vote_block[index]
        merk_tree.list1 = transaction  # The vote_block is assigned to the list1 function in the merkle_tree class.
        merk_tree.create_tree()
        merkle_root = merk_tree.Get_root_leaf()
        reversed_vote_block[index].append(merkle_root)  # Adds the new merkle_root to the end of the block.
        tampered_vote_block = reversed_vote_block  # Since vote_block has been changed, the variable gets renamed.
        #print("Vote Candidate Two Changed: {}".format(tampered_vote_block[index]))
        block_chain[merkle_root] = block_chain.pop(key)  # The merkle_root of the specific block is removed, and the new merkle_root that was calculated is added to the dictionary.

        return block_chain, tampered_vote_block

def check_vote(candidate_hash, block_chain):
    merk_tree = merkle_tree()
    block_chain = block_chain[0]
    vote_id = input("What is your voter id? ")
    vote_number = input("What is your vote number? ")
    candidate_chosen = input("Who did you vote for? ")
    time_stamp = input("Please type the date and time that shows up on your receipt: ")

    if candidate_chosen == 'Candidate_one':
        candidate_chosen = candidate_hash[0]
    else:
        candidate_chosen = candidate_hash[1]

    query_vote = [vote_id, vote_number, candidate_chosen, time_stamp]
    transaction = query_vote
    merk_tree.list1 = transaction
    merk_tree.create_tree()
    merkle_root = merk_tree.Get_root_leaf()
    query_vote.append(merkle_root)

    try:
        block_chain[query_vote[4]]
    except KeyError as err:
        print("There was an error: {}. Your vote was not found".format(err))
    else:
        print('Your vote is in the ledger!')

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
    reversed_vote_block = block_chain[1]
    for index in range(0, 20):
        block_chain = create_tampered_vote(block_chain[0], reversed_vote_block, candidate_hash, index)  # A tuple is returned by this function call.
        tampered_block_chain = block_chain[0]  # Assigning tuple values to variables
        tampered_vote_block = block_chain[1]
        current = tampered_vote_block[index][4]
        while current != '984ec4499b3a6b90bbcd8e05efe985a1c3c8f75a657cf0d70049ffd111f90b8dce8139ff892ba4644135c6a263729dc38104db4580609ae506c99a94f6daf607':  # Iterates through the dictionary and finds the tampered hash.
            current = tampered_block_chain[current]
            print("Not Tampered: {}".format(current))
        else:
            print("Tampered Root: {}".format(tampered_vote_block[index][4]))
    print("Here is your receipt: {}".format(reversed_vote_block[0][0:4]))
    query_vote = input("Would you like to check whether your vote is in the ledger: Y/N ")
    query_vote = query_vote.lower()
    if query_vote == 'y':
        check_vote(candidate_hash, block_chain)
    else:
        "Goodbye"
        sys.exit()
    

