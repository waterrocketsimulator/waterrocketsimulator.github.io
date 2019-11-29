var stagesNum = document.getElementById("numberOfStages");
var stagesNumOutput = document.getElementById("numberOfStagesValue");
stagesNumOutput.innerHTML = stagesNum.value;

stagesNum.oninput = function(){
	stagesNumOutput.innerHTML = stagesNum.value;
	hideStages();
	launch();
}


//stage 1
var vesselCapacity = document.getElementById("vesselCapacity");
var vesselCapacityOutput = document.getElementById("vesselCapacityValue");
vesselCapacityOutput.value = vesselCapacity.value;

vesselCapacity.oninput = function(){
	vesselCapacityOutput.value = vesselCapacity.value;
	waterPercentage.innerHTML =  Math.round(waterCapacity.value / vesselCapacity.value * 100);
  launch(); 
}

vesselCapacityOutput.onchange = function(){
	vesselCapacity.value = vesselCapacityOutput.value;
	waterPercentage.innerHTML =  Math.round(waterCapacity.value / vesselCapacity.value * 100);
	launch();
}

var waterCapacity = document.getElementById("waterCapacity");
var waterCapacityOutput = document.getElementById("waterCapacityValue");
waterCapacityOutput.value = waterCapacity.value;
var waterPercentage = document.getElementById("waterPercentage");
waterPercentage.innerHTML =  Math.round(waterCapacity.value / vesselCapacity.value * 100);

waterCapacity.oninput = function(){
	waterCapacityOutput.value = waterCapacity.value;
  waterPercentage.innerHTML =  Math.round(waterCapacity.value / vesselCapacity.value * 100);
	launch(); 
}

waterCapacityOutput.onchange = function(){
	waterCapacity.value = waterCapacityOutput.value;
	waterPercentage.innerHTML =  Math.round(waterCapacity.value / vesselCapacity.value * 100);
	launch();
}

var rocketDryMass = document.getElementById("rocketDryMass");
var rocketDryMassOutput = document.getElementById("rocketDryMassValue");
rocketDryMassOutput.value = rocketDryMass.value;

rocketDryMass.oninput = function(){
	rocketDryMassOutput.value = rocketDryMass.value;
  launch(); 
}

rocketDryMassOutput.onchange = function(){
	rocketDryMass.value = rocketDryMassOutput.value;
	launch();
}

var pressure = document.getElementById("pressure");
var pressureOutput = document.getElementById("pressureValue");
pressureOutput.value = pressure.value;

pressure.oninput = function(){
	pressureOutput.value = pressure.value;
  launch(); 
}

pressureOutput.onchange = function(){
	pressure.value = pressureOutput.value;
  launch(); 
}

var dragCoefficient = document.getElementById("dragCoefficient");
var dragCoefficientOutput = document.getElementById("dragCoefficientValue");
dragCoefficientOutput.value = dragCoefficient.value;

dragCoefficient.oninput = function(){
	dragCoefficientOutput.value = dragCoefficient.value;
  launch(); 
}

dragCoefficientOutput.onchange = function(){
	dragCoefficient.value = dragCoefficientOutput.value;
	launch();
}

var vesselDiameter = document.getElementById("vesselDiameter");
var vesselDiameterOutput = document.getElementById("vesselDiameterValue");
vesselDiameterOutput.value = vesselDiameter.value;

vesselDiameter.oninput = function(){
	vesselDiameterOutput.value = vesselDiameter.value;
  launch(); 
}

vesselDiameterOutput.onchange = function(){
	vesselDiameter.value = vesselDiameterOutput.value;
	launch();
}

var nozzleDiameter = document.getElementById("nozzleDiameter");
var nozzleDiameterOutput = document.getElementById("nozzleDiameterValue");
nozzleDiameterOutput.value = nozzleDiameter.value;

nozzleDiameter.oninput = function(){
	nozzleDiameterOutput.value = nozzleDiameter.value;
  launch(); 
}

nozzleDiameterOutput.onchange = function(){
	nozzleDiameter.value = nozzleDiameterOutput.value;
	launch();
}

var launchTubeLength = document.getElementById("launchTubeLength");
var launchTubeLengthOutput = document.getElementById("launchTubeLengthValue");
launchTubeLengthOutput.value = launchTubeLength.value;

