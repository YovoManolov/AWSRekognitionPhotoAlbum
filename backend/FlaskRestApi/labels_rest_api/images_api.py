import os
from flask import jsonify, request
from flask.helpers import make_response
from flask_mongoengine import MongoEngine
from flask import Flask
from mongoengine.base.fields import ObjectIdField
from mongoengine.fields import EmbeddedDocumentField, ListField
from mongoengine.queryset.queryset import QuerySet
from callToAws.imageOperations import getAllImageDocumentsFromFile, getAllImageDocuments, upload_file, getImageDocumentByResourceName, uploadBase64Image
from mongo_constants import mongodb_passowrd, database_name
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

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
    _id = db.StringField
    Image = db.StringField()
    Labels = ListField(EmbeddedDocumentField(Labels))

    def toJson(self):
        return{
            "_id": self._id,
            "Image": self.Image,
            "Labels": Labels.toJson(self.Labels)
        }


@app.route('/')
@cross_origin()
def flask_mongodb_atlas():
    return "flask mongodb atlas!"


@app.route('/awsRekognitionPhotoAlbum/populateImages', methods=['POST'])
def populate_images():
    for newMongoImageJson in getAllImageDocuments():
        createImage(newMongoImageJson)


# @app.route('/awsRekognitionPhotoAlbum/images', methods=['GET', 'POST'])
# @cross_origin()
# def api_images():
#     if request.method == "GET":
#         return retrieveAllImages()
#     elif request.method == "POST":
#         filePath = request.form.get("filePath")
#         object_name = 'resources/' + os.path.basename(filePath)
#         if upload_file(filePath, object_name):
#             newMongoImageJson = getImageDocumentByResourceName(object_name)
#             createImage(newMongoImageJson)
#             return make_response("", 204)
#         else:
#             return make_response("", 500)
#     else:
#         return make_response("", 500)


@app.route('/awsRekognitionPhotoAlbum/images', methods=['GET', 'POST'])
@cross_origin()
def api_images():
    if request.method == "GET":
        return retrieveAllImages()
    elif request.method == "POST":
        base64Image = request.form.get("base64Image")
        fullFilePath = request.form.get("fullFilePath")
        fileNameWithExtention = os.path.basename(fullFilePath)
        object_name = 'resources/' + fileNameWithExtention
        if uploadBase64Image(base64Image, object_name):
            newMongoImageJson = getImageDocumentByResourceName(object_name)
            createImage(newMongoImageJson)
            return make_response("", 204)
        else:
            return make_response("", 500)


@app.route('/awsRekognitionPhotoAlbum/images/label/<labelToFind>', methods=['GET'])
@cross_origin()
def api_watch_images(labelToFind):
    if request.method == "GET":
        images = Image.objects(Labels__Name__icontains=labelToFind)
        return make_response(jsonify(images), 200)


@app.route('/awsRekognitionPhotoAlbum/images/<_id>', methods=['GET', 'DELETE'])
@cross_origin()
def api_each_image(_id):
    if request.method == "GET":
        return getImageById(_id)
    elif request.method == "DELETE":
        return deleteImage(_id)


def retrieveAllImages():
    images = []
    for image in Image.objects:
        images.append(image)
    return make_response(jsonify(images), 200)


def createImage(newMongoImageJson: dict):
    newMongoImageDoc = Image(Image=newMongoImageJson['Image'],
                             Labels=newMongoImageJson['Labels'])
    newMongoImageDoc.save()


def getImageById(idOfImageToGet: str):
    image_obj = Image.objects(id=idOfImageToGet).first()
    if image_obj:
        return make_response(jsonify(image_obj), 200)
    else:
        return make_response("", 404)


def deleteImage(_id: str):
    idToDelete = ObjectId(_id)
    obj = Image.objects(_id=idToDelete).first()
    obj.delete()
    return make_response("", 200)


if __name__ == "__main__":
    app.run(port=8000)
