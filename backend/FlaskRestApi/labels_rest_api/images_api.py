import os
from flask import jsonify, request
from flask.helpers import make_response
from flask_mongoengine import MongoEngine
from flask import Flask
from mongoengine.fields import EmbeddedDocumentField, ListField
from callToAws.imageOperations import getAllImageDocuments, getAllImageDocumentsFromFile, upload_file, getImageDocumentByResourceName
from mongo_constants import mongodb_passowrd, database_name
#from flask_cors import CORS

app = Flask(__name__)
# CORS(app)

DB_URI = ("mongodb+srv://admin:{}@clusterawsrekognitionph.q1bc1.mongodb.net/{}?retryWrites=true&w=majority".format(mongodb_passowrd, database_name))
app.config["MONGODB_HOST"] = DB_URI

db = MongoEngine()
db.init_app(app)


class Labels(db.EmbeddedDocument):
    Name = db.StringField()
    Confidence = db.FloatField()

    def toJson(self):
        return{
            "Name": self.Name,
            "Confidence": self.Confidence,
        }


class Image(db.Document):
    _id = db.StringField()
    Image = db.StringField()
    Labels = ListField(EmbeddedDocumentField(Labels))

    def toJson(self):
        return{
            "_id": self._id,
            "Image": self.Image,
            "Labels": Labels.toJson(self.Labels)
        }


@app.route('/')
def flask_mongodb_atlas():
    return "flask mongodb atlas!"

# for newMongoImageJson in getAllImageDocumentsFromFile():


@app.route('/awsRekognitionPhotoAlbum/populateImages', methods=['POST'])
def populate_images():
    for newMongoImageJson in getAllImageDocuments():
        createImage(newMongoImageJson)


@app.route('/awsRekognitionPhotoAlbum/images', methods=['GET', 'POST'])
def api_images():
    if request.method == "GET":
        return retrieveAllImages()
    elif request.method == "POST":
        filePath = request.form.get("filePath")
        object_name = 'resources/' + os.path.basename(filePath)
        if upload_file(filePath, object_name):
            newMongoImageJson = getImageDocumentByResourceName(object_name)
            createImage(newMongoImageJson)
            return make_response("", 204)
        else:
            return make_response("", 500)


@app.route('/awsRekognitionPhotoAlbum/images/label/<labelToFind>', methods=['GET'])
def api_watch_images(labelToFind):
    if request.method == "GET":
        images = []
        for image in Image.objects:
            if image.objects(Labels__name__contains=labelToFind):
                images.append(image)
        return make_response(jsonify(images), 200)


# @app.route('/awsRekognitionPhotoAlbum/images/<_id>', methods=['GET', 'PUT', 'DELETE'])
# def api_each_image(_id):
#     if request.method == "GET":
#         return getImageById(_id)
#     elif request.method == "PUT":
#         content = request.json
#         return updateImage(_id, content)
#     elif request.method == "DELETE":
#         return deleteImage(_id)


def retrieveAllImages():
    images = []
    for image in Image.objects:
        images.append(image)
    return make_response(jsonify(images), 200)


def createImage(newMongoImageJson: dict):
    newMongoImageDoc = Image(Image=newMongoImageJson['Image'],
                             Labels=newMongoImageJson['Labels'])
    newMongoImageDoc.save()


def getImageById(_id: str):
    image_obj = Image.objects(_id=_id).first()
    if image_obj:
        return make_response(jsonify(image_obj), 200)
    else:
        return make_response("", 404)


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
