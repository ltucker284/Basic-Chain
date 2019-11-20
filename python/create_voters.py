##########################################################################
# Author: Juan Matiz
# CSC 450
# Summary: The following script attempts to mimic the two most of basic
# components of a blockchain, a merkle tree and linked list, and demonstrates
##########################################################################

import random
import hashlib
import time
from merkle_tree import merkle_tree

def generate_genesis_block():
    """This function passes a list to merkle_tree.py that creates the root for the genesis block"""
    time_stamp = time.mktime(time.strptime('11/03/2020-07:59AM', '%m/%d/%Y-%I:%M%p'))  # time.mktime() generates a time_stamp in unix time.
    start_timestamp = time.strftime('%m/%d/%Y-%I:%M%p', time.localtime(time_stamp))  # time.strftime() formats the unix time into a human readable timestamp string.
    genesis_block = ['0', '0', "Nonce", start_timestamp] 
    merk_tree = merkle_tree()  # merkle_tree class in merkle_tree.py is called
    transaction = genesis_block  # The list containing the values of the genesis block are passed to the merk_tree class.
    merk_tree.list1 = transaction  # Transaction is passed into the list variable of the merkle_tree class.
    merk_tree.create_tree()
    genesis_root = merk_tree.Get_root_leaf()  # Get_root_leaf() function returns the value contained in the OrderedDict created by create_tree()

    return genesis_root

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

def create_vote(id_list, candidate_hash):
    """This function takes the voter_ids and the candidate hashes, and creates voter instances with them"""
    vote_list = []
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

def create_block_chain(merkle_root_list):
    """This function takes the merkle roots from each vote instance and inserts them into a dictionary."""
    block_chain = {}

    for index in range(0, len(merkle_root_list)):  # Loops through the list of merkle roots for each vote and assigns them as key,value.
        if index == len(merkle_root_list)-1:
            break
        else:
            block_chain[merkle_root_list[index]] = merkle_root_list[index+1]  # First merkle root is the root from the genesis block.
    
    return block_chain

def create_tampered_vote(vote_list, candidate_hash):
    """This function takes a user input and modifies a voter's candidate choice."""
    index = input("Alter a vote by typing an index value from 0 to 19: ")
    index = int(index)
    print("Actual Vote: {}".format(vote_list[index]))
    if vote_list[index][2] == candidate_hash[0]:  # vote_list is a list of lists. Candidate hash are a tuple.
        # print("Current candidate hash: {}".format(vote_list[0][2]))
        vote_list[index][2] = candidate_hash[1]
        # print("New Camdidate_One: {}".format(vote_list[0][2]))
    else:
        vote_list[index][2] = candidate_hash[0]
        # print("New Candidate_Two: {}".format(vote_list[0][2]))

    merk_tree = merkle_tree()
    transaction = vote_list[index]
    merk_tree.list1 = transaction
    merk_tree.create_tree()
    tampered_vote_merkle_root = merk_tree.Get_root_leaf()

    return vote_list[index], tampered_vote_merkle_root  # Returns tampered vote, and the new merkle root.

def compare_values(block_chain, tampered_vote):
    """This function takes the Merkle root of the tampered vote and "queries" the blockchain for authenticity."""
    try:
        block_chain[tampered_vote[1]]
    except KeyError as err:
        err = "Vote has been tampered"
        print(err)
    else:
        print("No tampering has occurred")

if __name__ == "__main__":
    merkle_root_list = []
    genesis_root = generate_genesis_block()
    merkle_root_list.append(genesis_root)
    candidate_hash = generate_candiate_hash()
    id_list = create_id()
    vote_list = create_vote(id_list, candidate_hash)
    
    for vote in vote_list:  # Loops through each vote and creates a merkle tree, returns a list of merkle_roots. 
        merk_tree = merkle_tree()
        transaction = vote
        #print("Vote Instance: {}".format(transaction))
        merk_tree.list1 = transaction
        merk_tree.create_tree()
        merkle_root = merk_tree.Get_root_leaf()
        merkle_root_list.append(merkle_root)

        #print("Merkle Root: {}".format(merkle_root))
    
    block_chain = create_block_chain(merkle_root_list)
    tampered_vote = create_tampered_vote(vote_list, candidate_hash)
    compare_values(block_chain, tampered_vote)
    print("Tampered Vote: {}".format(tampered_vote))


