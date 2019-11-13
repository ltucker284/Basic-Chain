#######################################
# The following class was cloned from the following repo: https://github.com/Concerned-HumanDev/Simple-Merkle-Tree-in-Python.git
# All the credit for creating this Merkle Tree example goes to the owner of the repo: Jae Duk Seo
# Code has been updated to Python 3. 
#######################################

import hashlib
from collections import OrderedDict

class merkle_tree:

    def __init__(self, list1=None):
        self.list1 = list1
        self.past_transaction = OrderedDict()

    def create_tree(self):
        list1 = self.list1
        past_transaction = self.past_transaction
        temp_transaction = []

        for index in range(0, len(list1), 2):
            current_index = list1[index]
            print("Current Index is: ", current_index)

            if index+1 != len(list1):
                current_right_index = (list1[index+1]).encode('utf-8')
                print("Current Right Index is: ", current_right_index)
            else:
                current_right_index = ''
            
            current_hash = hashlib.sha256(current_index.encode('utf-8'))
            print("Current Index {}: HASH = {}".format(current_index, current_hash.hexdigest()))

            if current_right_index != '':
                current_right_hash = hashlib.sha256(current_right_index)

            past_transaction[list1[index]] = current_hash.hexdigest()
            print("Current Contents of Past Transaction: ", past_transaction)

            if current_right_index != '':
                past_transaction[list1[index+1]] = current_right_hash.hexdigest()
            
            if current_right_index != '':
                temp_transaction.append(current_hash.hexdigest() + current_right_hash.hexdigest())
                print("Temp Transaction:" ,temp_transaction)
            else:
                temp_transaction.append(current_hash.hexdigest())
                print(temp_transaction)
        
        if len(list1) != 1:
            self.list1 = temp_transaction
            self.past_transaction = past_transaction
            self.create_tree()
    
    def Get_past_transaction(self):
        return self.past_transaction
    
    def Get_root_leaf(self):
        last_key = list(self.past_transaction.keys())[-1]
        return self.past_transaction[last_key]

if __name__ == "__main__":

    Merk_tree = merkle_tree()
    transaction = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    Merk_tree.list1 = transaction
    Merk_tree.create_tree()
    
    print("Past Transaction: ", Merk_tree.Get_past_transaction())
    print("Final root of the tree: ", Merk_tree.Get_root_leaf())

