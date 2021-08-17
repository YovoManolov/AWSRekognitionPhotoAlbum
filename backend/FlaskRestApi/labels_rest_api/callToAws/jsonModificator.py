import json
import pprint


def writeResponseToJsonFile(result: dict):
    a_file = openJson()
    json.dump(result, a_file)
    a_file.close()


def removeUnessecceryInfoFromJson():
    savedJsonResponse = openJson()
    jsonDictToModify = json.load(savedJsonResponse)

    jsonDictToModify = deleteElement(jsonDictToModify, "LabelModelVersion")
    # dataToModify = deleteElement(dataToModify, "Instaces")
    # dataToModify = deleteElement(dataToModify, "Parents")

    json.dump(jsonDictToModify, savedJsonResponse)
    savedJsonResponse.close()
    readJson()


def deleteElement(dataToModify: dict, element: str):
    for element in dataToModify:
        if isinstance(element, dict):
            return deleteElement(element, element)
        elif(element in element):
            del element[element]
    return dataToModify


def openJson():
    return open("backend/resources/json/labels_response.json", "w")


def readJson():
    jsonToRead = open("backend/resources/json/labels_response.json", "r")
    pprint(json.load(jsonToRead))
    jsonToRead.close()
