function drawRocketBody() {
  var rocketBody = document.getElementById("rocketBody");
  var ctx = rocketBody.getContext("2d");
	var readWidth = document.getElementById("rocketBodyCell").offsetWidth;
	ctx.canvas.width = readWidth - 5;
	var height = rocketBody.height;
	var width = rocketBody.width;
	var drawingFillFraction = 0.8; //how much of width/height occupies the model
	var offset = 5;
	var axisOffset = 35;
	var cornerRound = .02;
	var neckHeight = .075;
	var nozzleHeight = .0075;
	var ltBase = .2; //launch tube base diameter
	var widthBiggerThanHeight = false;
  
	var diameter1 = vesselDiameter.value / 1000;
	var diameter2 = vesselDiameter2.value / 1000;
	var diameter3 = vesselDiameter3.value / 1000;
	
	var nozzleDiam1 = nozzleDiameter.value / 1000;
	var nozzleDiam2 = nozzleDiameter2.value / 1000;
	var nozzleDiam3 = nozzleDiameter3.value / 1000;
	
	var stage1Height = vesselCapacity.value / 1000 / (diameter1 * diameter1 * Math.PI / 4);
	var stage2Height = vesselCapacity2.value / 1000 / (diameter2 * diameter2 * Math.PI / 4);
	var stage3Height = vesselCapacity3.value / 1000 / (diameter3 * diameter3 * Math.PI / 4);
	
	var waterPercent1 = waterCapacity.value / vesselCapacity.value;
	var waterPercent2 = waterCapacity2.value/ vesselCapacity2.value;
	var waterPercent3 = waterCapacity3.value/ vesselCapacity3.value;
	
	var lt = launchTubeLength.value / 1000;
	var ltDiameter = launchTubeDiameter.value / 1000;
	var ltPercentage;
	
	if (waterPercent1 > 1) waterPercent1 = 1;
	if (waterPercent2 > 1) waterPercent2 = 1;
	if (waterPercent3 > 1) waterPercent3 = 1;
	
	var maxY;
	var scale;
	var stagesNum = numberOfStages.value;
	stagesNum *= 1;
	
	var biggestDiameter;
	switch (stagesNum) {
		case 1:
			scale = (height - 2 * offset) / (stage1Height);
			maxY = stage1Height + offset / scale;
			biggestDiameter = diameter1;
			break;
		case 2:
			scale = (height - 3 * offset) / (stage1Height + stage2Height);
			maxY = stage1Height + stage2Height + 2 * offset / scale;
			if (diameter1 > diameter2) biggestDiameter = diameter1;
			else biggestDiameter = diameter2;
			break;
		case 3:
			scale = (height - 4 * offset) / (stage1Height + stage2Height + stage3Height);
			maxY = stage1Height + stage2Height + stage3Height + 3 * offset / scale;
			if (diameter1 > diameter2) biggestDiameter = diameter1;
			else if (diameter2 > diameter3) biggestDiameter = diameter2;
			else biggestDiameter = diameter3;
			break;
	}
	if (biggestDiameter * scale > width * (width - 2 * (axisOffset + 5)) / width) {
		scale = width * (width - 2 * (axisOffset + 5)) / width / biggestDiameter;	
		widthBiggerThanHeight = true;
	}
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
	ltBase *= scale;
	ltDiameter *= scale;
	
	if (widthBiggerThanHeight){  //if rocket doesn't fills all height of the plot, maxY (for axis plot) must be recalculated
	  maxY = (height - offset) / scale;
	}
	maxY *= 100; //convert maxY to cm	
	
	ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
	ctx.setLineDash([]);
	  	
	//first stage water fill
	var ltVolume; //underwater volume of launch tube
	if(lt * scale > waterPercent1 * stage1Height) ltVolume = Math.PI * nozzleDiam1 * nozzleDiam1 / 4 * waterPercent1 * stage1Height; //launch tube displaces water and it's level rises
	else ltVolume = Math.PI * nozzleDiam1 * nozzleDiam1 / 4 * lt * scale;
	waterPercent1 = (waterPercent1 * stage1Height * (Math.PI * diameter1 * diameter1 / 4) + ltVolume) / (Math.PI * diameter1 * diameter1 / 4) / stage1Height;
	if (waterPercent1 > 1) waterPercent1 = 1;
	
	var linearGradient = ctx.createLinearGradient(width / 2 - diameter1 / 2, height - offset, width / 2 + diameter1 / 2, height - offset - stage1Height);
	linearGradient.addColorStop(1, "#4d94ff");
	linearGradient.addColorStop(0, "#0039e6");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - diameter1 / 2, height - offset, diameter1, - stage1Height * waterPercent1);
	//erase unwanted blue areas - first stage
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.moveTo(width / 2 - diameter1 / 2 - 2, height - offset - stage1Height + cornerRound);
	ctx.lineTo(width / 2 - diameter1 / 2, height - offset- stage1Height + cornerRound);
	ctx.arc(width / 2 - diameter1 / 2 + cornerRound,  height - offset - stage1Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2 - diameter1 / 2 + cornerRound, height - offset- stage1Height - 2);
	ctx.lineTo(width / 2 - diameter1 / 2 - 2, height - offset- stage1Height - 2);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + diameter1 / 2 + 2, height - offset- stage1Height + cornerRound);
	ctx.lineTo(width / 2 + diameter1 / 2, height - offset- stage1Height + cornerRound);
	ctx.arc(width / 2 + diameter1 / 2 - cornerRound,  height - offset - stage1Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2 + diameter1 / 2 - cornerRound, height - offset- stage1Height - 2);
	ctx.lineTo(width / 2 + diameter1 / 2 + 2, height - offset- stage1Height - 2);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 - nozzleDiam1 / 2, height - offset);
	ctx.lineTo(width / 2 - nozzleDiam1 / 2, height - offset - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 - diameter1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 - diameter1 / 2,height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 - diameter1 / 2 - 2, height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 - diameter1 / 2 - 2, height - offset);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + nozzleDiam1 / 2, height - offset);
	ctx.lineTo(width / 2 + nozzleDiam1 / 2, height - offset - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 + diameter1 / 2, height - offset - nozzleHeight - .5 * neckHeight, width / 2 + diameter1 / 2,height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 + diameter1 / 2 + 2, height - offset - nozzleHeight - neckHeight);
	ctx.lineTo(width / 2 + diameter1 / 2 + 2, height - offset);
	ctx.closePath();
	ctx.stroke();
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
	
	//first stage launch tube
	if (nozzleDiam1 < ltDiameter) ltDiameter = nozzleDiam1;
	linearGradient = ctx.createLinearGradient(width / 2 - ltDiameter / 2, 0, width / 2 + ltDiameter / 2, 0);
	linearGradient.addColorStop(0, "#d9d9d9");
	linearGradient.addColorStop(1, "#999999");
	ctx.fillStyle = linearGradient;
	
	ltPercentage = lt * scale / stage1Height;
	if (ltPercentage > 1) ltPercentage = 1;
	console.log("ltPercent: " + ltPercentage);
	
	ctx.fillRect(width / 2 - ltDiameter / 2, height - offset, ltDiameter, - stage1Height * ltPercentage);
	linearGradient = ctx.createLinearGradient(width / 2 - ltBase / 2, 0, width / 2 + ltBase / 2, 0);
	linearGradient.addColorStop(0, "#d9d9d9");
	linearGradient.addColorStop(1, "#999999");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - ltBase / 2, height, ltBase, -offset);
	ctx.rect(width / 2 - ltBase / 2, height, ltBase, -offset);
	
	//first stage nozzle
	ctx.fillStyle = "#663300";
	ctx.fillRect(width / 2 - nozzleDiam1 / 2, height - offset, nozzleDiam1, -nozzleHeight);
	ctx.rect(width / 2 - nozzleDiam1 / 2, height - offset, nozzleDiam1, -nozzleHeight);
	ctx.stroke();
	
