import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import * as tf from '@tensorflow/tfjs';
import background from "./constants/backgr.jpg"
import { Fragment } from "react";
// import *as gf from "../results/results (1)_json/model.json"
function HomeFive() {
  const [model, setModel] = useState(null);
  const [model1, setModel1] = useState(null);
  const [model2, setModel2] = useState(null);
  const [model3, setModel3] = useState(null);
  const [model4, setModel4] = useState(null);
  const [model5, setModel5] = useState(null);

  const [result, setResult] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  
  useEffect(() => {
    async function loadModel() {
     //const loadedModel = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/results_secondtry/model.json');// 3 and 70 30 split working
    // const loadedModel = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/5layercnnjson.json');//avanish ne bheja not working
    const loadedModel5 = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/avan_4_results/model.json');//avan_4_results working need to change size to 128,128
    const loadedModel4 = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/avan_5_results/model.json');//avan_5_results working need to change size to 128,128

    const loadedModel3 = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/avan_3_results/model.json');//avan_3_results working need to change size to 128,128
   const loadedModel2 = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/avan_2_results/model.json');//avan_2_results working need to change size to 128,128
   const loadedModel1 = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/avan_1_results/model.json');//avan_1_results working need to change size to 128,128

      const loadedModel = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/results%20(1)_json/model.json');//1 and 80 20 split working
      //const loadedModel = await tf.loadGraphModel('https://raw.githubusercontent.com/aaditya-jalan/plannt_disease_final/main/model_json/model.json');
      setModel(loadedModel);
      setModel1(loadedModel1);
      setModel2(loadedModel2);
      setModel3(loadedModel3);
      setModel4(loadedModel4);
      setModel5(loadedModel5);


    }
    loadModel();
  }, []);

  function fileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function onSubmit() {
    if (!model||!model1||!model2||!model3||!model4||!model5) {
      console.error('Model not loaded yet.');
      if(!model){
        console.error("model 1");
      }
      if(!model1){
        console.error("model 1");
      }
      if(!model2){
        console.error("model 2");
      }if(!model3){
        console.error("model 3");
      }
      if(!model4){
        console.error("model 4");
      }if(!model5){
        console.error("model 5");
      }
      return;
    }
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const image = await preprocessImage(selectedFile);
    const image2= await preprocessImage2(selectedFile);
    const prediction = await predict(image,image2);
   // console.log(prediction);
    // writing the code to get the labels out of predicted data
    var probabilities=[];
    for(var i=0;i<38;i++){
      probabilities[i]=prediction[i];
    }
    // console.log("my prororo");
    // console.log(probabilities);
    function findLabelWithMaxProbability(probabilities, labels) {
      // Convert probabilities from scientific notation to floating-point numbers
      const probabilitiesFloat =[];
      for(var i=0;i<38;i++){
        probabilitiesFloat[i]=(probabilities[i]);
      }
      //  probabilities.map(probability => parseFloat(probability));
        //console.log(probabilitiesFloat);
      // Find the index of the maximum probability
      var maxProbabilityIndex = 0;
      var maxe=probabilitiesFloat[0];
     // console.log(probabilitiesFloat);
      //console.log(typeof probabilitiesFloat[2])
      // probabilitiesFloat.indexOf(Math.max(...probabilitiesFloat));
      for(var j=1;j<38;j++){
        // console.log("haha");
        if(maxe<probabilitiesFloat[j]){
          maxProbabilityIndex=j;
          // console.log("hehe");
          maxe=probabilitiesFloat[j];
        }
      }
  
      // Get the label with the greatest probability
      const labelWithMaxProbability = labels[maxProbabilityIndex];
  
      return labelWithMaxProbability;
  }
   //const labels=['Tomato__Late_blight', 'Tomato_healthy', 'Grape_healthy', 'Orange_Haunglongbing(Citrus_greening)', 'Soybean__healthy', 'Squash_Powdery_mildew', 'Potato_healthy', 'Corn(maize)__Northern_Leaf_Blight', 'Tomato_Early_blight', 'Tomato_Septoria_leaf_spot', 'Corn(maize)__Cercospora_leaf_spot Gray_leaf_spot', 'Strawberry_Leaf_scorch', 'Peach_healthy', 'Apple_Apple_scab', 'Tomato_Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_Bacterial_spot', 'Apple_Black_rot', 'Blueberry_healthy', 'Cherry(including_sour)__Powdery_mildew', 'Peach_Bacterial_spot', 'Apple_Cedar_apple_rust', 'Tomato_Target_Spot', 'Pepper,_bell_healthy', 'Grape_Leaf_blight(Isariopsis_Leaf_Spot)', 'Potato__Late_blight', 'Tomato_Tomato_mosaic_virus', 'Strawberry_healthy', 'Apple_healthy', 'Grape_Black_rot', 'Potato_Early_blight', 'Cherry(including_sour)__healthy', 'Corn(maize)__Common_rust', 'Grape__Esca(Black_Measles)', 'Raspberry__healthy', 'Tomato_Leaf_Mold', 'Tomato_Spider_mites Two-spotted_spider_mite', 'Pepper,_bell_Bacterial_spot', 'Corn(maize)___healthy'];
    const labels = [
      "Apple_scab",
      "Apple_black_rot",
      "Apple_cedar_apple_rust",
      "Apple_healthy",
      "Blueberry_healthy",
      "Cherry_powdery_mildew",
      "Cherry_healthy",
      "Corn_gray_leaf_spot",
      "Corn_common_rust",
      "Corn_northern_leaf_blight",
      "Corn_healthy",
      "Grape_black_rot",
      "Grape_black_measles",
      "Grape_leaf_blight",
      "Grape_healthy",
      "Orange_haunglongbing",
      "Peach_bacterial_spot",
      "Peach_healthy",
      "Pepper_bacterial_spot",
      "Pepper_healthy",
      "Potato_early_blight",
      "Potato_healthy",
      "Potato_late_blight",
      "Raspberry_healthy",
      "Soybean_healthy",
      "Squash_powdery_mildew",
      "Strawberry_healthy",
      "Strawberry_leaf_scorch",
      "Tomato_bacterial_spot",
      "Tomato_early_blight",
      "Tomato_healthy",
      "Tomato_late_blight",
      "Tomato_leaf_mold",
      "Tomato_septoria_leaf_spot",
      "Tomato_spider_mites_two-spotted_spider_mite",
      "Tomato_target_spot",
      "Tomato_mosaic_virus",
      "Tomato_yellow_leaf_curl_virus"
  ];
  const labelWithMaxProbability = findLabelWithMaxProbability(probabilities, labels);
    setResult(labelWithMaxProbability);
  }

  async function preprocessImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat();
          const offset = tf.scalar(223);
          const normalized = tensor.div(offset);
          resolve(normalized.expandDims());
        };
        img.onerror = (error) => reject(error);
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
  // writing different function fot type 2
  async function preprocessImage2(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([128, 128]).toFloat();
          const offset = tf.scalar(223);
          const normalized = tensor.div(offset);
          resolve(normalized.expandDims());
        };
        img.onerror = (error) => reject(error);
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function predict(imageTensor,imageTensor2) {
    const predictions = await model.predict(imageTensor).data();
    console.log("1 done");
    const predictions1 = await model1.predict(imageTensor2).data();
    console.log("1 done");

    const predictions2 = await model2.predict(imageTensor2).data();
    console.log("1 done");

    const predictions3 = await model3.predict(imageTensor2).data();
    console.log("1 done");

    const predictions4 = await model4.predict(imageTensor2).data();
    console.log("1 done");

    const predictions5 = await model5.predict(imageTensor2).data();
    console.log("1 done");

    var probabilities=[];
    var probabilities1=[];
    var probabilities2=[];
    var probabilities3=[];
    var probabilities4=[];
    var probabilities5=[];
    for(var i=0;i<38;i++){
      probabilities[i]=parseFloat(predictions[i]);
      probabilities1[i]=parseFloat(predictions1[i]);
      probabilities2[i]=parseFloat(predictions2[i]);
      probabilities3[i]=parseFloat(predictions3[i]);
      probabilities4[i]=parseFloat(predictions4[i]);
      probabilities5[i]=parseFloat(predictions5[i]);  
    }
    // Logic to process predictions
    for(var u=0;u<38;u++){
      probabilities[u]=(probabilities[u]+probabilities1[u]+probabilities2[u]+probabilities3[u]+probabilities4[u]+probabilities5[u])/6;
    }
    return probabilities;
  }

  // const sectionStyle = {
  //   width: "100%",
  //   height: "100vh",
  //   backgroundImage: `url(${background})`,
  //   backgroundSize: "cover",
  //   margin: "0",
  //   padding: "0",
  //   display: "flex",
  //   flexDirection: 'column',
  //   alignItems: "center",
  //   justifyContent: "center",
  // };

  // const centerDivStyle = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '60px'
  // };

  return (
    <div style={{ 
      width: "100%", 
      height: "100vh", 
      backgroundImage: `url(${background})`, 
      backgroundSize: "cover", 
      margin: "0", 
      padding: "0", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center" 
      }}>
        <h1 style={{ fontSize: '5rem', color: 'white', marginBottom: '2rem' }}><b>Get your plant tested</b></h1>
        <div style={{ marginBottom: '2rem' }}>
          <input type="file" accept="image/*" onChange={fileChange} style={{ color: 'white' }}></input>
          <Button onClick={onSubmit} variant="contained" style={{ marginLeft: '.5rem', backgroundColor: "#341a0e" }}>Submit</Button>
        </div>
        {result && (
          <Fragment>
            <h2 style={{ color: 'white',fontSize: '3rem' }}>Prediction Result:</h2>
            <p style={{ color: 'white', textAlign: 'center',fontSize: '2rem' }}>{result}</p>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default HomeFive;