launchTubeLength.oninput = function(){
	launchTubeLengthOutput.value = launchTubeLength.value;
  launch(); 
}

launchTubeLengthOutput.onchange = function(){
	launchTubeLength.value = launchTubeLengthOutput.value;
	launch();
}

var launchTubeDiameter = document.getElementById("launchTubeDiameter");
var launchTubeDiameterOutput = document.getElementById("launchTubeDiameterValue");
launchTubeDiameterOutput.value = launchTubeDiameter.value;

launchTubeDiameter.oninput = function(){
	launchTubeDiameterOutput.value = launchTubeDiameter.value;
  launch(); 
}

launchTubeDiameterOutput.onchange = function(){
	launchTubeDiameter.value = launchTubeDiameterOutput.value;
	launch();
}

var landing1 = document.getElementById("landing1");
var landingOutput1 = document.getElementById("landingValue1");
if (landing1.value == 0) landingOutput1.innerHTML = "no";
else landingOutput1.innerHTML = "yes";

landing1.oninput = function(){
	if (landing1.value == 0){
		landingOutput1.innerHTML = "no";
		hideLanding1();
	}
  else {
		landingOutput1.innerHTML = "yes";
		unhideLanding1();
	}
  launch();
}

var landingCapacity1 = document.getElementById("landingCapacity1");
var landingCapacity1Output = document.getElementById("landingCapacity1Value");
landingCapacity1Output.value = landingCapacity1.value;

landingCapacity1.oninput = function(){
	landingCapacity1Output.value = landingCapacity1.value;
	landingWaterPercentage1.innerHTML =  Math.round(landingWater1.value / landingCapacity1.value * 100);
  launch(); 
}

landingCapacity1Output.onchange = function(){
	landingCapacity1.value = landingCapacity1Output.value;
	landingWaterPercentage1.innerHTML =  Math.round(landingWater1.value / landingCapacity1.value * 100);
	launch();
}

var landingWater1 = document.getElementById("landingWater1");
var landingWater1Output = document.getElementById("landingWater1Value");
landingWater1Output.value = landingWater1.value;
var landingWaterPercentage1 = document.getElementById("landingWaterPercentage1");
landingWaterPercentage1.innerHTML =  Math.round(landingWater1.value / landingCapacity1.value * 100);

landingWater1.oninput = function(){
	landingWater1Output.value = landingWater1.value;
  landingWaterPercentage1.innerHTML =  Math.round(landingWater1.value / landingCapacity1.value * 100);
	launch(); 
}

landingWater1Output.onchange = function(){
	landingWater1.value = landingWater1Output.value;
	landingWaterPercentage1.innerHTML =  Math.round(landingWater1.value / landingCapacity1.value * 100);
	launch();
}

var landingPressure1 = document.getElementById("landingPressure1");
var landingPressure1Output = document.getElementById("landingPressure1Value");
landingPressure1Output.value = landingPressure1.value;

landingPressure1.oninput = function(){
	landingPressure1Output.value = landingPressure1.value;
  launch(); 
}

landingPressure1Output.onchange = function(){
	landingPressure1.value = landingPressure1Output.value;
	launch();
}

var landingNozzleDiameter1 = document.getElementById("landingNozzleDiameter1");
var landingNozzleDiameter1Output = document.getElementById("landingNozzleDiameter1Value");
landingNozzleDiameter1Output.value = landingNozzleDiameter1.value;

landingNozzleDiameter1.oninput = function(){
	landingNozzleDiameter1Output.value = landingNozzleDiameter1.value;
  launch(); 
}

landingNozzleDiameter1Output.onchange = function(){
	landingNozzleDiameter1.value = landingNozzleDiameter1Output.value;
	launch();
}

var landingBurnHeight1 = document.getElementById("landingBurnHeight1");
var landingBurnHeight1Output = document.getElementById("landingBurnHeight1Value");
landingBurnHeight1Output.value = landingBurnHeight1.value;

landingBurnHeight1.oninput = function(){
	landingBurnHeight1Output.value = landingBurnHeight1.value;
  launch(); 
}

landingBurnHeight1Output.onchange = function(){
	landingBurnHeight1.value = landingBurnHeight1Output.value;
	launch();
}


//same for stage 2

