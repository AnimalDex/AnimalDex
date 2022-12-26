import pandas as pd
import numpy as np
import os
from os import listdir
import csv
import tensorflow as tf


def get_all_images(path):
  return [os.path.join(path, image) for image in listdir(path)]


def load_model(): 
  model = tf.keras.models.load_model('model_ad.h5')
  model.summary()
  return model


def prediction(model, image):
  img = tf.keras.preprocessing.image.load_img(image, target_size=(100, 100))
  img_array = tf.keras.preprocessing.image.img_to_array(img)
  img_array = tf.expand_dims(img_array, 0) # Create a batch
  predictions = model.predict(img_array, verbose=1)
  print(predictions)
  score = tf.nn.softmax(predictions[0])
  print(score)
  show_three_best(score)
  

def show_three_best(score):
  razas_nombre = ['African_hunting_dog', 'Mexican_hairless', 'dhole', 'dingo']
  razas_porcentaje = score.numpy()

  resultado_nombre = []
  resultado_porcentaje = []
  for i in range(3):
    maximo = max(razas_porcentaje)
    indice = np.where(razas_porcentaje == maximo)
    resultado_nombre.append(razas_nombre[indice[0][0]])
    resultado_porcentaje.append(razas_porcentaje[indice[0][0]])
    razas_porcentaje[indice[0][0]] = 0
  print(resultado_nombre, resultado_porcentaje)
  write_output(resultado_nombre, resultado_porcentaje)


def write_output(resultado_nombre, resultado_porcentaje):
  with open('output.csv', 'w', newline='') as csvfile:
      cabecera = ['Animal', 'Porcentaje']
      writer = csv.DictWriter(csvfile, fieldnames=cabecera)
      writer.writeheader()
      for i in range(3):
        writer.writerow({cabecera[0]: resultado_nombre[i], cabecera[1]: str(resultado_porcentaje[i].round(2))})


def delete_image(image):
  os.remove(image)


def main():
  print(get_all_images('images'))
  images = get_all_images('images')
  model = load_model()

  for image in images:
    print(image)
    prediction(model, image)
    # delete_image(image)



if __name__ == '__main__':
  main()
