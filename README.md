# PhytoEZ - Plant Disease Detection by Image Classification

Plant diseases pose a significant threat to global food security, causing substantial crop losses annually. Accurate and timely detection of these diseases is crucial for effective management and preservation of agricultural yields. This project aims to improve the detection of plant diseases through the use of convolutional neural networks.

## Description of the project

We have used the [PlantVillage dataset]( https://www.kaggle.com/datasets/emmarex/plantdisease) for obtaining the images of the crops. We have trained our model for 14 types of plamts with 38 classes of diseases being covered. Further, the images have been augmented to account for various possiblilties like varying colours (RGB, greyscale), images taken at an angle.

For training the model on the dataset, we observed the performance of the pre-trained models of VGG 19 and used transfer learning by modifying the fully connected (FC) layers of the neural network.

We also hosted our image detection model on the localhost using React where in the user can check the condition of the plant by uploading an image of the same.
![Website](plant_disease_detection/src/components/constants/backgr.jpg = 250*250)

## Tech stack used

[ReactJs] <br />
[Tensorflow] <br />
[Keras] <br />

