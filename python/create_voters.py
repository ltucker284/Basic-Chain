import random
import hashlib
import time
# What should a voter instance have?
#voter_id = random.randrange(1, 10)

# What should a vote instance have?
# vote_number =
# timestamp = datetime.now()
# candidate_hash = 

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
    temp_vote = []
    vote_number = 0
    start_timestamp = time.mktime(time.strptime('11/03/2020-08:00AM', '%m/%d/%Y-%I:%M%p'))
    end_timestamp = time.mktime(time.strptime('11/03/2020-08:00PM', '%m/%d/%Y-%I:%M%p'))
    

    for i in range(0, len(id_list)):
        candidate_chosen = random.randint(1,2)
        vote_cast_time = time.strftime('%m/%d/%Y-%I:%M%p', time.localtime(random.randrange(start_timestamp,end_timestamp)))
        vote_number += 1
        if candidate_chosen == 1:
            #vote[id_list[i]] = vote_number, candidate_hash[0], vote_cast_time
            temp_vote.append([id_list[i], vote_number, candidate_hash[0], vote_cast_time])
        else:
            #vote[id_list[i]] = vote_number, candidate_hash[1], vote_cast_time
            temp_vote.append([id_list[i], vote_number, candidate_hash[1], vote_cast_time])
    
    print(temp_vote)

if __name__ == "__main__":
    candidate_hash = generate_candiate_hash()
    id_list = create_id()
    create_vote(id_list, candidate_hash)



