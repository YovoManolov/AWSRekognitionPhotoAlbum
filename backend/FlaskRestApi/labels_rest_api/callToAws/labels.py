from jsonModificator import removeUnessecceryInfoFromJson
import boto3
import imageDataExtractor

# client = boto3.client('rekognition')

# imgFileName = 'backend/resources/cars/1.png'
# imgBytes = imageDataExtractor.get_image_from_filename(imgFileName)

# awsResponse = client.detect_labels(
#     Image={'Bytes': imgBytes}, MinConfidence=80, MaxLabels=4)

# writeToJsonFile(result)
removeUnessecceryInfoFromJson()
