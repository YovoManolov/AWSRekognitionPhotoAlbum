import json
import logging
from botocore.exceptions import ClientError
import boto3
import base64
from callToAws.utils.jsonModificator import extractOnlyLabelsFromAwsResponse

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


def getImageDocumentByResourceKey(resourceKey: str, userEmail: str):
    object = s3_resource.Object(bucket_name, resourceKey)
    url = generateUrlFromBucketObject(object)
    return generateJsonFromUrl(url, object.key, userEmail)


def getAllImageDocumentsFromFile():  # For debug purposes
    with open("backend/FlaskRestApi/labels_rest_api/callToAws/labels_response.json") as f:
        data = json.loads(f.read())
        mongoImageDocument = []
        for item in data:
            mongoImageDocument.append(item)
        return mongoImageDocument


def generateUrlFromBucketObject(object: any):
    return "https://%s.s3.amazonaws.com/%s" % (bucket_name, object.key)


def generateJsonFromUrl(resourceUrl: str, resourceName: str, userEmail: str):
    mongoImageDoc = {"Image": resourceUrl,
                     "Labels": getLabels(resourceName).get("Labels"),
                     "User": userEmail}
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


def deleteS3Object(resource_key: str, app):
    try:
        s3_client.delete_objects(
            Bucket=app.config['BUCKET'],
            Delete={
                'Objects': [
                    {
                        'Key': resource_key
                    }
                ]
            }
        )
    except ClientError as e:
        logging.error(e)
        return False
    return True


def uploadBase64Image(image_base64: str, obj_name: str):
    try:
        image_base64 = image_base64.replace(
            "data:image/jpeg;base64,", "")
        image_base64 = image_base64.replace(
            "data:image/png;base64,", "")
        image_base64 = image_base64.rstrip(",")
        obj = s3_resource.Object(bucket_name, obj_name)
        obj.put(Body=base64.b64decode(image_base64))
    except ClientError as e:
        logging.error(e)
        return False
    return True
