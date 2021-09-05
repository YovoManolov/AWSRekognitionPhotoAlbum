def extractOnlyLabelsFromAwsResponse(awsResponseDict: dict):
    return deleteUnnecceryLabels(awsResponseDict)


def deleteUnnecceryLabels(jsonDictToModify: dict):
    jsonDictToModify = deleteElement(jsonDictToModify, "LabelModelVersion")
    jsonDictToModify = deleteElement(jsonDictToModify, "ResponseMetadata")
    jsonDictToModify = deleteElement(jsonDictToModify, "Instances")
    jsonDictToModify = deleteElement(jsonDictToModify, "Parents")
    print(jsonDictToModify)
    return jsonDictToModify


def deleteElement(dataToModify: dict, label: str):
    for element in list(dataToModify):
        if isinstance(dataToModify, str):
            break
        elif label in element:
            del dataToModify[label]
            break
        elif isinstance(dataToModify.get(element), dict):
            return deleteElement(element, label)
        elif isinstance(dataToModify.get(element), list):
            for val in dataToModify.get(element):
                deleteElement(val, label)
    return dataToModify
