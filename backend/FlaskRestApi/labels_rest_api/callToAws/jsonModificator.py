from backend.FlaskRestApi.labels_rest_api.labels_api_mongo import lables
import json
import pprint

from requests.api import delete


def writeResponseToJsonFile(result: dict):
    a_file = open("backend/resources/json/labels_response.json", "r+")
    json.dump(result, a_file)
    a_file.close()


def removeUnessecceryInfoFromJson():
    read_file = open("backend/resources/json/labels_response.json", "r")
    jsonDictToModify = json.load(read_file)
    read_file.close()
    # jsonDictToModify = deleteElement(jsonDictToModify, "LabelModelVersion")
    # jsonDictToModify = deleteElement(jsonDictToModify, "ResponseMetadata")
    # jsonDictToModify = deleteElement(jsonDictToModify, "RetryAttempts")

    jsonDictToModify = del jsonDictToModify.lables.
    jsonDictToModify = deleteElement(jsonDictToModify, "Parents")
    fileWriteRef = open("backend/resources/json/labels_response.json", "w")
    json.dump(jsonDictToModify, fileWriteRef)
    fileWriteRef.close()
    readJson()


# def deleteElement(dataToModify: dict, label: str):
#     for element in dataToModify:
#         if isinstance(dataToModify.get(element), dict):
#             return deleteElement(dataToModify.get(element), label)
#         if isinstance(dataToModify.get(element), list):
#             return deleteElement(dataToModify.get(element), label)
#         elif(label in element):
#             del dataToModify[label]
#             return dataToModify
#     return dataToModify

    def deleteElement(dataToModify: dict, label: str):
        for key in dataToModify.keys:
            if key == label:
                del dataToModify[label]
                return dataToModify
            elif isinstance(dataToModify.get(key), list):
                deleteElement()
    return dataToModify
# https://stackoverflow.com/questions/15451290/remove-element-from-json-object


def openJson():
    return open("backend/resources/json/labels_response.json", "r+")


def readJson():
    jsonToRead = open("backend/resources/json/labels_response.json", "r")
    print(json.load(jsonToRead))
    jsonToRead.close()