if (stagesNum == 2 || stagesNum == 3){
	//second stage water fill
	linearGradient = ctx.createLinearGradient(width / 2 - diameter2 / 2, height - 2 * offset - stage1Height, width / 2 + diameter2 / 2, height - 2 * offset - stage1Height - stage2Height);
	linearGradient.addColorStop(1, "#4d94ff");
	linearGradient.addColorStop(0, "#0039e6");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - diameter2 / 2, height - 2 * offset - stage1Height, diameter2, -stage2Height * waterPercent2);
	
	//erase unwanted blue areas - second stage
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.moveTo(width / 2 - diameter2 / 2 - 2, height - 2 * offset - stage1Height - stage2Height + cornerRound);
	ctx.lineTo(width / 2 - diameter2 / 2, height - 2 * offset- stage1Height - stage2Height + cornerRound);
	ctx.arc(width / 2 - diameter2 / 2 + cornerRound,  height - 2 * offset - stage1Height - stage2Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2 - diameter2 / 2 + cornerRound, height - 2 * offset- stage1Height - stage2Height - 2);
	ctx.lineTo(width / 2 - diameter2 / 2 - 2, height - 2 * offset- stage1Height - stage2Height - 2);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + diameter2 / 2 + 2, height - 2 * offset- stage1Height - stage2Height + cornerRound);
	ctx.lineTo(width / 2 + diameter2 / 2, height - 2 * offset- stage1Height - stage2Height + cornerRound);
	ctx.arc(width / 2 + diameter2 / 2 - cornerRound,  height - 2 * offset - stage1Height - stage2Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2 + diameter2 / 2 - cornerRound, height - 2 * offset- stage1Height - stage2Height - 2);
	ctx.lineTo(width / 2 + diameter2 / 2 + 2, height - 2 * offset- stage1Height - stage2Height - 2);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height);
	ctx.lineTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 - diameter2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 - diameter2 / 2,height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 - diameter2 / 2 - 2, height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 - diameter2 / 2 - 2, height - 2 * offset - stage1Height);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - stage1Height);
	ctx.lineTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 + diameter2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 + diameter2 / 2,height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 + diameter2 / 2 + 2, height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 + diameter2 / 2 + 2, height - 2 * offset - stage1Height);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	//interstage between 1st and 2nd stage
	linearGradient = ctx.createLinearGradient(width / 2 - diameter2 / 2, height - offset - stage1Height, width / 2 + diameter2 / 2, height - offset - stage1Height);
	linearGradient.addColorStop(1, "#d9d9d9");
	linearGradient.addColorStop(0, "#999999");
	ctx.fillStyle = linearGradient;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(width / 2 - diameter1 / 2 + cornerRound, height - offset - stage1Height);
	ctx.lineTo(width / 2 - diameter2 / 2, height - 2 * offset - stage1Height -nozzleHeight - neckHeight);
	ctx.bezierCurveTo(width / 2 - diameter2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 - nozzleDiam2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 - nozzleDiam2 / 2, height - 2 * offset - nozzleHeight - stage1Height);
	ctx.lineTo(width / 2 - nozzleDiam2 / 2, height - 2 * offset - stage1Height);
	ctx.lineTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - stage1Height);
	ctx.lineTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - stage1Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 + diameter2 / 2, height - 2 * offset - nozzleHeight - .5 * neckHeight - stage1Height, width / 2 + diameter2 / 2,height - 2 * offset - nozzleHeight - neckHeight - stage1Height);
	ctx.lineTo(width / 2 + diameter1 / 2 - cornerRound, height - offset - stage1Height);
	ctx.closePath();
	ctx.stroke();
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
}
	
