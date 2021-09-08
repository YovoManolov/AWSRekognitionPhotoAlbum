from flask import jsonify, request
from flask.helpers import make_response
from flask_mongoengine import MongoEngine
from flask import Flask
from mongoengine.fields import EmbeddedDocumentField
from callToAws.imageOperations import getAllImageDocuments
from mongo_constants import mongodb_passowrd, database_name

app = Flask(__name__)

DB_URI = ("mongodb+srv://admin:{}@clusterawsrekognitionph.q1bc1.mongodb.net/{}?retryWrites=true&w=majority".format(mongodb_passowrd, database_name))
app.config["MONGODB_HOST"] = DB_URI

db = MongoEngine()
db.init_app(app)

'''
{ "Image": "https://aws-rekognition-photo-album.s3.eu-central-1.amazonaws.com/resources/cars/1.png"
  "Labels": [
    { "Name": "Sports Car", "Confidence": 99.37098693847656 },
    { "Name": "Car", "Confidence": 99.37098693847656 },
    { "Name": "Vehicle", "Confidence": 99.37098693847656 },
    { "Name": "Transportation", "Confidence": 99.37098693847656 }
  ]
}
'''


class Label(db.EmbeddedDocument):
    name = db.StringField()
    confidence = db.FloatField()

    def toJson(self):
        return{
            "Name": self.name,
            "Confidence": self.confidence,
        }


class Image(db.Document):
    _id = db.StringField()
    image = db.StringField()
    labels = db.ListField(EmbeddedDocumentField(Label))

    def toJson(self):
        return{
            "_id": self._id,
            "Image": self.image,
            "Labels": self.labels
        }


@app.route('/')
def flask_mongodb_atlas():
    return "flask mongodb atlas!"


@app.route('/awsRecognitionPhotoAlbum/populateImages', methods=['POST'])
def populate_images():
    for newMongoImageJson in getAllImageDocuments():
        newMongoImageDoc = Image(image=newMongoImageJson['Image'],
                                 labels=newMongoImageJson['Labels'])
        newMongoImageDoc.save()


@app.route('/awsRecognitionPhotoAlbum/images', methods=['GET', 'POST'])
def api_images():
    if request.method == "GET":
        images = []
        for image in Image.objects:
            images.append(image)
        return make_response(jsonify(images), 200)
    elif request.method == "POST":
        # 1. Upload image to AWS s3 bucket

        # 2. Get image URL from s3

        # 3. Make request to AWS Rekognition to get the image labels
        # getLabels("aws-rekognition-photo-album", "resources/cars/1.png")
        # 4. Collect the data and write it to MongoDB

        # content = request.json
        # image = Image(image=content['Image'],
        #               name=content['Labels'])
        # image.save()
        return make_response("", 201)


@app.route('/awsRecognitionPhotoAlbum/images/<_id>', methods=['GET', 'PUT', 'DELETE'])
def api_each_image(_id):
    if request.method == "GET":
        image_obj = getImageById(_id)
        if image_obj:
            return make_response(jsonify(image_obj), 200)
        else:
            return make_response("", 404)
    elif request.method == "PUT":
        content = request.json
        updateImage(_id, content)
    elif request.method == "DELETE":
        deleteImage(_id)


def getImageById(_id: str):
    return Image.objects(_id=_id).first()


def updateImage(_id: str, content: any):
    image_obj = Image.objects(_id=_id).first()
    image_obj.update(Image=content['Image'], Labels=content['Labels'])
    return make_response("", 204)


def deleteImage(_id: str):
    image_obj = Image.objects(_id=_id).first()
    image_obj.delete()
    return make_response("", 204)


if __name__ == "__main__":
    app.run(port=8000)
