from flask import jsonify


class User:
    def signup(self):
        user = {
            "_id": "",
            "name": "",
            "email": "",
            "password": ""
        }

        return jsonify(user)
