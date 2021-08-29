import json


def writeToJson(dictToWrite: dict):
    a_file = open(
        "backend/FlaskRestApi/labels_rest_api/callToAws/labels_response.json", "w")
    json.dump(dictToWrite, a_file)
    a_file.close()


def loadDataIntoDictFromFile():
    read_file = open("backend/resources/json/labels_response.json", "r")
    jsonDictToModify = json.load(read_file)
    read_file.close()
    return jsonDictToModify


def readJson():
    jsonToRead = open(
        "backend/FlaskRestApi/labels_rest_api/callToAws/labels_response.json", "r")
    print(json.load(jsonToRead))
    jsonToRead.close()
