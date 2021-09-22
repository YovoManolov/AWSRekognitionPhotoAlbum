import json
import logging
from botocore.exceptions import ClientError
import boto3

from callToAws.utils.jsonModificator import extractOnlyLabelsFromAwsResponse
from callToAws.utils.jsonUtils import writeToJson

rekognition_client = boto3.client('rekognition')
s3_client = boto3.client('s3')
s3_resource = boto3.resource('s3')
bucket_name = 'aws-rekognition-photo-album'


def getAllImageDocuments():
    my_bucket = s3_resource.Bucket(bucket_name)
    mongoImageDocuments = []
    for object in my_bucket.objects.all():
        url = generateUrlFromBucketObject(object)
        jsonDict = generateJsonFromUrl(url, object.key)
        mongoImageDocuments.append(jsonDict)
    return mongoImageDocuments


def getImageDocumentByResourceName(resourceKey: str):
    object = s3_resource.Object(bucket_name, resourceKey)
    url = generateUrlFromBucketObject(object)
    return generateJsonFromUrl(url, object.key)


def getAllImageDocumentsFromFile():  # For debug purposes
    with open("backend/FlaskRestApi/labels_rest_api/callToAws/labels_response.json") as f:
        data = json.loads(f.read())
        mongoImageDocument = []
        for item in data:
            mongoImageDocument.append(item)
        return mongoImageDocument


def generateUrlFromBucketObject(object: any):
    return "https://%s.s3.amazonaws.com/%s" % (bucket_name, object.key)


def generateJsonFromUrl(resourceUrl: str, resourceName):
    mongoImageDoc = {"Image": resourceUrl,
                     "Labels": getLabels(resourceName).get("Labels")}
    return mongoImageDoc


def getLabels(resourceName: str):
    awsResponseDict = rekognition_client.detect_labels(
        Image={
            'S3Object': {
                'Bucket': bucket_name,
                'Name': resourceName
            }
        },
        MinConfidence=80,
        MaxLabels=4
    )
    return extractOnlyLabelsFromAwsResponse(awsResponseDict)


def upload_file(file_name, object_name=None):
    try:
        s3_client.upload_file(file_name, bucket_name, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True
