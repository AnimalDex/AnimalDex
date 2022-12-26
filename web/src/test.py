import os

def createFile():
    file = open("test.txt", "w")
    file.write("Hello World!")
    file.close()

createFile()