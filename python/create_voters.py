import random
import hashlib
import time
from merkle_tree import merkle_tree
# What should a voter instance have?
#voter_id = random.randrange(1, 10)

# What should a vote instance have?
# vote_number =
# timestamp = datetime.now()
# candidate_hash = 

def generate_genesis_block():
    time_stamp = time.mktime(time.strptime('11/03/2020-07:59AM', '%m/%d/%Y-%I:%M%p'))
    start_timestamp = time.strftime('%m/%d/%Y-%I:%M%p', time.localtime(time_stamp))
    genesis_block = ['0', '0', "Nonce", start_timestamp]
    merk_tree = merkle_tree()
    transaction = genesis_block
    merk_tree.list1 = transaction
    merk_tree.create_tree()
    genesis_root = merk_tree.Get_root_leaf()

    return genesis_root

def generate_candiate_hash():
    candidate_one = 'Candidate_one'
    candidate_two = 'Candidate_two'

    candidate_one = hashlib.sha256(candidate_one.encode('utf-8'))
    candidate_two = hashlib.sha256(candidate_two.encode('utf-8'))

    return candidate_one.hexdigest(), candidate_two.hexdigest()


def create_id():
    id_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    random.shuffle(id_list)

    return id_list

def create_vote(id_list, candidate_hash):
    vote_list = []
    vote_number = 0
    start_timestamp = time.mktime(time.strptime('11/03/2020-08:00AM', '%m/%d/%Y-%I:%M%p'))
    end_timestamp = time.mktime(time.strptime('11/03/2020-08:00PM', '%m/%d/%Y-%I:%M%p'))
    

    for i in range(0, len(id_list)):
        candidate_chosen = random.randint(1,2)
        vote_cast_time = time.strftime('%m/%d/%Y-%I:%M%p', time.localtime(random.randrange(start_timestamp,end_timestamp)))
        vote_number += 1
        if candidate_chosen == 1:
            #vote[id_list[i]] = vote_number, candidate_hash[0], vote_cast_time
            vote_list.append([str(id_list[i]), str(vote_number), candidate_hash[0], vote_cast_time])
        else:
            #vote[id_list[i]] = vote_number, candidate_hash[1], vote_cast_time
            vote_list.append([str(id_list[i]), str(vote_number), candidate_hash[1], vote_cast_time])
    
    return vote_list

def create_block_chain(temp_list):
    block_chain = {}

    for index in range(0, len(temp_list)):
        if index == len(temp_list)-1:
            break
        else:
            block_chain[temp_list[index]] = temp_list[index+1]
    
    return block_chain

def create_tampered_vote(vote_list, candidate_hash):
    index = input("Alter a vote by typing an index value from 0 to 19: ")
    index = int(index)
    print("Actual Vote: {}".format(vote_list[index]))
    if vote_list[index][2] == candidate_hash[0]:
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

    return vote_list[index], tampered_vote_merkle_root

def compare_values(block_chain, tampered_vote):
    try:
        block_chain[tampered_vote[1]]
    except KeyError as err:
        err = "Vote has been tampered"
        print(err)

if __name__ == "__main__":
    temp_list = []
    genesis_root = generate_genesis_block()
    temp_list.append(genesis_root)
    candidate_hash = generate_candiate_hash()
    id_list = create_id()
    vote_list = create_vote(id_list, candidate_hash)
    
    for vote in vote_list:
        merk_tree = merkle_tree()
        transaction = vote
        #print("Vote Instance: {}".format(transaction))
        merk_tree.list1 = transaction
        merk_tree.create_tree()
        merkle_root = merk_tree.Get_root_leaf()
        temp_list.append(merkle_root)

        #print("Merkle Root: {}".format(merkle_root))
    
    block_chain = create_block_chain(temp_list)
    tampered_vote = create_tampered_vote(vote_list, candidate_hash)
    compare_values(block_chain, tampered_vote)
    print("Tampered Vote: {}".format(tampered_vote))