if (stagesNum == 3){
	//third stage water fill
	linearGradient = ctx.createLinearGradient(width / 2 - diameter3 / 2, height - 3 * offset - stage1Height - stage2Height, width / 2 + diameter3 / 2, height - 3 * offset - stage1Height - stage2Height - stage3Height);
	linearGradient.addColorStop(1, "#4d94ff");
	linearGradient.addColorStop(0, "#0039e6");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - diameter3 / 2, height - 3 * offset - stage1Height - stage2Height, diameter3, -stage3Height * waterPercent3);
	
	//erase unwanted blue areas - third stage
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.moveTo(width / 2 - diameter3 / 2 - 2, height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.lineTo(width / 2 - diameter3 / 2, height - 3 * offset- stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.arc(width / 2 - diameter3 / 2 + cornerRound,  height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound, cornerRound, Math.PI, Math.PI * 1.5, false);
	ctx.lineTo(width / 2 - diameter3 / 2 + cornerRound, height - 3 * offset- stage1Height - stage2Height - stage3Height - 2);
	ctx.lineTo(width / 2 - diameter3 / 2 - 2, height - 3 * offset- stage1Height - stage2Height - stage3Height - 2);
	ctx.closePath();
	ctx.stroke();
	
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + diameter3 / 2 + 2, height - 3 * offset- stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.lineTo(width / 2 + diameter3 / 2, height - 3 * offset- stage1Height - stage2Height - stage3Height + cornerRound);
	ctx.arc(width / 2 + diameter3 / 2 - cornerRound,  height - 3 * offset - stage1Height - stage2Height - stage3Height + cornerRound, cornerRound, 0, Math.PI * 1.5, true);
	ctx.lineTo(width / 2 + diameter3 / 2 - cornerRound, height - 3 * offset- stage1Height - stage2Height - stage3Height - 2);
	ctx.lineTo(width / 2 + diameter3 / 2 + 2, height - 3 * offset- stage1Height - stage2Height - stage3Height - 2);
	ctx.closePath();
	ctx.stroke();
	
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 - nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.lineTo(width / 2 - nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 - nozzleDiam3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 - diameter3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 - diameter3 / 2,height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 - diameter3 / 2 - 2, height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 - diameter3 / 2 - 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.closePath();
	ctx.stroke();
	
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(width / 2 + nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight);
	ctx.bezierCurveTo(width / 2 + nozzleDiam3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 + diameter3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 + diameter3 / 2,height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + diameter3 / 2 + 2, height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + diameter3 / 2 + 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	//interstage between 2st and 3nd stage
	linearGradient = ctx.createLinearGradient(width / 2 - diameter3 / 2, height - 2 * offset - stage1Height - stage2Height, width / 2 + diameter2 / 2, height - 2 * offset - stage1Height- stage2Height);
	linearGradient.addColorStop(1, "#d9d9d9");
	linearGradient.addColorStop(0, "#999999");
	ctx.fillStyle = linearGradient;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(width / 2 - diameter2 / 2 + cornerRound, height - 2 * offset - stage1Height- stage2Height);
	ctx.lineTo(width / 2 - diameter3 / 2, height - 3 * offset - stage1Height - stage2Height - nozzleHeight - neckHeight);
	ctx.bezierCurveTo(width / 2 - diameter3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 - nozzleDiam3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 - nozzleDiam3 / 2, height - 3 * offset - nozzleHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 - nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + nozzleDiam3 / 2, height - 3 * offset - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + nozzleDiam3 / 2, height - 3 * offset - stage1Height - nozzleHeight - stage2Height);
	ctx.bezierCurveTo(width / 2 + nozzleDiam3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 + diameter3 / 2, height - 3 * offset - nozzleHeight - .5 * neckHeight - stage1Height - stage2Height, width / 2 + diameter3 / 2, height - 3 * offset - nozzleHeight - neckHeight - stage1Height - stage2Height);
	ctx.lineTo(width / 2 + diameter2 / 2 - cornerRound, height - 2 * offset - stage1Height - stage2Height);
	ctx.closePath();
	ctx.stroke();
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
	
	//draw x and y axes with arrows
	ctx.beginPath();
	ctx.moveTo(axisOffset, 0);
	ctx.lineTo(axisOffset - 2, 10);
	ctx.lineTo(axisOffset + 2, 10);
	ctx.lineTo(axisOffset, 0);
	ctx.lineTo(axisOffset, height - offset);
	ctx.moveTo(axisOffset - 8, height - offset);
	ctx.lineTo(axisOffset, height - offset);
  ctx.stroke();
	ctx.font = "12px sans-serif";
	ctx.strokeText(0, 0.1 * axisOffset, height - offset + 3);
	
	//draw scale Y	
	if (maxY > 100000){
		for (i = 1; i < maxY / 20000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50000, 0.1 * axisOffset, - i * (height - offset) / maxY * 50000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 25000 && maxY < 100000){
		for (i = 1; i < maxY / 5000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5000, 0.1 * axisOffset, - i * (height - offset) / maxY * 5000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10000 && maxY < 25000){
		for (i = 1; i < maxY / 2000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2500, 0.1 * axisOffset, - i * (height - offset) / maxY * 2500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 5000 && maxY < 10000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1000, 0.1 * axisOffset, - i * (height - offset) / maxY * 1000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 2000 && maxY < 5000){
		for (i = 1; i < maxY / 400; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 500, 0.1 * axisOffset, - i * (height - offset) / maxY * 500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 1000 && maxY < 2000){
		for (i = 1; i < maxY / 200; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 200, 0.1 * axisOffset, - i * (height - offset) / maxY * 200 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 500 && maxY < 1000){
		for (i = 1; i < maxY / 100; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100, 0.1 * axisOffset, - i * (height - offset) / maxY * 100 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 200 && maxY < 500){
		for (i = 1; i < maxY / 40; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50, 0.1 * axisOffset, - i * (height - offset) / maxY * 50 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100 && maxY < 200){
		for (i = 1; i < maxY / 20; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 25, 0.1 * axisOffset, - i * (height - offset) / maxY * 25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 50 && maxY < 100){
		for (i = 1; i < maxY / 10; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 10, 0.1 * axisOffset, - i * (height - offset) / maxY * 10 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10 && maxY < 50){
		for (i = 1; i < maxY / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5, 0.1 * axisOffset, - i * (height - offset) / maxY * 5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY < 10){
		for (i = 1; i < maxY * 5; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(axisOffset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, 0.1 * axisOffset, - i * (height - offset) / maxY * 2 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
		}
	}
}