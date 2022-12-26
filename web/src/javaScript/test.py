def createFile():
    file = open("test.txt", "w")
    file.write("Hello World!")
    file.close()
    print("File created!")

# Path: web\src\javaScript\test.py
def readFile():
    file = open("test.txt", "r")
    print(file.read())
    file.close()

createFile()