var vesselCapacity2 = document.getElementById("vesselCapacity2");
var vesselCapacityOutput2 = document.getElementById("vesselCapacityValue2");
vesselCapacityOutput2.value = vesselCapacity2.value;

vesselCapacity2.oninput = function(){
	vesselCapacityOutput2.value = vesselCapacity2.value;
	waterPercentage2.innerHTML =  Math.round(waterCapacity2.value / vesselCapacity2.value * 100);
  launch(); }

vesselCapacityOutput2.onchange = function(){
	vesselCapacity2.value = vesselCapacityOutput2.value;
	waterPercentage2.innerHTML =  Math.round(waterCapacity2.value / vesselCapacity2.value * 100);
	launch();
}

var waterCapacity2 = document.getElementById("waterCapacity2");
var waterCapacityOutput2 = document.getElementById("waterCapacityValue2");
waterCapacityOutput2.value = waterCapacity2.value;
var waterPercentage2 = document.getElementById("waterPercentage2");
waterPercentage2.value =  Math.round(waterCapacity2.value / vesselCapacity2.value * 100);

waterCapacity2.oninput = function(){
	waterCapacityOutput2.value = waterCapacity2.value;
	waterPercentage2.innerHTML =  Math.round(waterCapacity2.value / vesselCapacity2.value * 100);
  launch(); }

waterCapacityOutput2.onchange = function(){
	waterCapacity2.value = waterCapacityOutput2.value;
	waterPercentage2.innerHTML =  Math.round(waterCapacity2.value / vesselCapacity2.value * 100);
	launch();
}

var rocketDryMass2 = document.getElementById("rocketDryMass2");
var rocketDryMassOutput2 = document.getElementById("rocketDryMassValue2");
rocketDryMassOutput2.value = rocketDryMass2.value;

rocketDryMass2.oninput = function(){
	rocketDryMassOutput2.value = rocketDryMass2.value;
  launch(); }

rocketDryMassOutput2.onchange = function(){
	rocketDryMass2.value = rocketDryMassOutput2.value;
	launch();
}

var pressure2 = document.getElementById("pressure2");
var pressureOutput2 = document.getElementById("pressureValue2");
pressureOutput2.value = pressure2.value;

pressure2.oninput = function(){
	pressureOutput2.value = pressure2.value;
  launch(); }

pressureOutput2.onchange = function(){
	pressure2.value = pressureOutput2.value;
  launch(); 
}

var dragCoefficient2 = document.getElementById("dragCoefficient2");
var dragCoefficientOutput2 = document.getElementById("dragCoefficientValue2");
dragCoefficientOutput2.value = dragCoefficient2.value;

dragCoefficient2.oninput = function(){
	dragCoefficientOutput2.value = dragCoefficient2.value;
  launch(); }

dragCoefficientOutput2.onchange = function(){
	dragCoefficient2.value = dragCoefficientOutput2.value;
	launch();
}

var vesselDiameter2 = document.getElementById("vesselDiameter2");
var vesselDiameterOutput2 = document.getElementById("vesselDiameterValue2");
vesselDiameterOutput2.value = vesselDiameter2.value;

vesselDiameter2.oninput = function(){
	vesselDiameterOutput2.value = vesselDiameter2.value;
  launch(); }

vesselDiameterOutput2.onchange = function(){
	vesselDiameter2.value = vesselDiameterOutput2.value;
	launch();
}

var nozzleDiameter2 = document.getElementById("nozzleDiameter2");
var nozzleDiameterOutput2 = document.getElementById("nozzleDiameterValue2");
nozzleDiameterOutput2.value = nozzleDiameter2.value;

nozzleDiameter2.oninput = function(){
	nozzleDiameterOutput2.value = nozzleDiameter2.value;
  launch(); }

nozzleDiameterOutput2.onchange = function(){
	nozzleDiameter2.value = nozzleDiameterOutput2.value;
	launch();
}


var landing2 = document.getElementById("landing2");
var landingOutput2 = document.getElementById("landingValue2");
if (landing2.value == 0) landingOutput2.innerHTML = "no";
else landingOutput2.innerHTML = "yes";

landing2.oninput = function(){
	if (landing2.value == 0){
		landingOutput2.innerHTML = "no";
		hideLanding2();
	}
  else {
		landingOutput2.innerHTML = "yes";
		unhideLanding2();
	}
  launch();
}

