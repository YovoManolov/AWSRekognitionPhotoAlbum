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
