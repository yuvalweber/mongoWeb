#! /usr/bin/python
from pymongo import MongoClient
def report():
    members_info = {}
    client = MongoClient("root_mongo_1")
    db = client['admin']
    rs_info = db.command({'replSetGetStatus':1})
    rs_conf_info = db.command({'replSetGetConfig':1})
    members = rs_info['members']
    members_conf = rs_conf_info['config']['members']

    for i in range(len(members)):
        ip = members[i]['name'].encode('ascii')
        name = ip.decode().split(":")[0]
        state = members[i]['stateStr'].encode('ascii').decode().lower()
        health = members[i]['health']
        votes = members_conf[i]['votes']
        priority = members_conf[i]['priority']
        members_info[name] = {'state':state,'health':health,'votes':votes,'priority':priority}
    return members_info