var landingCapacity2 = document.getElementById("landingCapacity2");
var landingCapacity2Output = document.getElementById("landingCapacity2Value");
landingCapacity2Output.value = landingCapacity2.value;

landingCapacity2.oninput = function(){
	landingCapacity2Output.value = landingCapacity2.value;
	landingWaterPercentage2.innerHTML =  Math.round(landingWater2.value / landingCapacity2.value * 100);
  launch(); 
}

landingCapacity2Output.onchange = function(){
	landingCapacity2.value = landingCapacity2Output.value;
	landingWaterPercentage2.innerHTML =  Math.round(landingWater2.value / landingCapacity2.value * 100);
	launch();
}

var landingWater2 = document.getElementById("landingWater2");
var landingWater2Output = document.getElementById("landingWater2Value");
landingWater2Output.value = landingWater2.value;
var landingWaterPercentage2 = document.getElementById("landingWaterPercentage2");
landingWaterPercentage2.innerHTML =  Math.round(landingWater2.value / landingCapacity2.value * 100);

landingWater2.oninput = function(){
	landingWater2Output.value = landingWater2.value;
  landingWaterPercentage2.innerHTML =  Math.round(landingWater2.value / landingCapacity2.value * 100);
	launch(); 
}

landingWater2Output.onchange = function(){
	landingWater2.value = landingWater2Output.value;
	landingWaterPercentage2.innerHTML =  Math.round(landingWater2.value / landingCapacity2.value * 100);
	launch();
}

var landingPressure2 = document.getElementById("landingPressure2");
var landingPressure2Output = document.getElementById("landingPressure2Value");
landingPressure2Output.value = landingPressure2.value;

landingPressure2.oninput = function(){
	landingPressure2Output.value = landingPressure2.value;
  launch(); 
}

landingPressure2Output.onchange = function(){
	landingPressure2.value = landingPressure2Output.value;
	launch();
}

var landingNozzleDiameter2 = document.getElementById("landingNozzleDiameter2");
var landingNozzleDiameter2Output = document.getElementById("landingNozzleDiameter2Value");
landingNozzleDiameter2Output.value = landingNozzleDiameter2.value;

landingNozzleDiameter2.oninput = function(){
	landingNozzleDiameter2Output.value = landingNozzleDiameter2.value;
  launch(); 
}

landingNozzleDiameter2Output.onchange = function(){
	landingNozzleDiameter2.value = landingNozzleDiameter2Output.value;
	launch();
}

var landingBurnHeight2 = document.getElementById("landingBurnHeight2");
var landingBurnHeight2Output = document.getElementById("landingBurnHeight2Value");
landingBurnHeight2Output.value = landingBurnHeight2.value;

landingBurnHeight2.oninput = function(){
	landingBurnHeight2Output.value = landingBurnHeight2.value;
  launch(); 
}

landingBurnHeight2Output.onchange = function(){
	landingBurnHeight2.value = landingBurnHeight2Output.value;
	launch();
}


//same for stage 3

var vesselCapacity3 = document.getElementById("vesselCapacity3");
var vesselCapacityOutput3 = document.getElementById("vesselCapacityValue3");
vesselCapacityOutput3.value = vesselCapacity3.value;

vesselCapacity3.oninput = function(){
	vesselCapacityOutput3.value = vesselCapacity3.value;
	waterPercentage3.innerHTML =  Math.round(waterCapacity3.value / vesselCapacity3.value * 100);
  launch(); }

vesselCapacityOutput3.onchange = function(){
	vesselCapacity3.value = vesselCapacityOutput3.value;
	waterPercentage3.innerHTML =  Math.round(waterCapacity3.value / vesselCapacity3.value * 100);
	launch();
}

var waterCapacity3 = document.getElementById("waterCapacity3");
var waterCapacityOutput3 = document.getElementById("waterCapacityValue3");
waterCapacityOutput3.value = waterCapacity3.value;
var waterPercentage3 = document.getElementById("waterPercentage3");
waterPercentage3.value =  Math.round(waterCapacity3.value / vesselCapacity3.value * 100);

waterCapacity3.oninput = function(){
	waterCapacityOutput3.value = waterCapacity3.value;
	waterPercentage3.innerHTML =  Math.round(waterCapacity3.value / vesselCapacity3.value * 100);
  launch(); }

