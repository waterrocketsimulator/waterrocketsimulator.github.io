function drawRocketBody() {
  var rocketBody = document.getElementById("rocketBody");
  var ctx = rocketBody.getContext("2d");
	var height = rocketBody.height;
	var width = rocketBody.width;
	var drawingFillFraction = 0.8; //how much of width/height occupies the model
	var offset = 5;
	var cornerRound = .02;
	var neckHeight = .075;
	var nozzleHeight = .0075;
  
	var diameter1 = vesselDiameter.value / 1000;
	var diameter2 = vesselDiameter2.value / 1000;
	var diameter3 = vesselDiameter3.value / 1000;
	
	var nozzleDiam1 = nozzleDiameter.value / 1000;
	var nozzleDiam2 = nozzleDiameter2.value / 1000;
	var nozzleDiam3 = nozzleDiameter3.value / 1000;
	
	var stage1Height = vesselCapacity.value / 1000 / (diameter1 * diameter1 * 3.14159 / 4);
	var stage2Height = vesselCapacity2.value / 1000 / (diameter2 * diameter2 * 3.14159 / 4);
	var stage3Height = vesselCapacity3.value / 1000 / (diameter3 * diameter3 * 3.14159 / 4);
	
	var waterPercent1 = waterCapacity.value / vesselCapacity.value;
	var waterPercent2 = waterCapacity2.value/ vesselCapacity2.value;
	var waterPercent3 = waterCapacity3.value/ vesselCapacity3.value;
	
	if (waterPercent1 > 1) waterPercent1 = 1;
	if (waterPercent2 > 1) waterPercent2 = 1;
	if (waterPercent3 > 1) waterPercent3 = 1;
	
	var stagesNum = numberOfStages.value;
	if (stagesNum == 1) var scale = (height - 2 * offset) / (stage1Height);
	if (stagesNum == 2) var scale = (height - 3 * offset) / (stage1Height + stage2Height);
	if (stagesNum == 3) var scale = (height - 4 * offset) / (stage1Height + stage2Height + stage3Height);
	
	//scaling to canvas
	diameter1 *= scale;
	diameter2 *= scale;
	diameter3 *= scale;
	stage1Height *= scale; 
	stage2Height *= scale; 
	stage3Height *= scale; 
	nozzleDiam1 *= scale;
	nozzleDiam2 *= scale;
	nozzleDiam3 *= scale;
	cornerRound *= scale;
	neckHeight *= scale;
	nozzleHeight *= scale;
	
	console.log("stages: " + stagesNum);
	console.log("scale: " + scale);
	console.log("stage1Height: " + stage1Height);
	
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
  	
	//first stage water fill
	var linearGradient = ctx.createLinearGradient(0,50,150,500);
	linearGradient.addColorStop(0, "#b3ccff");
	linearGradient.addColorStop(1, "#1a66ff");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - diameter1 / 2, height - offset, diameter1, -stage1Height * waterPercent1);
	//erase unwanted blue areas - first stage
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(width / 2 - diameter1 / 2 - 2, height - offset - stage1Height + cornerRound);
	ctx.lineTo(width / 2 - diameter1 / 2, height - offset- stage1Height + cornerRound);
	ctx.arc(width / 2 - diameter1 / 2 + cornerRound,  height - offset - stage1Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2 - diameter1 / 2 + cornerRound, height - offset- stage1Height - 2);
	ctx.lineTo(width / 2 - diameter1 / 2 - 2, height - offset- stage1Height - 2);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + diameter1 / 2 + 2, height - offset- stage1Height + cornerRound);
	ctx.lineTo(width / 2 + diameter1 / 2, height - offset- stage1Height + cornerRound);
	ctx.arc(width / 2 + diameter1 / 2 - cornerRound,  height - offset - stage1Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2 + diameter1 / 2 - cornerRound, height - offset- stage1Height - 2);
	ctx.lineTo(width / 2 + diameter1 / 2 + 2, height - offset- stage1Height - 2);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 - nozzleDiam1 / 2, height - offset);
	ctx.lineTo(width / 2 - nozzleDiam1 / 2, height - offset - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 - diameter1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 - diameter1 / 2,height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 - diameter1 / 2 - 2, height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 - diameter1 / 2 - 2, height - offset);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + nozzleDiam1 / 2, height - offset);
	ctx.lineTo(width / 2 + nozzleDiam1 / 2, height - offset - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 + diameter1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 + diameter1 / 2,height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 + diameter1 / 2 + 2, height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 + diameter1 / 2 + 2, height - offset);
	ctx.closePath();
	ctx.fill();
	
	//first stage left side
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(width / 2, height - offset - nozzleHeight);
	ctx.lineTo(width / 2 - nozzleDiam1 / 2, height - offset - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 - diameter1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 - diameter1 / 2,height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 - diameter1 / 2, height - offset - stage1Height + cornerRound);
	ctx.arc(width / 2 - diameter1 / 2 + cornerRound,  height - offset - stage1Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2, height - offset- stage1Height);
	
	//first stage right side
	ctx.moveTo(width / 2, height - offset - nozzleHeight);
	ctx.lineTo(width / 2 + nozzleDiam1 / 2, height - offset - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 + diameter1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 + diameter1 / 2,height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 + diameter1 / 2, height - offset - stage1Height + cornerRound);
	ctx.arc(width / 2 + diameter1 / 2 - cornerRound,  height - offset - stage1Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2, height - offset- stage1Height);
	ctx.stroke();
	
	//first stage nozzle
	ctx.fillStyle = "#663300";
	ctx.fillRect(width / 2 - nozzleDiam1 / 2, height - offset, nozzleDiam1, -nozzleHeight);
	ctx.rect(width / 2 - nozzleDiam1 / 2, height - offset, nozzleDiam1, -nozzleHeight);
	ctx.stroke();
	
	
	//second stage water fill
	linearGradient = ctx.createLinearGradient(0,50,150,200);
	linearGradient.addColorStop(0, "#b3ccff");
	linearGradient.addColorStop(1, "#1a66ff");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - diameter2 / 2, height - 2 * offset - stage1Height, diameter2, -stage2Height * waterPercent2);
	
	//erase unwanted blue areas - second stage
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(width / 2 - diameter2 / 2 - 2, height - 2 * offset - stage1Height - stage2Height + cornerRound);
	ctx.lineTo(width / 2 - diameter2 / 2, height - 2 * offset- stage1Height - stage2Height + cornerRound);
	ctx.arc(width / 2 - diameter2 / 2 + cornerRound,  height - 2 * offset - stage1Height - stage2Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2 - diameter2 / 2 + cornerRound, height - 2 * offset- stage1Height - stage2Height - 2);
	ctx.lineTo(width / 2 - diameter2 / 2 - 2, height - 2 * offset- stage1Height - stage2Height - 2);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + diameter2 / 2 + 2, height - 2 * offset- stage1Height - stage2Height + cornerRound);
	ctx.lineTo(width / 2 + diameter2 / 2, height - 2 * offset- stage1Height - stage2Height + cornerRound);
	ctx.arc(width / 2 + diameter2 / 2 - cornerRound,  height - 2 * offset - stage1Height - stage2Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2 + diameter2 / 2 - cornerRound, height - 2 * offset- stage1Height - stage2Height - 2);
	ctx.lineTo(width / 2 + diameter2 / 2 + 2, height - 2 * offset- stage1Height - stage2Height - 2);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height);
	ctx.lineTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 - diameter2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 - diameter2 / 2,height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 - diameter2 / 2 - 2, height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 - diameter2 / 2 - 2, height - 2 * offset - stage1Height);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - stage1Height);
	ctx.lineTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 + diameter2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 + diameter2 / 2,height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 + diameter2 / 2 + 2, height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 + diameter2 / 2 + 2, height - 2 * offset - stage1Height);
	ctx.closePath();
	ctx.fill();
	
	//second stage left side
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(width / 2, height - 2 * offset - stage1Height - nozzleHeight );
	ctx.lineTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight - .5 * neckHeight, width / 2 - diameter2 / 2, height - 2 * offset - stage1Height - nozzleHeight - .5 * neckHeight, width / 2 - diameter2 / 2,height - 2 * offset - stage1Height - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 - diameter2 / 2, height - 2 * offset - stage1Height - stage2Height + cornerRound);
	ctx.arc(width / 2 - diameter2 / 2 + cornerRound,  height - 2 * offset - stage1Height - stage2Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2, height - 2 * offset - stage1Height - stage2Height);
	
	//second stage right side
	ctx.moveTo(width / 2, height - 2 * offset - stage1Height - nozzleHeight );
	ctx.lineTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight - .5 * neckHeight, width / 2 + diameter2 / 2, height - 2 * offset - stage1Height - nozzleHeight - .5 * neckHeight, width / 2 + diameter2 / 2,height - 2 * offset - stage1Height - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 + diameter2 / 2, height - 2 * offset - stage1Height - stage2Height + cornerRound);
	ctx.arc(width / 2 + diameter2 / 2 - cornerRound,  height - 2 * offset - stage1Height - stage2Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2, height - 2 * offset - stage1Height - stage2Height);
	ctx.stroke();
	
	//second stage nozzle
	ctx.fillStyle = "#663300";
	ctx.fillRect(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height, nozzleDiam2, -nozzleHeight);
	ctx.rect(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height, nozzleDiam2, -nozzleHeight);
	ctx.stroke();
	
	
	//third stage water fill
	linearGradient = ctx.createLinearGradient(0,50,150,200);
	linearGradient.addColorStop(0, "#b3ccff");
	linearGradient.addColorStop(1, "#1a66ff");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - diameter3 / 2, height - 3 * offset - stage1Height - stage2Height, diameter3, -stage3Height * waterPercent3);
	
	//erase unwanted blue areas - third stage
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(width / 2 - diameter3 / 2 - 2, height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.lineTo(width / 2 - diameter3 / 2, height - 3 * offset- stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.arc(width / 2 - diameter3 / 2 + cornerRound,  height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2 - diameter3 / 2 + cornerRound, height - 3 * offset- stage1Height - stage2Height - stage3Height - 2);
	ctx.lineTo(width / 2 - diameter3 / 2 - 2, height - 3 * offset- stage1Height - stage2Height - stage3Height - 2);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + diameter3 / 2 + 2, height - 3 * offset- stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.lineTo(width / 2 + diameter3 / 2, height - 3 * offset- stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.arc(width / 2 + diameter3 / 2 - cornerRound,  height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2 + diameter3 / 2 - cornerRound, height - 3 * offset- stage1Height - stage2Height - stage3Height - 2);
	ctx.lineTo(width / 2 + diameter3 / 2 + 2, height - 3 * offset- stage1Height - stage2Height - stage3Height - 2);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 - nozzleDiam2 / 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.lineTo(width / 2 - nozzleDiam2 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam2 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 - diameter3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 - diameter3 / 2,height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 - diameter3 / 2 - 2, height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 - diameter3 / 2 - 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + nozzleDiam2 / 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + nozzleDiam2 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam2 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 + diameter3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 + diameter3 / 2,height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + diameter3 / 2 + 2, height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + diameter3 / 2 + 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.closePath();
	ctx.fill();
	
	//third stage left side
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(width / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight );
	ctx.lineTo(width / 2 - nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight - .5 * neckHeight, width / 2 - diameter3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight - .5 * neckHeight, width / 2 - diameter3 / 2,height - 3 * offset - stage1Height - stage2Height - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 - diameter3 / 2, height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.arc(width / 2 - diameter3 / 2 + cornerRound,  height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2, height - 3 * offset - stage1Height - stage2Height - stage3Height);
	
	//third stage right side
	ctx.moveTo(width / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight );
	ctx.lineTo(width / 2 + nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight - .5 * neckHeight, width / 2 + diameter3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight - .5 * neckHeight, width / 2 + diameter3 / 2,height - 3 * offset - stage1Height - stage2Height - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 + diameter3 / 2, height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.arc(width / 2 + diameter3 / 2 - cornerRound,  height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2, height - 3 * offset - stage1Height - stage2Height - stage3Height);
	ctx.stroke();
	
	//third stage nozzle
	ctx.fillStyle = "#663300";
	ctx.fillRect(width / 2 - nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height, nozzleDiam3, -nozzleHeight);
	ctx.rect(width / 2 - nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height, nozzleDiam3, -nozzleHeight);
	ctx.stroke();
	
}