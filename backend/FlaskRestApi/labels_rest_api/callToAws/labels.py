from datetime import datetime
import boto3
from pprint import pprint
import imageDataExtractor

client = boto3.client('rekognition')

imgfilename = 'backend/resources/cars/1.png'

imgbytes = imageDataExtractor.get_image_from_filename(imgfilename)

result = client.detect_labels(Image={'Bytes': imgbytes}, MinConfidence=80)

pprint(datetime.now().time().strftime("%H:%M:%S"))
pprint(result)
