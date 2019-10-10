function drawPlots(){
	drawAltitudePlot();
	drawVelocityPlot();
	drawAccelerationPlot();
	drawThrustPlot();
	//drawExhaustPlot();
	
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
	var maxY = Math.max.apply(null, plotDataStorage.altitude1);
	var maxX = (plotDataStorage.altitude1.length + plotDataStorage.landingAltitude1.length) * plotDataStorage.dt;
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
	
	//ascending line of stage 1
	for (i = 0; i < plotDataStorage.altitude1.length; i++){
	  ctx.lineTo(i * (width - offset) / (maxX / plotDataStorage.dt) + offset, height - plotDataStorage.altitude1[i] * (height - offset) / maxY - offset);
	}
	//ascending line of stage 2
	ctx.moveTo(offset + plotDataStorage.altitude1.length * plotDataStorage.dt / maxX * (width - offset), height - offset - plotDataStorage.altitude2[0] / maxY * (height - offset));
	for (i = 0; i < plotDataStorage.altitude2.length; i++){
	  ctx.lineTo(i * (width - offset - plotDataStorage.altitude1.length * plotDataStorage.dt / maxX * (width - offset)) / (plotDataStorage.altitude2.length) + offset, height - plotDataStorage.altitude2[i] * (height - offset) / maxY - offset);
	}
	
	//descending line of stage 1
	ctx.moveTo(offset + plotDataStorage.altitude1.length * plotDataStorage.dt / maxX * (width - offset), height - offset - plotDataStorage.landingAltitude1[0] / maxY * (height - offset));
	for (i = 0; i < plotDataStorage.landingAltitude1.length; i++){
	  ctx.lineTo(width - (plotDataStorage.landingAltitude1.length * plotDataStorage.dt) / maxX * (width - offset) + i * plotDataStorage.landingAltitude1.length * plotDataStorage.dt / maxX * (width - offset) / plotDataStorage.landingAltitude1.length, height - offset - plotDataStorage.landingAltitude1[i] / maxY * (height - offset))
	}
		
	
	ctx.stroke();
}

function drawVelocityPlot() {
  var velocityPlot = document.getElementById("velocityPlot");
  var ctx = velocityPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max.apply(null, plotDataStorage.velocity);
	var maxX = plotDataStorage.fl;
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
	
	for (i = 0; i < plotDataStorage.velocity.length; i++){
	  ctx.lineTo(i * (width - offset) / (plotDataStorage.velocity.length) + offset, height - plotDataStorage.velocity[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
}

function drawAccelerationPlot() {
  var accelerationPlot = document.getElementById("accelerationPlot");
  var ctx = accelerationPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max.apply(null, plotDataStorage.acceleration);
	var maxX = plotDataStorage.al;
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
	
	for (i = 0; i < plotDataStorage.acceleration.length; i++){
	  ctx.lineTo(i * (width - offset) / (plotDataStorage.acceleration.length) + offset, height - plotDataStorage.acceleration[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
}

function drawThrustPlot() {
  var thrustPlot = document.getElementById("thrustPlot");
  var ctx = thrustPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max.apply(null, plotDataStorage.thrust);
	var maxX = plotDataStorage.al;
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
	
	for (i = 0; i < plotDataStorage.thrust.length; i++){
	  ctx.lineTo(i * (width - offset) / (plotDataStorage.thrust.length) + offset, height - plotDataStorage.thrust[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
}

function drawExhaustPlot() {
  var exhaustPlot = document.getElementById("exhaustPlot");
  var ctx = exhaustPlot.getContext("2d");
	var offset = 40;
	var canvasOffset = 10;
	var maxY = Math.max.apply(null, plotDataStorage.exhaust);
	var maxX = plotDataStorage.al;
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
	if (maxX < 1){
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
	
	for (i = 0; i < plotDataStorage.exhaust.length; i++){
	  ctx.lineTo(i * (width - offset) / (plotDataStorage.exhaust.length) + offset, height - plotDataStorage.exhaust[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
}
function drawLandingAltitudePlot1() {
  var altitudePlot = document.getElementById("altitudePlot");
  var ctx = altitudePlot.getContext("2d");
	var offset = 40;
	var maxY = Math.max.apply(null, plotDataStorage.altitude);
	var maxX = plotDataStorage.fl;
	var height = altitudePlot.height;
	var width = altitudePlot.width;
  	
	ctx.beginPath();	
	ctx.moveTo(offset, height - offset);
	ctx.strokeStyle = "#000000";
	ctx.setLineDash([]);
	
	for (i = 0; i < plotDataStorage.landingAltitude1.length; i++){
	  ctx.lineTo(i * (width - offset) / (plotDataStorage.altitudeExp.length) + offset, height - plotDataStorage.altitudeExp[i] * (height - offset) / maxY - offset);
	}
	ctx.stroke();
}
