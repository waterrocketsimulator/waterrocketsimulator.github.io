var stagesNum = document.getElementById("numberOfStages");
var stagesNumOutput = document.getElementById("numberOfStagesValue");
stagesNumOutput.innerHTML = stagesNum.value;

stagesNum.oninput = function(){
	stagesNumOutput.innerHTML = stagesNum.value;
	hideStages();
	launch();
}

var units = document.getElementById("units");
var unitsOutput = document.getElementById("unitsValue");
if (units.value == 1) unitsOutput.innerHTML = "metric";
else unitsOutput.innerHTML = "imperial";

units.oninput = function(){
	if (units.value == 1) unitsOutput.innerHTML = "metric";
	else unitsOutput.innerHTML = "imperial";
	launch();
}

//stage 1
var vesselCapacity = document.getElementById("vesselCapacity");
var vesselCapacityOutput = document.getElementById("vesselCapacityValue");
vesselCapacityOutput.innerHTML = vesselCapacity.value;

vesselCapacity.oninput = function(){
	vesselCapacityOutput.innerHTML = vesselCapacity.value;
	waterPercentage.innerHTML =  Math.round(waterCapacity.value / vesselCapacity.value * 100);
  launch(); 
}

var waterCapacity = document.getElementById("waterCapacity");
var waterCapacityOutput = document.getElementById("waterCapacityValue");
waterCapacityOutput.innerHTML = waterCapacity.value;
var waterPercentage = document.getElementById("waterPercentage");
waterPercentage.innerHTML =  Math.round(waterCapacity.value / vesselCapacity.value * 100);

waterCapacity.oninput = function(){
	waterCapacityOutput.innerHTML = waterCapacity.value;
  waterPercentage.innerHTML =  Math.round(waterCapacity.value / vesselCapacity.value * 100);
	launch(); 
}

var rocketDryMass = document.getElementById("rocketDryMass");
var rocketDryMassOutput = document.getElementById("rocketDryMassValue");
rocketDryMassOutput.innerHTML = rocketDryMass.value;

rocketDryMass.oninput = function(){
	rocketDryMassOutput.innerHTML = rocketDryMass.value;
  launch(); 
}

var pressure = document.getElementById("pressure");
var pressureOutput = document.getElementById("pressureValue");
pressureOutput.innerHTML = pressure.value;

pressure.oninput = function(){
	pressureOutput.innerHTML = pressure.value;
  launch(); }

var dragCoefficient = document.getElementById("dragCoefficient");
var dragCoefficientOutput = document.getElementById("dragCoefficientValue");
dragCoefficientOutput.innerHTML = dragCoefficient.value;

dragCoefficient.oninput = function(){
	dragCoefficientOutput.innerHTML = dragCoefficient.value;
  launch(); }

var vesselDiameter = document.getElementById("vesselDiameter");
var vesselDiameterOutput = document.getElementById("vesselDiameterValue");
vesselDiameterOutput.innerHTML = vesselDiameter.value;

vesselDiameter.oninput = function(){
	vesselDiameterOutput.innerHTML = vesselDiameter.value;
  launch(); }

var nozzleDiameter = document.getElementById("nozzleDiameter");
var nozzleDiameterOutput = document.getElementById("nozzleDiameterValue");
nozzleDiameterOutput.innerHTML = nozzleDiameter.value;

nozzleDiameter.oninput = function(){
	nozzleDiameterOutput.innerHTML = nozzleDiameter.value;
  launch(); }

var launchTubeLength = document.getElementById("launchTubeLength");
var launchTubeLengthOutput = document.getElementById("launchTubeLengthValue");
launchTubeLengthOutput.innerHTML = launchTubeLength.value;

launchTubeLength.oninput = function(){
	launchTubeLengthOutput.innerHTML = launchTubeLength.value;
  launch(); }


//same for stage 2

var vesselCapacity2 = document.getElementById("vesselCapacity2");
var vesselCapacityOutput2 = document.getElementById("vesselCapacityValue2");
vesselCapacityOutput2.innerHTML = vesselCapacity2.value;

vesselCapacity2.oninput = function(){
	vesselCapacityOutput2.innerHTML = vesselCapacity2.value;
	waterPercentage2.innerHTML =  Math.round(waterCapacity2.value / vesselCapacity2.value * 100);
  launch(); }

var waterCapacity2 = document.getElementById("waterCapacity2");
var waterCapacityOutput2 = document.getElementById("waterCapacityValue2");
waterCapacityOutput2.innerHTML = waterCapacity2.value;
var waterPercentage2 = document.getElementById("waterPercentage2");
waterPercentage2.innerHTML =  Math.round(waterCapacity2.value / vesselCapacity2.value * 100);

