import json


def writeToJson(dictToWrite: dict):
    a_file = open(
        "backend/FlaskRestApi/labels_rest_api/callToAws/labels_response.json", "w")
    json.dump(dictToWrite, a_file)
    a_file.close()


def readJson():
    jsonToRead = open(
        "backend/FlaskRestApi/labels_rest_api/callToAws/labels_response.json", "r")
    # print(json.load(jsonToRead))  # load json to dict
    jsonToRead.close()
