from jsonUtils import writeToJson
from jsonModificator import removeUnessecceryInfoFromJson
from aws_constants import awsAccessKeyId, awsSecretAccessKey
import boto3

# Download image from s3
# =======================================================================================
# s3 = boto3.client('s3', aws_access_key_id=awsAccessKeyId,
#                   aws_secret_access_key=awsSecretAccessKey)
# s3.download_file('aws-rekognition-photo-album', 'resources/cars/1.png',
#                  'D:/Github/AWSRekognitionPhotoAlbum/backend/FlaskRestApi/labels_rest_api/callToAws/1.png')

# =======================================================================================

client = boto3.client('rekognition')
awsResponse = client.detect_labels(
    Image={'S3Object': {'Bucket': 'aws-rekognition-photo-album',
                        'Name': 'resources/cars/1.png'}},
    MinConfidence=80, MaxLabels=4)

writeToJson(awsResponse)
removeUnessecceryInfoFromJson()
