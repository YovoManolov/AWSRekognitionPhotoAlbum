import os
from bson.objectid import ObjectId
from flask import request
from flask.helpers import make_response
from flask.json import jsonify
from flask_mongoengine import MongoEngine
from bson.objectid import ObjectId
from flask import Flask
from callToAws.imageOperations import getAllImageDocumentsFromFile, getAllImageDocuments, deleteS3Object
from callToAws.imageOperations import upload_file, getImageDocumentByResourceKey, uploadBase64Image
from mongo_constants import mongodb_passowrd, database_name
from flask_cors import CORS, cross_origin
from mongoengine.fields import EmbeddedDocumentField, ListField

app = Flask(__name__)
CORS(app)

DB_URI = ("mongodb+srv://admin:{}@clusterawsrekognitionph.q1bc1.mongodb.net/{}?retryWrites=true&w=majority".format(mongodb_passowrd, database_name))
app.config["MONGODB_HOST"] = DB_URI
app.config['BUCKET'] = 'aws-rekognition-photo-album'

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
    _id = ObjectId
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


def createImage(newMongoImageJson: dict):
    newMongoImageDoc = Image(Image=newMongoImageJson['Image'],
                             Labels=newMongoImageJson['Labels'])
    newMongoImageDoc.save()


@app.route('/awsRekognitionPhotoAlbum/images', methods=['GET', 'POST'])
@cross_origin()
def api_images():
    if request.method == "GET":
        return retrieveAllImages()
    elif request.method == "POST":
        base64Image = request.form["base64Image"]
        fullFilePath = request.form["fullFilePath"]
        return uploadImage(base64Image, fullFilePath)


@app.route("/user/signup", methods=['GET'])
def signup():
    return


def retrieveAllImages():
    images = []
    for image in Image.objects:
        images.append(image)
    return make_response(jsonify(images), 200)


def uploadImage(base64Image: str, filePath: str):
    resource_key = getResourceKeyFromFilePath(filePath)
    if uploadBase64Image(base64Image, resource_key):
        newMongoImageJson = getImageDocumentByResourceKey(resource_key)
        createImage(newMongoImageJson)
        return make_response("", 204)
    else:
        return make_response("", 500)


@app.route('/awsRekognitionPhotoAlbum/uploaImageFromFilePath', methods=['POST'])
@cross_origin()
def uploaImageFromFilePath():
    filePath = request.form.get("filePath")
    resource_key = getResourceKeyFromFilePath(filePath)
    if upload_file(filePath, resource_key):
        newMongoImageJson = getImageDocumentByResourceKey(resource_key)
        createImage(newMongoImageJson)
        return make_response("", 204)
    else:
        return make_response("", 500)


def getResourceKeyFromFilePath(filePath: str):
    return 'resources/' + os.path.basename(filePath)


@app.route('/awsRekognitionPhotoAlbum/images/label/<labelToFind>', methods=['GET'])
@cross_origin()
def api_watch_images(labelToFind):
    images = Image.objects(Labels__Name__icontains=labelToFind)
    return make_response(jsonify(images), 200)


@app.route('/awsRekognitionPhotoAlbum/images/<_id>', methods=['GET'])
@cross_origin()
def api_each_image(_id):
    return getImageById(_id)


@app.route('/awsRekognitionPhotoAlbum/images/<fileKey>', methods=['DELETE'])
def api_delete(fileKey):
    image = Image.objects(Image__icontains=fileKey).first()
    resource_key = getResourceKeyFromFilePath(fileKey)
    deleteMongoImage(image.Image)
    deleteS3Object(resource_key, app)
    return make_response("", 200)


def getImageById(idOfImageToGet: str):
    image_obj = Image.objects(id=idOfImageToGet).first()
    if image_obj:
        return make_response(jsonify(image_obj), 200)
    else:
        return make_response("", 404)


def deleteMongoImage(fileKey: ObjectId):
    obj = Image.objects(Image__icontains=fileKey).first()
    obj.delete()


if __name__ == "__main__":
    app.run(port=8000)