waterCapacityOutput3.onchange = function(){
	waterCapacity3.value = waterCapacityOutput3.value;
	waterPercentage3.innerHTML =  Math.round(waterCapacity3.value / vesselCapacity3.value * 100);
	launch();
}

var rocketDryMass3 = document.getElementById("rocketDryMass3");
var rocketDryMassOutput3 = document.getElementById("rocketDryMassValue3");
rocketDryMassOutput3.value = rocketDryMass3.value;

rocketDryMass3.oninput = function(){
	rocketDryMassOutput3.value = rocketDryMass3.value;
  launch(); }

rocketDryMassOutput3.onchange = function(){
	rocketDryMass3.value = rocketDryMassOutput3.value;
	launch();
}

var pressure3 = document.getElementById("pressure3");
var pressureOutput3 = document.getElementById("pressureValue3");
pressureOutput3.value = pressure3.value;

pressure3.oninput = function(){
	pressureOutput3.value = pressure3.value;
  launch(); }

pressureOutput3.onchange = function(){
	pressure3.value = pressureOutput3.value;
  launch(); 
}

var dragCoefficient3 = document.getElementById("dragCoefficient3");
var dragCoefficientOutput3 = document.getElementById("dragCoefficientValue3");
dragCoefficientOutput3.value = dragCoefficient3.value;

dragCoefficient3.oninput = function(){
	dragCoefficientOutput3.value = dragCoefficient3.value;
  launch(); }

dragCoefficientOutput3.onchange = function(){
	dragCoefficient3.value = dragCoefficientOutput3.value;
	launch();
}

var vesselDiameter3 = document.getElementById("vesselDiameter3");
var vesselDiameterOutput3 = document.getElementById("vesselDiameterValue3");
vesselDiameterOutput3.value = vesselDiameter3.value;

vesselDiameter3.oninput = function(){
	vesselDiameterOutput3.value = vesselDiameter3.value;
  launch(); }

vesselDiameterOutput3.onchange = function(){
	vesselDiameter3.value = vesselDiameterOutput3.value;
	launch();
}

var nozzleDiameter3 = document.getElementById("nozzleDiameter3");
var nozzleDiameterOutput3 = document.getElementById("nozzleDiameterValue3");
nozzleDiameterOutput3.value = nozzleDiameter3.value;

nozzleDiameter3.oninput = function(){
	nozzleDiameterOutput3.value = nozzleDiameter3.value;
  launch(); }

nozzleDiameterOutput3.onchange = function(){
	nozzleDiameter3.value = nozzleDiameterOutput3.value;
	launch();
}


var landing3 = document.getElementById("landing3");
var landingOutput3 = document.getElementById("landingValue3");
if (landing3.value == 0) landingOutput3.innerHTML = "no";
else landingOutput3.innerHTML = "yes";

landing3.oninput = function(){
	if (landing3.value == 0){
		landingOutput3.innerHTML = "no";
		hideLanding3();
	}
  else {
		landingOutput3.innerHTML = "yes";
		unhideLanding3();
	}
  launch();
}

var landingCapacity3 = document.getElementById("landingCapacity3");
var landingCapacity3Output = document.getElementById("landingCapacity3Value");
landingCapacity3Output.value = landingCapacity3.value;

landingCapacity3.oninput = function(){
	landingCapacity3Output.value = landingCapacity3.value;
	landingWaterPercentage3.innerHTML =  Math.round(landingWater3.value / landingCapacity3.value * 100);
  launch(); 
}

landingCapacity3Output.onchange = function(){
	landingCapacity3.value = landingCapacity3Output.value;
	landingWaterPercentage3.innerHTML =  Math.round(landingWater3.value / landingCapacity3.value * 100);
	launch();
}

var landingWater3 = document.getElementById("landingWater3");
var landingWater3Output = document.getElementById("landingWater3Value");
landingWater3Output.value = landingWater3.value;
var landingWaterPercentage3 = document.getElementById("landingWaterPercentage3");
landingWaterPercentage3.innerHTML =  Math.round(landingWater3.value / landingCapacity3.value * 100);

landingWater3.oninput = function(){
	landingWater3Output.value = landingWater3.value;
  landingWaterPercentage3.innerHTML =  Math.round(landingWater3.value / landingCapacity3.value * 100);
	launch(); 
}

