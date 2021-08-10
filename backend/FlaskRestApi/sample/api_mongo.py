from flask import Flask, jsonify, request
from flask.ctx import RequestContext
from flask.helpers import make_response
from flask_mongoengine import MongoEngine, json
from api_constants import mongodb_passowrd, database_name
import urllib.request

app = Flask(__name__)

DB_URI = ("mongodb+srv://admin:{}@clusterawsrekognitionph.q1bc1.mongodb.net/{}?retryWrites=true&w=majority".format(mongodb_passowrd, database_name))
app.config["MONGODB_HOST"] = DB_URI


db = MongoEngine()
db.init_app(app)


class Book(db.Document):
    book_id = db.IntField()
    name = db.StringField()
    author = db.StringField()

    def toJson(self):
        return{
            "book_id": self.book_id,
            "name": self.name,
            "book_id": self.author
        }


# POST / api/db_populate -> Populates the db and returns 201 success code(empty repsonse body)

# GET / api/books -> Returns the details of all books(with code 200 success code)

# POST / api/books -> creates a new book and returns 201 success code(empty response body)

# GET / api/books/{book_id} -> Update author and name fields of book 3 (with 204 success code)

# DELETE / api/books/{book_id} -> Deletes book 3 (with 204 success code)

@app.route('/')
def flask_mongodb_atlas():
    return "flask mongodb atlas!"


@app.route('/api/db_populate', methods=['POST'])
def db_populate():
    book1 = Book(book_id=1, name="A Game of Thrones",
                 author="George RR Martin")
    book2 = Book(book_id=2, name="Lord of the Rings", author="JRR rolkien")
    book1.save()
    book2.save()
    return make_response('', 201)


@app.route('/api/books', methods=['GET', 'POST'])
def api_books():
    if request.method == "GET":
        books = []
        for book in Book.objects:
            books.append(book)
        return make_response(jsonify(books), 200)
    elif request.method == "POST":
        content = request.json
        book = Book(book_id=content['book_id'],
                    name=content['name'], author=content['author'])
        book.save()
        return make_response("", 201)


@app.route('/api/books/<book_id>', methods=['GET', 'PUT', 'DELETE'])
def api_each_book(book_id):
    if request.method == "GET":
        book_obj = Book.objects(book_id=book_id).first()
        if book_obj:
            return make_response(jsonify(book_obj), 200)
        else:
            return make_response("", 404)
    elif request.method == "PUT":
        content = request.json
        book_obj = Book.objects(book_id=book_id).first()
        book_obj.update(author=content['author'], name=content['name'])
        return make_response("", 204)
    elif request.method == "DELETE":
        book_obj = Book.objects(book_id=book_id).first()
        book_obj.delete()
        return make_response("", 204)


if __name__ == "__main__":
    app.run(port=8000)
