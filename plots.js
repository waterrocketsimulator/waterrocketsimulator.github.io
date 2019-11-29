function drawPlots(){
	drawAltitudePlot();
	drawVelocityPlot();
	drawAccelerationPlot();
	drawThrustPlot();
	drawEnergyPlot();
	drawExhaustPlot();
	
	drawRocketBody();
	
	//drawAltitudeExperiment()
	//drawVelocityExperiment()
}

function drawAltitudeExperiment() {
  var altitudePlot = document.getElementById("altitudePlot");
  var ctx = altitudePlot.getContext("2d");
	var offset = 40;
	var maxY = Math.max.apply(null, plotDataStorage.altitude);
	var maxX = plotDataStorage.fl;
	var height = altitudePlot.height;
	var width = altitudePlot.width;
  	
	ctx.beginPath();	
	ctx.moveTo(offset, height - offset);
	ctx.strokeStyle = "#ff1000";
	ctx.setLineDash([]);
	
	for (i = 0; i < plotDataStorage.altitudeExp.length; i++){
	  ctx.lineTo(i * (width - offset) / (plotDataStorage.altitudeExp.length) + offset, height - plotDataStorage.altitudeExp[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
}

function drawVelocityExperiment() {
  var velocityPlot = document.getElementById("velocityPlot");
  var ctx = velocityPlot.getContext("2d");
	var offset = 40;
	var maxY = Math.max.apply(null, plotDataStorage.velocity);
	var maxX = plotDataStorage.fl;
	var height = altitudePlot.height;
	var width = altitudePlot.width;
  	
	ctx.beginPath();	
	ctx.moveTo(offset, height - offset);
	ctx.strokeStyle = "#ff1000";
	ctx.setLineDash([]);
	
	for (i = 0; i < plotDataStorage.velocityExp.length; i++){
	  ctx.lineTo(i * (width - offset) / (plotDataStorage.velocityExp.length) + offset, height - plotDataStorage.velocityExp[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
}

function drawAltitudePlot() {
	var stagesNum = parseInt(numberOfStages.value);
  var altitudePlot = document.getElementById("altitudePlot");
  var ctx = altitudePlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max.apply(null, plotDataStorage.ascentAltitude);
	var maxX = plotDataStorage.ascentAltitude.length * plotDataStorage.dt;
	switch (stagesNum){
		case 1:
			maxX += plotDataStorage.descentAltitude1.length * plotDataStorage.dt;
			break;
		case 2:
			maxX += plotDataStorage.descentAltitude2.length * plotDataStorage.dt;
			break;
		case 3:
			maxX += plotDataStorage.descentAltitude3.length * plotDataStorage.dt;
			break;
	}
	maxX = Math.max(maxX,
									plotDataStorage.stage1separationTime + (plotDataStorage.ballisticAltitude1.length + plotDataStorage.descentAltitude1.length) * plotDataStorage.dt,
									plotDataStorage.stage2separationTime + (plotDataStorage.ballisticAltitude2.length + plotDataStorage.descentAltitude2.length) * plotDataStorage.dt);
	var readWidth = document.getElementById("altitudePlotCell").offsetWidth;
	ctx.canvas.width = readWidth - canvasOffset;
	ctx.canvas.height = readWidth - canvasOffset;
	var height = altitudePlot.height;
	var width = altitudePlot.width;
	
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
  ctx.fillStyle = "#000000";
	ctx.font = "12px sans-serif";
	
	//draw x and y axes with arrows
	ctx.beginPath();
	ctx.moveTo(offset, 0);
	ctx.lineTo(offset - 2, 10);
	ctx.lineTo(offset + 2, 10);
	ctx.lineTo(offset, 0);
	ctx.lineTo(offset, height - offset);
	ctx.lineTo(width, height - offset);
	ctx.lineTo(width - 10, height - offset + 2);
	ctx.lineTo(width - 10, height - offset - 2);
	ctx.lineTo(width, height - offset);
  ctx.stroke();
	
	//draw scale X
	
	if (maxX > 256){
		for (i = 1; i < maxX / 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 64, i * (width - offset) / maxX * 64 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 128 && maxX < 256){
		for (i = 1; i < maxX / 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 32, i * (width - offset) / maxX * 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 64 && maxX < 128){
		for (i = 1; i < maxX / 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 16, i * (width - offset) / maxX * 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 32 && maxX < 64){
		for (i = 1; i < maxX / 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 8, i * (width - offset) / maxX * 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 16 && maxX < 32){
		for (i = 1; i < maxX / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 4, i * (width - offset) / maxX * 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 8 && maxX < 16){
		for (i = 1; i < maxX; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, i * (width - offset) / maxX * 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 4 && maxX < 8){
		for (i = 1; i < maxX*2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, i * (width - offset) / maxX * 1 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 2 && maxX < 4){
		for (i = 1; i < maxX * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 2, i * (width - offset) / maxX / 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 1 && maxX < 2){
		for (i = 1; i < maxX * 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 4, i * (width - offset) / maxX / 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 1 && maxX > 0.5){
		for (i = 1; i < maxX * 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 8, i * (width - offset) / maxX / 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.5 && maxX > 0.25){
		for (i = 1; i < maxX * 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset + 16);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 16, i * (width - offset) / maxX / 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.25){
		for (i = 1; i < maxX * 64; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset + 32);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 32, i * (width - offset) / maxX / 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, 0);
			ctx.stroke();
		}
	}
	
	//draw scale Y
	if (maxY > 100000){
		for (i = 1; i < maxY / 20000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50000, 0.1 * offset, - i * (height - offset) / maxY * 50000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 25000 && maxY < 100000){
		for (i = 1; i < maxY / 5000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5000, 0.1 * offset, - i * (height - offset) / maxY * 5000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10000 && maxY < 25000){
		for (i = 1; i < maxY / 2000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2500, 0.1 * offset, - i * (height - offset) / maxY * 2500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 5000 && maxY < 10000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1000, 0.1 * offset, - i * (height - offset) / maxY * 1000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 2000 && maxY < 5000){
		for (i = 1; i < maxY / 400; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 500, 0.1 * offset, - i * (height - offset) / maxY * 500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 1000 && maxY < 2000){
		for (i = 1; i < maxY / 200; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 200, 0.1 * offset, - i * (height - offset) / maxY * 200 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 500 && maxY < 1000){
		for (i = 1; i < maxY / 100; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100, 0.1 * offset, - i * (height - offset) / maxY * 100 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 200 && maxY < 500){
		for (i = 1; i < maxY / 40; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50, 0.1 * offset, - i * (height - offset) / maxY * 50 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100 && maxY < 200){
		for (i = 1; i < maxY / 20; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 25, 0.1 * offset, - i * (height - offset) / maxY * 25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 50 && maxY < 100){
		for (i = 1; i < maxY / 10; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 10, 0.1 * offset, - i * (height - offset) / maxY * 10 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10 && maxY < 50){
		for (i = 1; i < maxY / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5, 0.1 * offset, - i * (height - offset) / maxY * 5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 8 && maxY < 10){
		for (i = 1; i < maxY * 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, 0.1 * offset, - i * (height - offset) / maxY * 2 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 4 && maxY < 8){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, 0.1 * offset, - i * (height - offset) / maxY * 1 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.stroke();
		}
	}
	
	if (maxY > 2 && maxY < 4){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 0.5, 0.1 * offset, - i * (height - offset) / maxY * 0.5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.stroke();
		}
	}
	
	if (maxY > 0 && maxY < 2){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 0.25, 0.1 * offset, - i * (height - offset) / maxY * 0.25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.stroke();
		}
	}
	
	ctx.beginPath();	
	ctx.moveTo(offset, height - offset);
	ctx.strokeStyle = "#000000";
	ctx.setLineDash([]);
	
	//ascending line of all stages
	for (i = 0; i < plotDataStorage.ascentAltitude.length; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.ascentAltitude[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	//ballistic line of stage 1
	if (stagesNum > 1){
		ctx.beginPath();
		ctx.moveTo((width - offset) * (plotDataStorage.stage1separationTime / maxX) + offset, height - plotDataStorage.ballisticAltitude1[0] * (height - offset) / maxY - offset);
		for (i = 0; i < plotDataStorage.ballisticAltitude1.length; i++){
		 	ctx.lineTo((width - offset) * (plotDataStorage.stage1separationTime / maxX) + i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.ballisticAltitude1[i] * (height - offset) / maxY - offset);
		}
	
		ctx.stroke();
	}
	//landing line of stage 1
	ctx.beginPath();
	ctx.setLineDash([2,2]);
	var tempOffset = (width - offset) * ((plotDataStorage.stage1separationTime + plotDataStorage.ballisticAltitude1.length * plotDataStorage.dt) / maxX);
	ctx.moveTo (tempOffset + offset, height - plotDataStorage.descentAltitude1[0] / maxY * (height - offset) - offset);
	for (i = 0; i < plotDataStorage.descentAltitude1.length; i++){
	 	ctx.lineTo(tempOffset + i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.descentAltitude1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	//ballistic line of stage 2
	if (stagesNum == 3){
		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.moveTo((width - offset) * (plotDataStorage.stage2separationTime / maxX) + offset, height - plotDataStorage.ballisticAltitude2[0] * (height - offset) / maxY - offset);
		for (i = 0; i < plotDataStorage.ballisticAltitude2.length; i++){
		 	ctx.lineTo((width - offset) * (plotDataStorage.stage2separationTime / maxX) + i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.ballisticAltitude2[i] * (height - offset) / maxY - offset);
		}
	
		ctx.stroke();
	}
	
	//landing line of stage 2
	ctx.beginPath();
	ctx.setLineDash([2,2]);
	var tempOffset = (width - offset) * ((plotDataStorage.stage2separationTime + plotDataStorage.ballisticAltitude2.length * plotDataStorage.dt) / maxX);
	ctx.moveTo (tempOffset + offset, height - plotDataStorage.descentAltitude2[0] / maxY * (height - offset) - offset);
	for (i = 0; i < plotDataStorage.descentAltitude2.length; i++){
	 	ctx.lineTo(tempOffset + i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.descentAltitude2[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();

	//landing line of stage 3
	ctx.beginPath();
	var tempOffset = (width - offset) * plotDataStorage.ascentAltitude.length * plotDataStorage.dt / maxX;
	ctx.moveTo (tempOffset + offset, height - plotDataStorage.descentAltitude3[0] / maxY * (height - offset) - offset);
	for (i = 0; i < plotDataStorage.descentAltitude3.length; i++){
	 	ctx.lineTo(tempOffset + i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.descentAltitude3[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
}

function drawVelocityPlot() {
  var stagesNum = parseInt(numberOfStages.value);
	var velocityPlot = document.getElementById("velocityPlot");
  var ctx = velocityPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max(Math.max.apply(null, plotDataStorage.landingVelocity1), Math.max.apply(null, plotDataStorage.velocity1),
						 					Math.max.apply(null, plotDataStorage.landingVelocity2), Math.max.apply(null, plotDataStorage.velocity2),
						 					Math.max.apply(null, plotDataStorage.landingVelocity3), Math.max.apply(null, plotDataStorage.velocity3));		 
	var maxX = Math.max(plotDataStorage.landingVelocity1.length * plotDataStorage.dt, plotDataStorage.velocity1.length * plotDataStorage.dt,
											plotDataStorage.landingVelocity2.length * plotDataStorage.dt, plotDataStorage.velocity2.length * plotDataStorage.dt,
											plotDataStorage.landingVelocity3.length * plotDataStorage.dt, plotDataStorage.velocity3.length * plotDataStorage.dt);
	var readWidth = document.getElementById("velocityPlotCell").offsetWidth;
	ctx.canvas.width = readWidth - canvasOffset;
	ctx.canvas.height = readWidth - canvasOffset;
	var height = velocityPlot.height;
	var width = velocityPlot.width;
	
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
  ctx.fillStyle = "#000000";
	ctx.font = "12px sans-serif";
	
	//draw x and y axes with arrows
	ctx.beginPath();
	ctx.moveTo(offset, 0);
	ctx.lineTo(offset - 2, 10);
	ctx.lineTo(offset + 2, 10);
	ctx.lineTo(offset, 0);
	ctx.lineTo(offset, height - offset);
	ctx.lineTo(width, height - offset);
	ctx.lineTo(width - 10, height - offset + 2);
	ctx.lineTo(width - 10, height - offset - 2);
	ctx.lineTo(width, height - offset);
  ctx.stroke();
	
	//draw scale X
	if (maxX > 256){
		for (i = 1; i < maxX / 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 64, i * (width - offset) / maxX * 64 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 128 && maxX < 256){
		for (i = 1; i < maxX / 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 32, i * (width - offset) / maxX * 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 64 && maxX < 128){
		for (i = 1; i < maxX / 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 16, i * (width - offset) / maxX * 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 32 && maxX < 64){
		for (i = 1; i < maxX / 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 8, i * (width - offset) / maxX * 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 16 && maxX < 32){
		for (i = 1; i < maxX / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 4, i * (width - offset) / maxX * 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 8 && maxX < 16){
		for (i = 1; i < maxX; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, i * (width - offset) / maxX * 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 4 && maxX < 8){
		for (i = 1; i < maxX*2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, i * (width - offset) / maxX * 1 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 2 && maxX < 4){
		for (i = 1; i < maxX * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 2, i * (width - offset) / maxX / 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 1 && maxX < 2){
		for (i = 1; i < maxX * 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 4, i * (width - offset) / maxX / 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 1 && maxX > 0.5){
		for (i = 1; i < maxX * 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 8, i * (width - offset) / maxX / 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.5 && maxX > 0.25){
		for (i = 1; i < maxX * 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset + 16);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 16, i * (width - offset) / maxX / 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.25){
		for (i = 1; i < maxX * 64; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset + 32);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 32, i * (width - offset) / maxX / 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, 0);
			ctx.stroke();
		}
	}
	
	//draw scale Y
	if (maxY > 100000){
		for (i = 1; i < maxY / 20000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50000, 0.1 * offset, - i * (height - offset) / maxY * 50000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 25000 && maxY < 100000){
		for (i = 1; i < maxY / 5000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5000, 0.1 * offset, - i * (height - offset) / maxY * 5000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10000 && maxY < 25000){
		for (i = 1; i < maxY / 2000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2500, 0.1 * offset, - i * (height - offset) / maxY * 2500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 5000 && maxY < 10000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1000, 0.1 * offset, - i * (height - offset) / maxY * 1000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 2000 && maxY < 5000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 500, 0.1 * offset, - i * (height - offset) / maxY * 500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 1000 && maxY < 2000){
		for (i = 1; i < maxY / 200; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 200, 0.1 * offset, - i * (height - offset) / maxY * 200 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 500 && maxY < 1000){
		for (i = 1; i < maxY / 100; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100, 0.1 * offset, - i * (height - offset) / maxY * 100 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 200 && maxY < 500){
		for (i = 1; i < maxY / 40; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50, 0.1 * offset, - i * (height - offset) / maxY * 50 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100 && maxY < 200){
		for (i = 1; i < maxY / 20; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 25, 0.1 * offset, - i * (height - offset) / maxY * 25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 50 && maxY < 100){
		for (i = 1; i < maxY / 10; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 10, 0.1 * offset, - i * (height - offset) / maxY * 10 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10 && maxY < 50){
		for (i = 1; i < maxY / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5, 0.1 * offset, - i * (height - offset) / maxY * 5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY < 10){
		for (i = 1; i < maxY * 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, 0.1 * offset, - i * (height - offset) / maxY * 2 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
		}
	}
	
	ctx.beginPath();	
	ctx.moveTo(offset, height - offset);
	ctx.strokeStyle = "#000000";
	ctx.setLineDash([]);
	
	//draw ascent velocity of stage 1
	for (i = 0; i < plotDataStorage.velocity1.length; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.velocity1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	//draw landing velocity of stage 1
	ctx.beginPath();
	ctx.moveTo(offset, height - offset);
	ctx.setLineDash([2,2]);
	for (i = 0; i < plotDataStorage.landingVelocity1.length; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingVelocity1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	if (stagesNum >= 2){
		ctx.beginPath();
		ctx.moveTo(offset, height - plotDataStorage.velocity2[0] * (height - offset) / maxY - offset);
		ctx.strokeStyle = "DarkBlue";
		ctx.setLineDash([]);
		
		//draw ascent velocity of stage 2
		for (i = 0; i < plotDataStorage.velocity2.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.velocity2[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
		
		ctx.beginPath();
		ctx.setLineDash([2,2]);
		//draw landing velocity of stage 2
		ctx.moveTo(offset, height - plotDataStorage.landingVelocity2[0] * (height - offset) / maxY - offset);
		for	(i = 0; i < plotDataStorage.landingVelocity2.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingVelocity2[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
		
	}
	
	if (stagesNum == 3){
		ctx.beginPath();
		ctx.moveTo(offset, height - plotDataStorage.velocity3[0] * (height - offset) / maxY - offset);
		ctx.strokeStyle = "DarkGreen";
	  ctx.setLineDash([]);
		//draw ascent velocity of stage 3
		for (i = 0; i < plotDataStorage.velocity3.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.velocity3[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
		
		//draw landing velocity of stage 3
		ctx.beginPath();
		ctx.moveTo(offset, height - plotDataStorage.landingVelocity3[0] * (height - offset) / maxY - offset);
		ctx.setLineDash([2,2]);
		for	(i = 0; i < plotDataStorage.landingVelocity3.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingVelocity3[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	}
	
}

function drawAccelerationPlot() {
  var stagesNum = parseInt(numberOfStages.value);
	var accelerationPlot = document.getElementById("accelerationPlot");
  var ctx = accelerationPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max(Math.max.apply(null, plotDataStorage.landingAcceleration1), Math.max.apply(null, plotDataStorage.acceleration1),
											Math.max.apply(null, plotDataStorage.landingAcceleration2), Math.max.apply(null, plotDataStorage.acceleration2),
											Math.max.apply(null, plotDataStorage.landingAcceleration3), Math.max.apply(null, plotDataStorage.acceleration3));		 
	var maxX = Math.max(plotDataStorage.landingAcceleration1.length * plotDataStorage.dt, plotDataStorage.acceleration1.length * plotDataStorage.dt,
											plotDataStorage.landingAcceleration2.length * plotDataStorage.dt, plotDataStorage.acceleration2.length * plotDataStorage.dt,
											plotDataStorage.landingAcceleration3.length * plotDataStorage.dt, plotDataStorage.acceleration3.length * plotDataStorage.dt);
	var readWidth = document.getElementById("accelerationPlotCell").offsetWidth;
	ctx.canvas.width = readWidth - canvasOffset;
	ctx.canvas.height = readWidth - canvasOffset;
	var height = accelerationPlot.height;
	var width = accelerationPlot.width;
	
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
  ctx.fillStyle = "#000000";
	ctx.font = "12px sans-serif";
	
	//draw x and y axes with arrows
	ctx.beginPath();
	ctx.moveTo(offset, 0);
	ctx.lineTo(offset - 2, 10);
	ctx.lineTo(offset + 2, 10);
	ctx.lineTo(offset, 0);
	ctx.lineTo(offset, height - offset);
	ctx.lineTo(width, height - offset);
	ctx.lineTo(width - 10, height - offset + 2);
	ctx.lineTo(width - 10, height - offset - 2);
	ctx.lineTo(width, height - offset);
  ctx.stroke();
	
	//draw scale X
	if (maxX > 256){
		for (i = 1; i < maxX / 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 64, i * (width - offset) / maxX * 64 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 128 && maxX < 256){
		for (i = 1; i < maxX / 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 32, i * (width - offset) / maxX * 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 64 && maxX < 128){
		for (i = 1; i < maxX / 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 16, i * (width - offset) / maxX * 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 32 && maxX < 64){
		for (i = 1; i < maxX / 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 8, i * (width - offset) / maxX * 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 16 && maxX < 32){
		for (i = 1; i < maxX / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 4, i * (width - offset) / maxX * 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 8 && maxX < 16){
		for (i = 1; i < maxX; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, i * (width - offset) / maxX * 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 4 && maxX < 8){
		for (i = 1; i < maxX*2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, i * (width - offset) / maxX * 1 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 2 && maxX < 4){
		for (i = 1; i < maxX * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 2, i * (width - offset) / maxX / 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 1 && maxX < 2){
		for (i = 1; i < maxX * 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 4, i * (width - offset) / maxX / 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 1 && maxX > 0.5){
		for (i = 1; i < maxX * 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 8, i * (width - offset) / maxX / 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.5 && maxX > 0.25){
		for (i = 1; i < maxX * 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset + 16);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 16, i * (width - offset) / maxX / 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.25){
		for (i = 1; i < maxX * 64; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset + 32);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 16, i * (width - offset) / maxX / 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, 0);
			ctx.stroke();
		}
	}
	
	//draw scale Y
	if (maxY > 100000){
		for (i = 1; i < maxY / 20000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50000, 0.1 * offset, - i * (height - offset) / maxY * 50000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 25000 && maxY < 100000){
		for (i = 1; i < maxY / 5000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5000, 0.1 * offset, - i * (height - offset) / maxY * 5000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10000 && maxY < 25000){
		for (i = 1; i < maxY / 2000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2500, 0.1 * offset, - i * (height - offset) / maxY * 2500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 5000 && maxY < 10000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1000, 0.1 * offset, - i * (height - offset) / maxY * 1000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 2000 && maxY < 5000){
		for (i = 1; i < maxY / 400; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 500, 0.1 * offset, - i * (height - offset) / maxY * 500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 1000 && maxY < 2000){
		for (i = 1; i < maxY / 200; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 200, 0.1 * offset, - i * (height - offset) / maxY * 200 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 500 && maxY < 1000){
		for (i = 1; i < maxY / 100; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100, 0.1 * offset, - i * (height - offset) / maxY * 100 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 200 && maxY < 500){
		for (i = 1; i < maxY / 40; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50, 0.1 * offset, - i * (height - offset) / maxY * 50 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100 && maxY < 200){
		for (i = 1; i < maxY / 20; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 25, 0.1 * offset, - i * (height - offset) / maxY * 25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 50 && maxY < 100){
		for (i = 1; i < maxY / 10; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 10, 0.1 * offset, - i * (height - offset) / maxY * 10 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10 && maxY < 50){
		for (i = 1; i < maxY / 5; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5, 0.1 * offset, - i * (height - offset) / maxY * 5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 8 && maxY < 10){
		for (i = 1; i < maxY * 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, 0.1 * offset, - i * (height - offset) / maxY * 2 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 4 && maxY < 8){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, 0.1 * offset, - i * (height - offset) / maxY * 1 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.stroke();
		}
	}
	
	if (maxY > 2 && maxY < 4){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 0.5, 0.1 * offset, - i * (height - offset) / maxY * 0.5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.stroke();
		}
	}
	
	if (maxY > 0 && maxY < 2){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 0.25, 0.1 * offset, - i * (height - offset) / maxY * 0.25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.stroke();
		}
	}
	
	ctx.beginPath();	
	ctx.moveTo(offset, height - offset);
	ctx.strokeStyle = "#000000";
	ctx.setLineDash([]);
	
	//draw ascent acceleration of first stage
	for (i = 0; i < plotDataStorage.acceleration1.length; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.acceleration1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	//draw landing acceleration of first stage
	ctx.beginPath();
	ctx.moveTo(offset, height - offset);
	ctx.setLineDash([2,2]);
	for (i = 0; i < plotDataStorage.landingAcceleration1.length; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingAcceleration1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	if (stagesNum >= 2){
		ctx.beginPath();
		ctx.moveTo(offset, height - plotDataStorage.acceleration2[0] * (height - offset) / maxY - offset);
		ctx.strokeStyle = "DarkBlue";
		ctx.setLineDash([]);
		
		//draw ascent acceleration of stage 2
		for (i = 0; i < plotDataStorage.acceleration2.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.acceleration2[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	
		//draw landing acceleration of stage 2
		ctx.beginPath();
		ctx.setLineDash([2,2]);
		ctx.moveTo(offset, height - plotDataStorage.landingAcceleration2[0] * (height - offset) / maxY - offset);
		for	(i = 0; i < plotDataStorage.landingAcceleration2.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingAcceleration2[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	}
	
	if (stagesNum == 3){
		ctx.beginPath();
		ctx.moveTo(offset, height - plotDataStorage.acceleration3[0] * (height - offset) / maxY - offset);
		ctx.strokeStyle = "DarkGreen";
		ctx.setLineDash([]);
		//draw ascent acceleration of stage 3
		for (i = 0; i < plotDataStorage.acceleration3.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.acceleration3[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	
		//draw landing acceleration of stage 3
		ctx.beginPath();
    ctx.setLineDash([2,2]);
		ctx.moveTo(offset, height - plotDataStorage.landingAcceleration3[0] * (height - offset) / maxY - offset);
		for	(i = 0; i < plotDataStorage.landingAcceleration3.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingAcceleration3[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	}
}

function drawThrustPlot() {
  var stagesNum = parseInt(numberOfStages.value);
	var thrustPlot = document.getElementById("thrustPlot");
  var ctx = thrustPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max(Math.max.apply(null, plotDataStorage.thrust1), Math.max.apply(null, plotDataStorage.landingThrust1),
											Math.max.apply(null, plotDataStorage.thrust2), Math.max.apply(null, plotDataStorage.landingThrust2),
											Math.max.apply(null, plotDataStorage.thrust3), Math.max.apply(null, plotDataStorage.landingThrust3));		 
	var maxX = Math.max(plotDataStorage.thrust1.length * plotDataStorage.dt, plotDataStorage.landingThrust1.length * plotDataStorage.dt,
											plotDataStorage.thrust2.length * plotDataStorage.dt, plotDataStorage.landingThrust2.length * plotDataStorage.dt,
											plotDataStorage.thrust3.length * plotDataStorage.dt, plotDataStorage.landingThrust3.length * plotDataStorage.dt);
	var readWidth = document.getElementById("thrustPlotCell").offsetWidth;
	ctx.canvas.width = readWidth - canvasOffset;
	ctx.canvas.height = readWidth - canvasOffset;
	var height = thrustPlot.height;
	var width = thrustPlot.width;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
  ctx.fillStyle = "#000000";
	ctx.font = "12px sans-serif";
	
	//draw x and y axes with arrows
	ctx.beginPath();
	ctx.moveTo(offset, 0);
	ctx.lineTo(offset - 2, 10);
	ctx.lineTo(offset + 2, 10);
	ctx.lineTo(offset, 0);
	ctx.lineTo(offset, height - offset);
	ctx.lineTo(width, height - offset);
	ctx.lineTo(width - 10, height - offset + 2);
	ctx.lineTo(width - 10, height - offset - 2);
	ctx.lineTo(width, height - offset);
  ctx.stroke();
	
	//draw scale X
	if (maxX > 256){
		for (i = 1; i < maxX / 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 64, i * (width - offset) / maxX * 64 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 128 && maxX < 256){
		for (i = 1; i < maxX / 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 32, i * (width - offset) / maxX * 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 64 && maxX < 128){
		for (i = 1; i < maxX / 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 16, i * (width - offset) / maxX * 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 32 && maxX < 64){
		for (i = 1; i < maxX / 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 8, i * (width - offset) / maxX * 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 16 && maxX < 32){
		for (i = 1; i < maxX / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 4, i * (width - offset) / maxX * 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 8 && maxX < 16){
		for (i = 1; i < maxX; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, i * (width - offset) / maxX * 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 4 && maxX < 8){
		for (i = 1; i < maxX*2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, i * (width - offset) / maxX * 1 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 2 && maxX < 4){
		for (i = 1; i < maxX * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 2, i * (width - offset) / maxX / 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 1 && maxX < 2){
		for (i = 1; i < maxX * 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 4, i * (width - offset) / maxX / 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 1 && maxX > 0.5){
		for (i = 1; i < maxX * 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 8, i * (width - offset) / maxX / 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.5 && maxX > 0.25){
		for (i = 1; i < maxX * 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset + 16);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 16, i * (width - offset) / maxX / 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.25){
		for (i = 1; i < maxX * 64; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset + 32);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 32, i * (width - offset) / maxX / 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, 0);
			ctx.stroke();
		}
	}
	
	//draw scale Y
	if (maxY > 100000){
		for (i = 1; i < maxY / 20000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50000, 0.1 * offset, - i * (height - offset) / maxY * 50000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 25000 && maxY < 100000){
		for (i = 1; i < maxY / 5000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5000, 0.1 * offset, - i * (height - offset) / maxY * 5000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10000 && maxY < 25000){
		for (i = 1; i < maxY / 2000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2500, 0.1 * offset, - i * (height - offset) / maxY * 2500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 5000 && maxY < 10000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1000, 0.1 * offset, - i * (height - offset) / maxY * 1000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 2000 && maxY < 5000){
		for (i = 1; i < maxY / 400; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 500, 0.1 * offset, - i * (height - offset) / maxY * 500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 1000 && maxY < 2000){
		for (i = 1; i < maxY / 200; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 200, 0.1 * offset, - i * (height - offset) / maxY * 200 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 500 && maxY < 1000){
		for (i = 1; i < maxY / 100; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100, 0.1 * offset, - i * (height - offset) / maxY * 100 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 200 && maxY < 500){
		for (i = 1; i < maxY / 40; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50, 0.1 * offset, - i * (height - offset) / maxY * 50 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100 && maxY < 200){
		for (i = 1; i < maxY / 20; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 25, 0.1 * offset, - i * (height - offset) / maxY * 25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 50 && maxY < 100){
		for (i = 1; i < maxY / 10; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 10, 0.1 * offset, - i * (height - offset) / maxY * 10 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10 && maxY < 50){
		for (i = 1; i < maxY / 5; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5, 0.1 * offset, - i * (height - offset) / maxY * 5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY < 10){
		for (i = 1; i < maxY * 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, 0.1 * offset, - i * (height - offset) / maxY * 2 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
		}
	}
	
	ctx.beginPath();	
	ctx.moveTo(offset, height - offset);
	ctx.strokeStyle = "#000000";
	ctx.setLineDash([]);
	
	//draw ascent thrust of the first stage
	for (i = 0; i < plotDataStorage.thrust1.length; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.thrust1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	//draw landing thrust of the first stage
	ctx.beginPath();
	ctx.moveTo(offset, height - offset);
	ctx.setLineDash([2,2]);
	for (i = 0; i < plotDataStorage.landingThrust1.length; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingThrust1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	if (stagesNum >= 2){
		ctx.beginPath();
		ctx.moveTo(offset, height - plotDataStorage.thrust2[0] * (height - offset) / maxY - offset);
		ctx.strokeStyle = "DarkBlue";
    ctx.setLineDash([]);
		
		//draw ascent thrust of stage 2
		for (i = 0; i < plotDataStorage.thrust2.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.thrust2[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	
		//draw landing thrust of stage 2
		ctx.beginPath();
	  ctx.setLineDash([2,2]);
		ctx.moveTo(offset, height - plotDataStorage.landingThrust2[0] * (height - offset) / maxY - offset);
		for	(i = 0; i < plotDataStorage.landingThrust2.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingThrust2[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	}
	
	if (stagesNum == 3){
		ctx.beginPath();
		ctx.moveTo(offset, height - plotDataStorage.thrust3[0] * (height - offset) / maxY - offset);
		ctx.strokeStyle = "DarkGreen";
	  ctx.setLineDash([]);
		//draw ascent thrust of stage 3
		for (i = 0; i < plotDataStorage.thrust3.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.thrust3[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();

		//draw landing thrust of stage 3
		ctx.beginPath();
		ctx.setLineDash([2,2]);
		ctx.moveTo(offset, height - plotDataStorage.landingThrust3[0] * (height - offset) / maxY - offset);
		for	(i = 0; i < plotDataStorage.landingThrust3.length; i++){
	  	ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingThrust3[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	}
}

function drawEnergyPlot() {
	var stagesNum = parseInt(numberOfStages.value);
  var altitudePlot = document.getElementById("energyPlot");
  var ctx = energyPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max(Math.max.apply(null, plotDataStorage.kineticEnergy1),
											Math.max.apply(null, plotDataStorage.mechanicalEnergy1),
											Math.max.apply(null, plotDataStorage.kineticEnergy2),
											Math.max.apply(null, plotDataStorage.mechanicalEnergy2),
											Math.max.apply(null, plotDataStorage.kineticEnergy3),
											Math.max.apply(null, plotDataStorage.mechanicalEnergy3));
	var maxX = Math.max(plotDataStorage.kineticEnergy1.length, plotDataStorage.mechanicalEnergy1.length,
											plotDataStorage.kineticEnergy2.length, plotDataStorage.mechanicalEnergy2.length,
											plotDataStorage.kineticEnergy3.length, plotDataStorage.mechanicalEnergy3.length) * plotDataStorage.dt;
	var readWidth = document.getElementById("altitudePlotCell").offsetWidth;
	ctx.canvas.width = readWidth - canvasOffset;
	ctx.canvas.height = readWidth - canvasOffset;
	var height = altitudePlot.height;
	var width = altitudePlot.width;
	
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
  ctx.fillStyle = "#000000";
	ctx.font = "12px sans-serif";
	
	//draw x and y axes with arrows
	ctx.beginPath();
	ctx.moveTo(offset, 0);
	ctx.lineTo(offset - 2, 10);
	ctx.lineTo(offset + 2, 10);
	ctx.lineTo(offset, 0);
	ctx.lineTo(offset, height - offset);
	ctx.lineTo(width, height - offset);
	ctx.lineTo(width - 10, height - offset + 2);
	ctx.lineTo(width - 10, height - offset - 2);
	ctx.lineTo(width, height - offset);
  ctx.stroke();
	
	//draw scale X
	
	if (maxX > 256){
		for (i = 1; i < maxX / 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 64, i * (width - offset) / maxX * 64 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 128 && maxX < 256){
		for (i = 1; i < maxX / 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 32, i * (width - offset) / maxX * 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 64 && maxX < 128){
		for (i = 1; i < maxX / 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 16, i * (width - offset) / maxX * 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 32 && maxX < 64){
		for (i = 1; i < maxX / 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 8, i * (width - offset) / maxX * 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 16 && maxX < 32){
		for (i = 1; i < maxX / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 4, i * (width - offset) / maxX * 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 8 && maxX < 16){
		for (i = 1; i < maxX; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, i * (width - offset) / maxX * 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 4 && maxX < 8){
		for (i = 1; i < maxX*2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, i * (width - offset) / maxX * 1 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 2 && maxX < 4){
		for (i = 1; i < maxX * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 2, i * (width - offset) / maxX / 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 1 && maxX < 2){
		for (i = 1; i < maxX * 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 4, i * (width - offset) / maxX / 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 1 && maxX > 0.5){
		for (i = 1; i < maxX * 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 8, i * (width - offset) / maxX / 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.5 && maxX > 0.25){
		for (i = 1; i < maxX * 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset + 16);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 16, i * (width - offset) / maxX / 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.25){
		for (i = 1; i < maxX * 64; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset + 32);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 32, i * (width - offset) / maxX / 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, 0);
			ctx.stroke();
		}
	}
	
	//draw scale Y
	if (maxY > 500000){
		for (i = 1; i < maxY / 40000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 100000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 100000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100000, 0.1 * offset, - i * (height - offset) / maxY * 100000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 100000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100000 && maxY < 500000){
		for (i = 1; i < maxY / 20000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50000, 0.1 * offset, - i * (height - offset) / maxY * 50000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 25000 && maxY < 100000){
		for (i = 1; i < maxY / 5000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5000, 0.1 * offset, - i * (height - offset) / maxY * 5000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10000 && maxY < 25000){
		for (i = 1; i < maxY / 2000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2500, 0.1 * offset, - i * (height - offset) / maxY * 2500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 5000 && maxY < 10000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1000, 0.1 * offset, - i * (height - offset) / maxY * 1000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 2000 && maxY < 5000){
		for (i = 1; i < maxY / 400; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 500, 0.1 * offset, - i * (height - offset) / maxY * 500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 1000 && maxY < 2000){
		for (i = 1; i < maxY / 200; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 200, 0.1 * offset, - i * (height - offset) / maxY * 200 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 500 && maxY < 1000){
		for (i = 1; i < maxY / 100; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100, 0.1 * offset, - i * (height - offset) / maxY * 100 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 200 && maxY < 500){
		for (i = 1; i < maxY / 40; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50, 0.1 * offset, - i * (height - offset) / maxY * 50 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100 && maxY < 200){
		for (i = 1; i < maxY / 20; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 25, 0.1 * offset, - i * (height - offset) / maxY * 25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 50 && maxY < 100){
		for (i = 1; i < maxY / 10; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 10, 0.1 * offset, - i * (height - offset) / maxY * 10 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10 && maxY < 50){
		for (i = 1; i < maxY / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5, 0.1 * offset, - i * (height - offset) / maxY * 5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 8 && maxY < 10){
		for (i = 1; i < maxY * 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, 0.1 * offset, - i * (height - offset) / maxY * 2 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 4 && maxY < 8){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, 0.1 * offset, - i * (height - offset) / maxY * 1 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.stroke();
		}
	}
	
	if (maxY > 2 && maxY < 4){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 0.5, 0.1 * offset, - i * (height - offset) / maxY * 0.5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.stroke();
		}
	}
	
	if (maxY > 0 && maxY < 2){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 0.25, 0.1 * offset, - i * (height - offset) / maxY * 0.25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.stroke();
		}
	}
	
	ctx.beginPath();	
	ctx.moveTo(offset, height - offset);
	ctx.strokeStyle = "#000000";
	ctx.setLineDash([]);
	
	//kinetic energy of stage 1
	for (i = 0; i < maxX / plotDataStorage.dt; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.kineticEnergy1[i] * (height - offset) / maxY - offset);
	}
	ctx.moveTo(offset, height - offset);
	
	
	//mechanical energy of stage 1
	for (i = 0; i < maxX / plotDataStorage.dt; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.mechanicalEnergy1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();

	//kinetic energy of stage 2
	ctx.beginPath();
	ctx.strokeStyle = "DarkBlue";
	ctx.moveTo(offset, height - plotDataStorage.kineticEnergy2[0] * (height - offset) / maxY - offset);	
	for (i = 0; i < maxX / plotDataStorage.dt; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.kineticEnergy2[i] * (height - offset) / maxY - offset);
	}
	ctx.moveTo(offset, height - plotDataStorage.mechanicalEnergy2[0] * (height - offset) / maxY - offset);
	
	//mechanical energy of stage 2
	for (i = 0; i < maxX / plotDataStorage.dt; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.mechanicalEnergy2[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	//kinetic energy of stage 3
	ctx.beginPath();
	ctx.strokeStyle = "DarkGreen";
	ctx.moveTo(offset, height - plotDataStorage.kineticEnergy3[0] * (height - offset) / maxY - offset);
	for (i = 0; i < maxX / plotDataStorage.dt; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.kineticEnergy3[i] * (height - offset) / maxY - offset);
	}
	ctx.moveTo(offset, height - plotDataStorage.mechanicalEnergy3[0] * (height - offset) / maxY - offset);

	//mechanical energy of stage 3
	for (i = 0; i < maxX / plotDataStorage.dt; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.mechanicalEnergy3[i] * (height - offset) / maxY - offset);
	}
	
	ctx.stroke();
	
	
}

function drawExhaustPlot() {
  var stagesNum = parseInt(numberOfStages.value);
	var exhaustPlot = document.getElementById("exhaustPlot");
  var ctx = exhaustPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max(Math.max.apply(null, plotDataStorage.exhaust1),
											Math.max.apply(null, plotDataStorage.exhaust2),
											Math.max.apply(null, plotDataStorage.exhaust3),
											Math.max.apply(null, plotDataStorage.landingExhaust1),
											Math.max.apply(null, plotDataStorage.landingExhaust2),
											Math.max.apply(null, plotDataStorage.landingExhaust3));
	
	var maxX = Math.max(plotDataStorage.exhaust1.length, plotDataStorage.landingExhaust1.length,
											plotDataStorage.exhaust2.length, plotDataStorage.landingExhaust2.length,
											plotDataStorage.exhaust3.length, plotDataStorage.landingExhaust3.length) * plotDataStorage.dt;
	var readWidth = document.getElementById("altitudePlotCell").offsetWidth;
	ctx.canvas.width = readWidth - canvasOffset;
	ctx.canvas.height = readWidth - canvasOffset;
	var height = exhaustPlot.height;
	var width = exhaustPlot.width;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height); //fill backgrund of the plot with white color
  ctx.fillStyle = "#000000";
	ctx.font = "12px sans-serif";

	//draw x and y axes with arrows
	ctx.beginPath();
	ctx.moveTo(offset, 0);
	ctx.lineTo(offset - 2, 10);
	ctx.lineTo(offset + 2, 10);
	ctx.lineTo(offset, 0);
	ctx.lineTo(offset, height - offset);
	ctx.lineTo(width, height - offset);
	ctx.lineTo(width - 10, height - offset + 2);
	ctx.lineTo(width - 10, height - offset - 2);
	ctx.lineTo(width, height - offset);
  ctx.stroke();
	
	
	
	//draw x and y axes with arrows
	ctx.beginPath();
	ctx.moveTo(offset, 0);
	ctx.lineTo(offset - 2, 10);
	ctx.lineTo(offset + 2, 10);
	ctx.lineTo(offset, 0);
	ctx.lineTo(offset, height - offset);
	ctx.lineTo(width, height - offset);
	ctx.lineTo(width - 10, height - offset + 2);
	ctx.lineTo(width - 10, height - offset - 2);
	ctx.lineTo(width, height - offset);
  ctx.stroke();
	
	//draw scale X
	
	if (maxX > 256){
		for (i = 1; i < maxX / 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 64, i * (width - offset) / maxX * 64 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 64 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 64 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 128 && maxX < 256){
		for (i = 1; i < maxX / 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 32, i * (width - offset) / maxX * 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 32 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 64 && maxX < 128){
		for (i = 1; i < maxX / 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 16, i * (width - offset) / maxX * 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 32 && maxX < 64){
		for (i = 1; i < maxX / 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 8, i * (width - offset) / maxX * 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 16 && maxX < 32){
		for (i = 1; i < maxX / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 4, i * (width - offset) / maxX * 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 8 && maxX < 16){
		for (i = 1; i < maxX; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, i * (width - offset) / maxX * 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 4 && maxX < 8){
		for (i = 1; i < maxX*2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, i * (width - offset) / maxX * 1 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX * 1 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX * 1 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 2 && maxX < 4){
		for (i = 1; i < maxX * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 2, i * (width - offset) / maxX / 2 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 2 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 2 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX > 1 && maxX < 2){
		for (i = 1; i < maxX * 8; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 4, i * (width - offset) / maxX / 4 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 4 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 4 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 1 && maxX > 0.5){
		for (i = 1; i < maxX * 16; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset + 8);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 8, i * (width - offset) / maxX / 8 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 8 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 8 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.5 && maxX > 0.25){
		for (i = 1; i < maxX * 32; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset + 16);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 16, i * (width - offset) / maxX / 16 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 16 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 16 + offset, 0);
			ctx.stroke();
		}
	}
	if (maxX < 0.25){
		for (i = 1; i < maxX * 64; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset + 32);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.stroke();
			ctx.strokeText(i / 32, i * (width - offset) / maxX / 32 + offset - 5, height - .5 * offset);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(i * (width - offset) / maxX / 32 + offset, height - offset);
			ctx.lineTo(i * (width - offset) / maxX / 32 + offset, 0);
			ctx.stroke();
		}
	}
	
	//draw scale Y
	if (maxY > 500000){
		for (i = 1; i < maxY / 40000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 100000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 100000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100000, 0.1 * offset, - i * (height - offset) / maxY * 100000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 100000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100000 && maxY < 500000){
		for (i = 1; i < maxY / 20000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50000, 0.1 * offset, - i * (height - offset) / maxY * 50000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 25000 && maxY < 100000){
		for (i = 1; i < maxY / 5000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5000, 0.1 * offset, - i * (height - offset) / maxY * 5000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10000 && maxY < 25000){
		for (i = 1; i < maxY / 2000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2500, 0.1 * offset, - i * (height - offset) / maxY * 2500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 5000 && maxY < 10000){
		for (i = 1; i < maxY / 1000; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1000, 0.1 * offset, - i * (height - offset) / maxY * 1000 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1000 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 2000 && maxY < 5000){
		for (i = 1; i < maxY / 400; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 500, 0.1 * offset, - i * (height - offset) / maxY * 500 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 500 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 1000 && maxY < 2000){
		for (i = 1; i < maxY / 200; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 200, 0.1 * offset, - i * (height - offset) / maxY * 200 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 200 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 500 && maxY < 1000){
		for (i = 1; i < maxY / 100; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 100, 0.1 * offset, - i * (height - offset) / maxY * 100 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 100 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 200 && maxY < 500){
		for (i = 1; i < maxY / 40; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 50, 0.1 * offset, - i * (height - offset) / maxY * 50 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 50 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 100 && maxY < 200){
		for (i = 1; i < maxY / 20; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 25, 0.1 * offset, - i * (height - offset) / maxY * 25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 25 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 50 && maxY < 100){
		for (i = 1; i < maxY / 10; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 10, 0.1 * offset, - i * (height - offset) / maxY * 10 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 10 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 10 && maxY < 50){
		for (i = 1; i < maxY / 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 5, 0.1 * offset, - i * (height - offset) / maxY * 5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 5 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 8 && maxY < 10){
		for (i = 1; i < maxY * 2; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 2, 0.1 * offset, - i * (height - offset) / maxY * 2 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 2 + height - offset);
			ctx.stroke();
		}
	}
	if (maxY > 4 && maxY < 8){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 1, 0.1 * offset, - i * (height - offset) / maxY * 1 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 1 + height - offset);
			ctx.stroke();
		}
	}
	
	if (maxY > 2 && maxY < 4){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 0.5, 0.1 * offset, - i * (height - offset) / maxY * 0.5 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 0.5 + height - offset);
			ctx.stroke();
		}
	}
	
	if (maxY > 0 && maxY < 2){
		for (i = 1; i < maxY * 4; i++){
			ctx.beginPath();
			ctx.setLineDash([]);
			ctx.strokeStyle = "#000000";
			ctx.moveTo(offset - 8, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.lineTo(offset, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.stroke();
			ctx.strokeText(i * 0.25, 0.1 * offset, - i * (height - offset) / maxY * 0.25 + height - offset + 3);
			ctx.beginPath();
			ctx.strokeStyle = "#999999";
			ctx.setLineDash([10,15]);
			ctx.moveTo(offset, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.lineTo(width, - i * (height - offset) / maxY * 0.25 + height - offset);
			ctx.stroke();
		}
	}
	
	
	ctx.beginPath();	
	ctx.strokeStyle = "#000000";
	ctx.setLineDash([]);
	
	//ascending exhaust vaelocity for stage 1
	ctx.moveTo(offset, height - plotDataStorage.exhaust1[0] * (height - offset) / maxY - offset);	
	for (i = 0; i < maxX / plotDataStorage.dt; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.exhaust1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
		
	//landing exhaust vaelocity for stage 1
	ctx.beginPath();
	ctx.setLineDash([2,2]);
	ctx.moveTo(offset, height - plotDataStorage.landingExhaust1[0] * (height - offset) / maxY - offset);	
	for (i = 0; i < maxX / plotDataStorage.dt; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingExhaust1[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
	
	if(stagesNum >= 2){
		ctx.beginPath();	
		ctx.strokeStyle = "DarkBlue";
		ctx.setLineDash([]);
	
		//ascending exhaust vaelocity for stage 2
		ctx.moveTo(offset, height - plotDataStorage.exhaust2[0] * (height - offset) / maxY - offset);	
		for (i = 0; i < maxX / plotDataStorage.dt; i++){
		  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.exhaust2[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
		
		//landing exhaust vaelocity for stage 2
		ctx.beginPath();
		ctx.setLineDash([2,2]);
		ctx.moveTo(offset, height - plotDataStorage.landingExhaust2[0] * (height - offset) / maxY - offset);	
		for (i = 0; i < maxX / plotDataStorage.dt; i++){
		  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingExhaust2[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	}
	
	if(stagesNum += 3){
		ctx.beginPath();	
		ctx.strokeStyle = "DarkGreen";
		ctx.setLineDash([]);
	
		//ascending exhaust vaelocity for stage 3
		ctx.moveTo(offset, height - plotDataStorage.exhaust3[0] * (height - offset) / maxY - offset);	
		for (i = 0; i < maxX / plotDataStorage.dt; i++){
		  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.exhaust3[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
		
		//landing exhaust vaelocity for stage 3
		ctx.beginPath();
		ctx.setLineDash([2,2]);
		ctx.moveTo(offset, height - plotDataStorage.landingExhaust3[0] * (height - offset) / maxY - offset);	
		for (i = 0; i < maxX / plotDataStorage.dt; i++){
		  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.landingExhaust3[i] * (height - offset) / maxY - offset);
		}
		ctx.stroke();
	}
}

