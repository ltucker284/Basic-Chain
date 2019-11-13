import datetime
import random
import hashlib
from collections import OrderedDict
# What should a voter instance have?
#voter_id = random.randrange(1, 10)

# What should a vote instance have?
# vote_number =
# timestamp = datetime.now()
# candidate_hash = 

# def generate_candiate():
#     candidate_one = 'Candidate_one'
#     candidate_two = 'Candidate_two'

#     candidate_one = hashlib.sha256(candidate_one.encode('utf-8'))
#     print(candidate_one.hexdigest())

#     candidate_two = hashlib.sha256(candidate_two.encode('utf-8'))
#     print(candidate_two.hexdigest())


def create_voter():
    id_list = [1,2,3,4,5,6,7,8,9,10]
    random.shuffle(id_list)

    for voter_id in id_list:
        return voter_id

def create_vote(voter_id):
    vote = {}
    candidate_chosen = random.randrange(1,2)

    if candidate_chosen == 1:
        candidate_chosen = 'Candidate_one'
        vote[voter_id] = candidate_chosen
    else:
        candidate_chosen = 'Candidate_two'
        vote[voter_id] = candidate_chosen
    
    print(vote)

if __name__ == "__main__":
    # generate_candiate()
    voter_id = create_voter()
    create_vote(voter_id)

