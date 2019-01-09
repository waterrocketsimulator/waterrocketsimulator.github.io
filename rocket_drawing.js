function drawRocketBody() {
  var rocketBody = document.getElementById("rocketBody");
  var ctx = rocketBody.getContext("2d");
	var height = rocketBody.height;
	var width = rocketBody.width;
	var drawingFillFraction = 0.8; //how much of width/height occupies the model
	var offset = 5;
	var axisOffset = 35;
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
	
	var lt = launchTubeLength.value / 1000;
	var ltPercentage = lt / stage1Height;
	if (ltPercentage > 1) ltPercentage = 1;
	
	if (waterPercent1 > 1) waterPercent1 = 1;
	if (waterPercent2 > 1) waterPercent2 = 1;
	if (waterPercent3 > 1) waterPercent3 = 1;
	
	var maxY;
	var scale;
	var stagesNum = numberOfStages.value;
	if (stagesNum == 1){
		scale = (height - 2 * offset) / (stage1Height);
		maxY = stage1Height + offset / scale;
	}
	if (stagesNum == 2){
		scale = (height - 3 * offset) / (stage1Height + stage2Height);
		maxY = stage1Height + stage2Height + 2 * offset / scale;
	}
	if (stagesNum == 3){
		scale = (height - 4 * offset) / (stage1Height + stage2Height + stage3Height);
		maxY = stage1Height + stage2Height + stage3Height + 3 * offset / scale;
	}
	maxY *= 100; //convert maxY to cm
	
	console.log("scale: " + scale);
	console.log("stage1Height: " + stage1Height);
	
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
	
	console.log("scale: " + scale);
	console.log("stage1Height: " + stage1Height);
	
	ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
	
		
	ctx.setLineDash([]);
	  	
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
	
	//first stage launch tube
	linearGradient = ctx.createLinearGradient(width / 2 - nozzleDiam1 / 2, 0, width / 2 + nozzleDiam1 / 2, 0);
	linearGradient.addColorStop(0, "#d9d9d9");
	linearGradient.addColorStop(1, "#999999");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - nozzleDiam1 / 2, height - offset, nozzleDiam1, -stage1Height * ltPercentage);
	linearGradient = ctx.createLinearGradient(width / 2 - diameter1 / 2, 0, width / 2 + diameter1 / 2, 0);
	linearGradient.addColorStop(0, "#d9d9d9");
	linearGradient.addColorStop(1, "#999999");
	ctx.fillStyle = linearGradient;
	ctx.fillRect(width / 2 - diameter1 / 2, height, diameter1, -offset);
	ctx.rect(width / 2 - diameter1 / 2, height, diameter1, -offset);
	
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
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 50000 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 50000 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 50000, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 50000 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 50000 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 50000 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 25000 && maxY < 100000){
		for (i = 1; i < maxY / 5000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 5000 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 5000 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 5000, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 5000 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 5000 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 5000 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 10000 && maxY < 25000){
		for (i = 1; i < maxY / 2000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 2500 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 2500 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 2500, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 2500 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 2500 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 2500 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 5000 && maxY < 10000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 1000 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 1000 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 1000, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 1000 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 1000 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 1000 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 2000 && maxY < 5000){
		for (i = 1; i < maxY / 400; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 500 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 500 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 500, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 500 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 500 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 500 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 1000 && maxY < 2000){
		for (i = 1; i < maxY / 200; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 200 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 200 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 200, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 200 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 200 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 200 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 500 && maxY < 1000){
		for (i = 1; i < maxY / 100; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 100 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 100 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 100, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 100 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 100 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 100 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 200 && maxY < 500){
		for (i = 1; i < maxY / 40; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 50 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 50 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 50, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 50 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 50 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 50 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 100 && maxY < 200){
		for (i = 1; i < maxY / 20; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 25 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 25 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 25, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 25 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 25 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 25 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 50 && maxY < 100){
		for (i = 1; i < maxY / 10; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 10 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 10 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 10, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 10 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 10 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 10 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY > 10 && maxY < 50){
		for (i = 1; i < maxY / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 5 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 5 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 5, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 5 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 5 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 5 + height - axisOffset);
			ctx.stroke();
		}
	}
	if (maxY < 10){
		for (i = 1; i < maxY * 5; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(axisOffset - 8, - i * (height - axisOffset) / maxY * 2 + height - axisOffset);
			ctx.lineTo(axisOffset, - i * (height - axisOffset) / maxY * 2 + height - axisOffset);
			ctx.stroke();
			ctx.strokeText(i * 2, 0.1 * axisOffset, - i * (height - axisOffset) / maxY * 2 + height - axisOffset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(axisOffset, - i * (height - axisOffset) / maxY * 2 + height - axisOffset);
			ctx.lineTo(width, - i * (height - axisOffset) / maxY * 2 + height - axisOffset);
			ctx.stroke();
		}
	}
}