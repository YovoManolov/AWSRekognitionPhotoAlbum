import logging
from botocore.exceptions import ClientError
from jsonModificator import extractOnlyLabelsFromAwsResponse
import boto3
import os

rekognition_client = boto3.client('rekognition')
s3_client = boto3.client('s3')
s3_resource = boto3.resource('s3')
bucket_name = 'aws-rekognition-photo-album'


def getLabels(bucketName: str, resourceName: str):
    awsResponseDict = rekognition_client.detect_labels(
        Image={
            'S3Object': {
                'Bucket': bucketName,
                'Name': resourceName
            }
        },
        MinConfidence=80,
        MaxLabels=4
    )
    return extractOnlyLabelsFromAwsResponse(awsResponseDict)


def getAllImages():
    my_bucket = s3_resource.Bucket(bucket_name)
    imageUrls = []
    for file in my_bucket.objects.all():
        params = {'Bucket': bucket_name, 'Key': file.key}
        url = s3_client.generate_presigned_url('get_object', params)
        imageUrls.append(url)
    return imageUrls


def upload_file(file_name, object_name=None):
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
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
