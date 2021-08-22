# AWSRekognitionPhotoAlbum

My Master's degree thesis

Actions done direclty through FROND END:

1. Image retrieval from S3
2. Image upload to S3

API 1: AWS Communication

After image uload I could press button to load images to Mongo:
Call getLabels from AWS rekognition for the uplaoded image (image url inside s3) and safe the labels inside Mongo.

What will be stored in MongoDB:

API 2: MongoDB communcation

GET /api/photos -> Returns the collection document for each photo (with code 200 success code):
the document contains:

1. Image reference from s3: for image loading in angular
2. Labels for visualization from angular:

POST /api/photo -> upload a new photo and returns 201(created) success code (empty response body)

- After image upload to S3, file reference should be returned.
- The file referece will be used to call AWS Rekognition for labels detection
- The result will be saved together with the file reference to new document inside the image collection in Mongo.

GET / api/photo/{object_book_id} -> getSinglePhotoByObjectId
Will load the image from S3 and the labels from Mongo

DELETE /api/books/{object_book_id} -> Deletes photo (with 204 success code)

- Will delete image in S3
- Will delete image document in Mongo