landingWater3Output.onchange = function(){
	landingWater3.value = landingWater3Output.value;
	landingWaterPercentage3.innerHTML =  Math.round(landingWater3.value / landingCapacity3.value * 100);
	launch();
}

var landingPressure3 = document.getElementById("landingPressure3");
var landingPressure3Output = document.getElementById("landingPressure3Value");
landingPressure3Output.value = landingPressure3.value;

landingPressure3.oninput = function(){
	landingPressure3Output.value = landingPressure3.value;
  launch(); 
}

landingPressure3Output.onchange = function(){
	landingPressure3.value = landingPressure3Output.value;
	launch();
}

var landingNozzleDiameter3 = document.getElementById("landingNozzleDiameter3");
var landingNozzleDiameter3Output = document.getElementById("landingNozzleDiameter3Value");
landingNozzleDiameter3Output.value = landingNozzleDiameter3.value;

landingNozzleDiameter3.oninput = function(){
	landingNozzleDiameter3Output.value = landingNozzleDiameter3.value;
  launch(); 
}

landingNozzleDiameter3Output.onchange = function(){
	landingNozzleDiameter3.value = landingNozzleDiameter3Output.value;
	launch();
}

var landingBurnHeight3 = document.getElementById("landingBurnHeight3");
var landingBurnHeight3Output = document.getElementById("landingBurnHeight3Value");
landingBurnHeight3Output.value = landingBurnHeight3.value;

landingBurnHeight3.oninput = function(){
	landingBurnHeight3Output.value = landingBurnHeight3.value;
  launch(); 
}

landingBurnHeight3Output.onchange = function(){
	landingBurnHeight3.value = landingBurnHeight3Output.value;
	launch();
}



function hideStages(){
	var stagesNum = parseInt(numberOfStages.value);
	switch (stagesNum){
		case 1:
			document.getElementById("stage2").style.visibility = "hidden";
			document.getElementById("stage3").style.visibility = "hidden";
			
			/*var sliders = document.getElementsByClassName("sliderContainer");
			for (i = 0; i < sliders.length; i++){
				sliders[i].style.width = "100%";
			}*/
			
			var results2 = document.getElementsByClassName("value2");
      for (i = 0; i < results2.length; i++){
				results2[i].style.display = "none";
			}		
			var results3 = document.getElementsByClassName("value3");
			for (i = 0; i < results3.length; i++){
				results3[i].style.display = "none";
			}
			hideLanding2();
			hideLanding3();
		  break;
			
		case 2:
			document.getElementById("stage2").style.visibility = "visible";
			document.getElementById("stage3").style.visibility = "hidden";
			
			/*var sliders = document.getElementsByClassName("sliderContainer");
			for (i = 0; i < sliders.length; i++){
				sliders[i].style.width = "50%";
			}*/
			
			var results2 = document.getElementsByClassName("value2");
      for (i = 0; i < results2.length; i++){
				results2[i].style.display = "table-cell";
			}		
			var results3 = document.getElementsByClassName("value3");
			for (i = 0; i < results3.length; i++){
				results3[i].style.display = "none";
			}
			hideLanding3();
		  break;
			
		case 3:
			document.getElementById("stage2").style.visibility = "visible";
			document.getElementById("stage3").style.visibility = "visible";
			
			/*var sliders = document.getElementsByClassName("sliderContainer");
			for (i = 0; i < sliders.length; i++){
				sliders[i].style.width = "33%";
			}*/
			
			var results2 = document.getElementsByClassName("value2");
      for (i = 0; i < results2.length; i++){
				results2[i].style.display = "table-cell";
			}		
			var results3 = document.getElementsByClassName("value3");
			for (i = 0; i < results3.length; i++){
				results3[i].style.display = "table-cell";
			}
		  break;
	}
}	

function hideLanding1(){
	document.getElementById("landingPanel1").style.visibility = "hidden";
}
function unhideLanding1(){
	document.getElementById("landingPanel1").style.visibility = "visible";
}
function hideLanding2(){
	document.getElementById("landingPanel2").style.visibility = "hidden";
}
function unhideLanding2(){
	document.getElementById("landingPanel2").style.visibility = "visible";
}
function hideLanding3(){
	document.getElementById("landingPanel3").style.visibility = "hidden";
}
function unhideLanding3(){
	document.getElementById("landingPanel3").style.visibility = "visible";
}