waterCapacity2.oninput = function(){
	waterCapacityOutput2.innerHTML = waterCapacity2.value;
	waterPercentage2.innerHTML =  Math.round(waterCapacity2.value / vesselCapacity2.value * 100);
  launch(); }

var rocketDryMass2 = document.getElementById("rocketDryMass2");
var rocketDryMassOutput2 = document.getElementById("rocketDryMassValue2");
rocketDryMassOutput2.innerHTML = rocketDryMass2.value;

rocketDryMass2.oninput = function(){
	rocketDryMassOutput2.innerHTML = rocketDryMass2.value;
  launch(); }

var pressure2 = document.getElementById("pressure2");
var pressureOutput2 = document.getElementById("pressureValue2");
pressureOutput2.innerHTML = pressure2.value;

pressure2.oninput = function(){
	pressureOutput2.innerHTML = pressure2.value;
  launch(); }

var dragCoefficient2 = document.getElementById("dragCoefficient2");
var dragCoefficientOutput2 = document.getElementById("dragCoefficientValue2");
dragCoefficientOutput2.innerHTML = dragCoefficient2.value;

dragCoefficient2.oninput = function(){
	dragCoefficientOutput2.innerHTML = dragCoefficient2.value;
  launch(); }

var vesselDiameter2 = document.getElementById("vesselDiameter2");
var vesselDiameterOutput2 = document.getElementById("vesselDiameterValue2");
vesselDiameterOutput2.innerHTML = vesselDiameter2.value;

vesselDiameter2.oninput = function(){
	vesselDiameterOutput2.innerHTML = vesselDiameter2.value;
  launch(); }

var nozzleDiameter2 = document.getElementById("nozzleDiameter2");
var nozzleDiameterOutput2 = document.getElementById("nozzleDiameterValue2");
nozzleDiameterOutput2.innerHTML = nozzleDiameter2.value;

nozzleDiameter2.oninput = function(){
	nozzleDiameterOutput2.innerHTML = nozzleDiameter2.value;
  launch(); }


//same for stage 3

var vesselCapacity3 = document.getElementById("vesselCapacity3");
var vesselCapacityOutput3 = document.getElementById("vesselCapacityValue3");
vesselCapacityOutput3.innerHTML = vesselCapacity3.value;

vesselCapacity3.oninput = function(){
	vesselCapacityOutput3.innerHTML = vesselCapacity3.value;
	waterPercentage3.innerHTML =  Math.round(waterCapacity3.value / vesselCapacity3.value * 100);
  launch(); 
}

var waterCapacity3 = document.getElementById("waterCapacity3");
var waterCapacityOutput3 = document.getElementById("waterCapacityValue3");
waterCapacityOutput3.innerHTML = waterCapacity3.value;
var waterPercentage3 = document.getElementById("waterPercentage3");
waterPercentage3.innerHTML =  Math.round(waterCapacity3.value / vesselCapacity3.value * 100);

waterCapacity3.oninput = function(){
	waterCapacityOutput3.innerHTML = waterCapacity3.value;
	waterPercentage3.innerHTML =  Math.round(waterCapacity3.value / vesselCapacity3.value * 100);
  launch(); 
}

var rocketDryMass3 = document.getElementById("rocketDryMass3");
var rocketDryMassOutput3 = document.getElementById("rocketDryMassValue3");
rocketDryMassOutput3.innerHTML = rocketDryMass3.value;

rocketDryMass3.oninput = function(){
	rocketDryMassOutput3.innerHTML = rocketDryMass3.value;
  launch(); }

var pressure3 = document.getElementById("pressure3");
var pressureOutput3 = document.getElementById("pressureValue3");
pressureOutput3.innerHTML = pressure3.value;

pressure3.oninput = function(){
	pressureOutput3.innerHTML = pressure3.value;
  launch(); }

var dragCoefficient3 = document.getElementById("dragCoefficient3");
var dragCoefficientOutput3 = document.getElementById("dragCoefficientValue3");
dragCoefficientOutput3.innerHTML = dragCoefficient3.value;

dragCoefficient3.oninput = function(){
	dragCoefficientOutput3.innerHTML = dragCoefficient3.value;
  launch(); }

var vesselDiameter3 = document.getElementById("vesselDiameter3");
var vesselDiameterOutput3 = document.getElementById("vesselDiameterValue3");
vesselDiameterOutput3.innerHTML = vesselDiameter3.value;

vesselDiameter3.oninput = function(){
	vesselDiameterOutput3.innerHTML = vesselDiameter3.value;
  launch(); }

var nozzleDiameter3 = document.getElementById("nozzleDiameter3");
var nozzleDiameterOutput3 = document.getElementById("nozzleDiameterValue3");
nozzleDiameterOutput3.innerHTML = nozzleDiameter3.value;

nozzleDiameter3.oninput = function(){
	nozzleDiameterOutput3.innerHTML = nozzleDiameter3.value;
  launch(); }



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


