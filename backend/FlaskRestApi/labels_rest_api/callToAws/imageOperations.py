import json
import logging
from botocore.exceptions import ClientError
import boto3
import os

from callToAws.utils.jsonModificator import extractOnlyLabelsFromAwsResponse
from callToAws.utils.jsonUtils import writeToJson

rekognition_client = boto3.client('rekognition')
s3_client = boto3.client('s3')
s3_resource = boto3.resource('s3')
bucket_name = 'aws-rekognition-photo-album'

# https://aws-rekognition-photo-album.s3.eu-central-1.amazonaws.com/resources/cars/1.png
# getLabels("aws-rekognition-photo-album", "resources/cars/1.png")
# ================================================================
# {"Image": "https://aws-rekognition-photo-album.s3.eu-central-1.amazonaws.com/resources/cars/1.png"
#  "Labels": [
#      {"Name": "Sports Car", "Confidence": 99.37098693847656},
#      {"Name": "Car", "Confidence": 99.37098693847656},
#      {"Name": "Vehicle", "Confidence": 99.37098693847656},
#      {"Name": "Transportation", "Confidence": 99.37098693847656}
#   ]
#  }
# ================================================================


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
    params = {'Bucket': bucket_name, 'Key': object.key}
    return s3_client.generate_presigned_url('get_object', params)


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


# Download image from s3
# =======================================================================================
# s3 = boto3.client('s3', aws_access_key_id=awsAccessKeyId,
#                   aws_secret_access_key=awsSecretAccessKey)
# s3.download_file('aws-rekognition-photo-album',
#                   'resources/cars/1.png',
#                  'D:/Github/AWSRekognitionPhotoAlbum/backend/FlaskRestApi/labels_rest_api/callToAws/1.png')

# =======================================================================================
