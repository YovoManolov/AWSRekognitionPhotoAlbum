import json


def writeToJsonFile(dictToWrite: dict):
    a_file = open("backend/resources/json/labels_response.json", "w")
    json.dump(dictToWrite, a_file)
    a_file.close()


def readJson():
    jsonToRead = open("backend/resources/json/labels_response.json", "r")
    print(json.load(jsonToRead))
    jsonToRead.close()
