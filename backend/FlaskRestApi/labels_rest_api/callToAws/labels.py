from jsonUtils import writeToJson
from jsonModificator import extractOnlyLabelsFromAwsResponse
import boto3

# Download image from s3
# =======================================================================================
# s3 = boto3.client('s3', aws_access_key_id=awsAccessKeyId,
#                   aws_secret_access_key=awsSecretAccessKey)
# s3.download_file('aws-rekognition-photo-album', 'resources/cars/1.png',
#                  'D:/Github/AWSRekognitionPhotoAlbum/backend/FlaskRestApi/labels_rest_api/callToAws/1.png')

# =======================================================================================


rekognition_client = boto3.client('rekognition')
s3_client = boto3.client('s3')

# GetLabels from AWS Rekognition
# =========================================================

# awsResponseDict = rekognition_client.detect_labels(
#     Image={'S3Object': {'Bucket': 'aws-rekognition-photo-album',
#                         'Name': 'resources/cars/1.png'}},
#     MinConfidence=80, MaxLabels=4)

# extractOnlyLabelsFromAwsResponse(awsResponseDict)

getLabels("aws-rekognition-photo-album", "resources/cars/1.png")


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
# =========================================================


# bucket_name = 'aws-rekognition-photo-album'

# s3_resource = boto3.resource('s3')
# my_bucket = s3_resource.Bucket(bucket_name)
# for file in my_bucket.objects.all():
#     params = {'Bucket': bucket_name, 'Key': file.key}
#     url = s3_client.generate_presigned_url('get_object', params)
#     print(url)
