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
	if (landing2.value == 0) landingOutput2.innerHTML = "no";
  else landingOutput2.innerHTML = "yes";
  launch(); 
	console.log("landing2: " + landing2.value);
}

var reserve2 = document.getElementById("reserve2");
var reserveOutput2 = document.getElementById("reserveValue2");
reserveOutput2.value = reserve2.value;

reserve2.oninput = function(){
	reserveOutput2.value = reserve2.value;
  launch(); 
}

reserveOutput2.onchange = function(){
	reserve2.value = reserveOutput2.value;
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
	if (landing3.value == 0) landingOutput3.innerHTML = "no";
  else landingOutput3.innerHTML = "yes";
  launch(); 
	console.log("landing3: " + landing3.value);
}

var reserve3 = document.getElementById("reserve3");
var reserveOutput3 = document.getElementById("reserveValue3");
reserveOutput3.value = reserve3.value;

reserve3.oninput = function(){
	reserveOutput3.value = reserve3.value;
  launch(); 
}

reserveOutput3.onchange = function(){
	reserve3.value = reserveOutput3.value;
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


