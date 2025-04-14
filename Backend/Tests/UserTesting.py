import requests
testdata = {"username" : "robfust2",
  "email" : "emailTest@email.com",
  "password": "password2",
  "favorites": ["dream", "parse", "playing with friends"]
}
#figure out a testing suite for the users route. 
def checkUsers():
    response = requests("http://localhost:3001/User/update")