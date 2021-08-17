from jsonModificator import removeUnessecceryInfoFromJson, writeResponseToJsonFile
import boto3

import imageDataExtractor

client = boto3.client('rekognition')

imgfilename = 'backend/resources/cars/1.png'

imgbytes = imageDataExtractor.get_image_from_filename(imgfilename)

result = client.detect_labels(
    Image={'Bytes': imgbytes}, MinConfidence=80, MaxLabels=4)

writeResponseToJsonFile(result)
removeUnessecceryInfoFromJson()
'''
{'LabelModelVersion': '2.0',
 'Labels': [{'Confidence': 99.37098693847656,
             'Instances': [],
             'Name': 'Sports Car',
             'Parents': [{'Name': 'Car'},
                         {'Name': 'Vehicle'},
                         {'Name': 'Transportation'}]},
            {'Confidence': 99.37098693847656,
             'Instances': [{'BoundingBox': {'Height': 0.5231191515922546,
                                            'Left': 0.1231456995010376,
                                            'Top': 0.28275418281555176,
                                            'Width': 0.8040106892585754},
                            'Confidence': 99.2630615234375}],
             'Name': 'Car',
             'Parents': [{'Name': 'Vehicle'}, {'Name': 'Transportation'}]},
            {'Confidence': 99.37098693847656,
             'Instances': [],
             'Name': 'Vehicle',
             'Parents': [{'Name': 'Transportation'}]},
            {'Confidence': 99.37098693847656,
             'Instances': [],
             'Name': 'Transportation',
             'Parents': []},
            {'Confidence': 99.37098693847656,
             'Instances': [],
             'Name': 'Automobile',
             'Parents': [{'Name': 'Vehicle'}, {'Name': 'Transportation'}]},
            {'Confidence': 87.58354949951172,
             'Instances': [],
             'Name': 'Race Car',
             'Parents': [{'Name': 'Sports Car'},
                         {'Name': 'Car'},
                         {'Name': 'Vehicle'},
                         {'Name': 'Transportation'}]},
            {'Confidence': 86.85285949707031,
             'Instances': [],
             'Name': 'Coupe',
             'Parents': [{'Name': 'Sports Car'},
                         {'Name': 'Car'},
                         {'Name': 'Vehicle'},
                         {'Name': 'Transportation'}]}],
 'ResponseMetadata': {'HTTPHeaders': {'connection': 'keep-alive',
                                      'content-length': '1080',
                                      'content-type': 'application/x-amz-json-1.1',
                                      'date': 'Tue, 10 Aug 2021 21:38:38 GMT',
                                      'x-amzn-requestid': 'b9cd1bff-0969-48b4-9d44-e62804115072'},
                      'HTTPStatusCode': 200,
                      'RequestId': 'b9cd1bff-0969-48b4-9d44-e62804115072',
                      'RetryAttempts': 0}}
'''
