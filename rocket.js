//object to store flightdata, for plots
var plotDataStorage = {
	ts : 10, //time steps, after which data is saved to generate plots. higher number -> less acurate plots
	fl : 0, //whole flight length in seconds
	al : 0, //acceleration length in seconds
	altitude : [0],
	velocity : [0],
	acceleration : [0],
	thrust : [0],
}


//launch rocket as the page opens and hide what is spare
hideStages();
launch();

	function launch(){
		var stagesNum = parseInt(numberOfStages.value);
		var currentStage = 1;
		//initial conditions		
	  var h = 0; //rocket's hight over ground
		var vr = 0; //rocket's velocity - depends of stage (m/s)
		var V = (vesselCapacity.value - waterCapacity.value) / 1000;
		var Vw = (waterCapacity.value) / 1000; //capacity of water (m^3)
	  var Ar = 3.14159 * vesselDiameter.value * vesselDiameter.value / 4 / 1000000; //section area of the rocket's vessel (m^2)
    var An = 3.14159 * nozzleDiameter.value * nozzleDiameter.value / 4 / 1000000; //section area of exhaust nozzle (m^2)
    var p = pressure.value * 100000; //air pressure in vessel (Pa)
		var pa = 100000; //ambient pressure (it is used second time in stageIgnition(). Sorry)
		var Cd = dragCoefficient.value;
		var ro = 1000; //water density (kg/m^3)
		var R = 286.9; //gas constant for air (J / (mol * K)) (it is used second time in stageIgnition(). Sorry)
		var temp = 293; //temperature in Kelvins (K) (it is used second time in stageIgnition(). Sorry)
		var lt = launchTubeLength.value / 1000; // length of the launch tube. If zero - no launch tube (avaible only in first stage) (m)
		switch (stagesNum){ //to m0 for the stage the total mass of upper stages with fuel (and compressed air) must be added
			case 1:
				var m0 = parseFloat(rocketDryMass.value);
				break;
			case 2:
				var m0 = parseFloat(rocketDryMass.value) + parseFloat(rocketDryMass2.value) + (waterCapacity2.value / 1000) * ro + (pressure2.value * 100000 + pa) / (R * temp) * (vesselCapacity2.value - waterCapacity2.value) / 1000;
				break;
			case 3:
				var m0 = parseFloat(rocketDryMass.value) + parseFloat(rocketDryMass2.value) + (waterCapacity2.value / 1000) * ro + (pressure2.value * 100000 + pa) / (R * temp) * (vesselCapacity2.value - waterCapacity2.value) /1000 + parseFloat(rocketDryMass3.value) + (waterCapacity3.value / 1000) * ro + (pressure3.value * 100000  + pa) / (R * temp) * (vesselCapacity3.value - waterCapacity2.value) / 1000;
				break;
		}
	  var ft = 0; //flight time (s)
		
		//stage 1 starts
		var results = stageIgnition(h, vr, V, Vw, ro, Ar, An, p, Cd, m0, lt, ft, currentStage);
		
		var T = results[0];
		var ve = results[1];
		var a = results[2];
		var TWR = results[3];
		var Isp = results[4];
		var speedAtMECO = results[5];
		var topSpeed = results[6];
		var airPulseDeltaV = results[7];
		var timeToMECO = results[8];
		var MECOaltitude = results[9];
		var airPulseEnd = results[10];
		var airPulseEndAltitude = results[11];
		var altitude = results[12];
		var apogeeTime = results[13];
	
		document.getElementById("initialThrust").innerHTML = Math.round(T * 10) / 10;
    document.getElementById("initialVe").innerHTML = Math.round(ve * 10) / 10;
    document.getElementById("initialAcceleration").innerHTML = Math.round(a * 10) / 10;
    document.getElementById("initialTWR").innerHTML = Math.round(TWR * 10) / 10;
    document.getElementById("initialIsp").innerHTML = Math.round(Isp * 10) / 10;
    document.getElementById("speedAtMECO").innerHTML = Math.round(speedAtMECO * 10) / 10;
	  document.getElementById("topSpeed").innerHTML = Math.round((topSpeed) * 10) / 10;
		document.getElementById("airPulseDeltaV").innerHTML = Math.round((airPulseDeltaV) * 10) / 10;
    document.getElementById("timeToMECO").innerHTML = Math.round(timeToMECO * 1000) / 1000;
    document.getElementById("MECOaltitude").innerHTML = Math.round(MECOaltitude * 10) / 10;
		document.getElementById("altitude").innerHTML = Math.round(altitude * 10) / 10;
    document.getElementById("apogeeTime").innerHTML = Math.round(apogeeTime * 10) / 10;
				
		if (stagesNum >= 2){ 
			//stage 2 starts
			currentStage = 2;
			V = (vesselCapacity2.value - waterCapacity2.value) / 1000;
	  	Vw = (waterCapacity2.value) / 1000; //capacity of water (m^3)
			Ar = 3.14159 * vesselDiameter2.value * vesselDiameter2.value / 4 / 1000000; //section area of the rocket's vessel in m^2
      An = 3.14159 * nozzleDiameter2.value * nozzleDiameter2.value / 4 / 1000000; //section area of exhaust nozzle
      p = pressure2.value * 100000; //air pressure in vessel (Pa)
		  Cd = dragCoefficient2.value;
			switch (stagesNum){ //to m0 for the stage the total mass of upper stages with fuel (and compressed air) must be added
		  	case 2:
	  			m0 = parseFloat(rocketDryMass2.value);
			  	break;
		  	case 3:
			  	m0 = parseFloat(rocketDryMass2.value) + parseFloat(rocketDryMass3.value) + (waterCapacity3.value / 1000) * ro + (pressure3.value* 100000  + pa) / (R * temp) * (vesselCapacity3.value - waterCapacity2.value) / 1000;
				  break;
		}
			results = stageIgnition(airPulseEndAltitude, topSpeed, V, Vw, ro, Ar, An, p, Cd, m0, lt, airPulseEnd, currentStage);
		
		  T = results[0];
		  ve = results[1];
		  a = results[2];
		  TWR = results[3];
		  Isp = results[4];
		  speedAtMECO = results[5];
		  topSpeed = results[6];
		  airPulseDeltaV = results[7];
		  timeToMECO = results[8];
		  MECOaltitude = results[9];
			airPulseEnd = results[10];
		  airPulseEndAltitude = results[11];
		  altitude = results[12];
		  apogeeTime = results[13];
		
		  document.getElementById("initialThrust2").innerHTML = Math.round(T * 10) / 10;
      document.getElementById("initialVe2").innerHTML = Math.round(ve * 10) / 10;
      document.getElementById("initialAcceleration2").innerHTML = Math.round(a * 10) / 10;
      document.getElementById("initialTWR2").innerHTML = Math.round(TWR * 10) / 10;
      document.getElementById("initialIsp2").innerHTML = Math.round(Isp * 10) / 10;
      document.getElementById("speedAtMECO2").innerHTML = Math.round(speedAtMECO * 10) / 10;
	    document.getElementById("topSpeed2").innerHTML = Math.round((topSpeed) * 10) / 10;
  		document.getElementById("airPulseDeltaV2").innerHTML = Math.round((airPulseDeltaV) * 10) / 10;
      document.getElementById("timeToMECO2").innerHTML = Math.round(timeToMECO * 1000) / 1000;
      document.getElementById("MECOaltitude2").innerHTML = Math.round(MECOaltitude * 10) / 10;
  		document.getElementById("altitude2").innerHTML = Math.round(altitude * 10) / 10;
      document.getElementById("apogeeTime2").innerHTML = Math.round(apogeeTime * 10) / 10;
		}
		
		
		if (stagesNum >= 3){ 
			//stage 3 starts
			currentStage = 3;
			V = (vesselCapacity3.value - waterCapacity3.value) / 1000;
	  	Vw = (waterCapacity3.value) / 1000; //capacity of water (m^3)
			Ar = 3.14159 * vesselDiameter3.value * vesselDiameter3.value / 4 / 1000000; //section area of the rocket's vessel in m^2
      An = 3.14159 * nozzleDiameter3.value * nozzleDiameter3.value / 4 / 1000000; //section area of exhaust nozzle
      p = pressure3.value * 100000; //air pressure in vessel (Pa)
		  Cd = dragCoefficient3.value;
			m0 = parseFloat(rocketDryMass3.value)
			
		  results = stageIgnition(airPulseEndAltitude, topSpeed, V, Vw, ro, Ar, An, p, Cd, m0, lt, airPulseEnd, currentStage);
		
		  T = results[0];
		  ve = results[1];
		  a = results[2];
		  TWR = results[3];
		  Isp = results[4];
		  speedAtMECO = results[5];
		  topSpeed = results[6];
		  airPulseDeltaV = results[7];
		  timeToMECO = results[8];
		  MECOaltitude = results[9];
		  airPulseEnd = results[10];
		  airPulseEndAltitude = results[11];
		  altitude = results[12];
		  apogeeTime = results[13];
		
		  document.getElementById("initialThrust3").innerHTML = Math.round(T * 10) / 10;
      document.getElementById("initialVe3").innerHTML = Math.round(ve * 10) / 10;
      document.getElementById("initialAcceleration3").innerHTML = Math.round(a * 10) / 10;
      document.getElementById("initialTWR3").innerHTML = Math.round(TWR * 10) / 10;
      document.getElementById("initialIsp3").innerHTML = Math.round(Isp * 10) / 10;
      document.getElementById("speedAtMECO3").innerHTML = Math.round(speedAtMECO * 10) / 10;
	    document.getElementById("topSpeed3").innerHTML = Math.round((topSpeed) * 10) / 10;
  		document.getElementById("airPulseDeltaV3").innerHTML = Math.round((airPulseDeltaV) * 10) / 10;
      document.getElementById("timeToMECO3").innerHTML = Math.round(timeToMECO * 1000) / 1000;
      document.getElementById("MECOaltitude3").innerHTML = Math.round(MECOaltitude * 10) / 10;
  		document.getElementById("altitude3").innerHTML = Math.round(altitude * 10) / 10;
      document.getElementById("apogeeTime3").innerHTML = Math.round(apogeeTime * 10) / 10;
		}
		console.log("------------------" + '\n');
	  
		//generating plots for h, v, a, T
		drawPlots();
		
		console.log("vr data: " + plotDataStorage.velocity.length);
		console.log("a data: " + plotDataStorage.acceleration.length);
		console.log("T data: " + plotDataStorage.thrust.length);
	
		
		//clear data in the end
		plotDataStorage.altitude = [0];
		plotDataStorage.velocity = [0];
		plotDataStorage.acceleration = [0];
		plotDataStorage.thrust = [0];
}

 	
function stageIgnition(h, vr, V, Vw, ro, Ar, An, p, Cd, m0, lt, ft, currentStage){
	//physical constants for calculations
  var k = 1.4; //Boltzman constant for atmospheric air
  var g = 9.81; //acceleration of Earth's gravity
  var tempI = 293; //initial temperature in Kelvins (K)
  var temp = tempI; //curent temperature in Kelvins (K)
	var pI = p; //initial pressure (Pa)
  var pa = 100000; //atmospheric pressure in Pa (N/m^2) (1 bar)
	var R = 286.9; //gas constant for air (J / (mol * K))
	var hw = Vw / Ar; //water height in the rocket's vessel
	var roA = pa / (R * temp); //air density (kg/m^3)
  var ve = Math.sqrt(2 * p / ro); //rocket's exhaust velocity (m/s)
  var C = p * Math.pow(V, k); //constant for adiabatic process
  var D = -.5 * Cd * roA * vr * vr * Ar; //drag force (N)
	var mA = (p + pa) / (R * temp) * V; //mass of pressurised air
	var roAp = mA / V; //pressurised air density (kg/m^3)
	var m = m0 + (Vw * ro) + mA; //mass of rocket with water and air;
  var lastM; //mass from previous loop iteration (kg)
	var dt = 0.001 //time step
	var dm = An * ro * Math.sqrt(2 * p / ro) * dt; //mass decrease in first step of loop (kg)
  var T = ve * dm / dt; //thrust force (N)
	var Isp = T * dt / (g * dm); //specific impulse (s)
	var TWR = T / (g * m0); //thrust to weight ratio (-)
  var a = T / m - g; //acceleration (m/s^2)
	var M = ve / Math.sqrt(k * R * temp); //Mach number
	var Mol = 28.96; //molecylar mass of dry air - cold air is really dry
	var stagesNum = parseInt(numberOfStages.value);
		
		console.log("air mass: " + mA);
		console.log("air density: " + roA);
		console.log("air temp: " + temp);
		console.log("m: " + m);
		console.log("dm: " + dm);
		console.log("m0: " + m0);
		console.log("p: " + p);
		console.log("roAp: " + roAp);
		console.log("hw: " + hw);
		console.log("ve: " + ve);
		console.log("V: " + V);
		console.log("h: " + h);
		console.log("vr: " + vr);
		console.log("ft: " + ft);
		console.log("T: " + T);
		console.log("lt: " + lt + '\n');
		console.log('\n');
    
    var outputT = T;
    var outputve = ve;
    var outputa = a;

if (h == 0){ //calculation loop - acceleration on launch tube phase
 V -= lt * An; //launch tube grabs space inside the rocket's vessel
 console.log("launch tube phase");
	while (h < lt && h >= 0){
 	  p = C * Math.pow(V, -k); //air (and water) pressure decreases
	  T = p * An;
	  D = -.5 * Cd * roA * vr * vr * Ar;
	 
	  a = (T + D) / m - g;
	  vr += a * dt;
	  h += vr * dt;
	  ft += dt;
		
		V += vr * dt * An; //air volume increases
	  temp = tempI * Math.pow(((p + pa) / pI), ((k-1)/k)); //temperature of air dercreases due to adiabatic process
		
		//write data for plots every ts (time steps)
	  if (Math.round(ft/dt) % plotDataStorage.ts == 0){
      plotDataStorage.altitude.push(h);
      plotDataStorage.velocity.push(vr);
      plotDataStorage.acceleration.push(a);
      plotDataStorage.thrust.push(T);
		}
	}		
}		

//calculation loop - water acceleration phase
console.log('water acceleration phase'); 
console.log("\n");
while (m > m0 + mA){
	ve = Math.sqrt(2 * p / ro);
	lastM = m;
	m -= An * ro * ve * dt; //mass decreases
	dm = lastM - m; //mass decrease in one step
	V += dm / ro; //air volume increases
	Vw -= dm / ro; //water volume decreases
	hw = Vw / Ar;
	p = C * Math.pow(V, -k) + ro * (g + a) * hw; //air (and water) pressure decreases
	temp = tempI * Math.pow(((p + pa) / pI), ((k-1)/k)); //temperature of air dercreases due to adiabatic process
	T = ve * dm / dt;
	D = -.5 * Cd * roA * vr * vr * Ar;
	
	a = (T + D) / m - g;
	vr += a * dt;
	h += vr * dt;
	ft += dt;
	
	//write data for plots every ts (time steps)
	if (Math.round(ft/dt) % plotDataStorage.ts == 0){
    plotDataStorage.altitude.push(h);
    plotDataStorage.velocity.push(vr);
    plotDataStorage.acceleration.push(a);
    plotDataStorage.thrust.push(T);
	}
}
console.log("vr after acceleration phase: " + vr);
console.log("h after acceleration phase: " + h);
console.log("\n");

var speedAtMECO = vr; //value to calculate delta v of air pulse
var topSpeed = vr;
var airPulseDeltaV = 0;
var timeToMECO = ft;
var MECOaltitude = h;
var airPulseEndAltitude = h;
var airPulseEnd = ft;
var vSound = Math.sqrt(k * R * temp); //sound speed in cooled air

//calculation loop - air pulse phase after water "burnout"
console.log('air pulse phase after water "burnout"');
console.log("\n");

while (m > m0 && vr > 0 && a > 0){
	mA = (p + pa) / (R * temp) * V; //mass of pressurised air
	roAp = mA / V; //pressurised air density (kg/m^3)
	vSound = Math.sqrt(k * R * temp);
  ve = Math.sqrt(temp * R / Mol * 2 * k / (k - 1) * (1 - Math.pow((pa / (p + pa)), ((k - 1) / k)))); //exhaust velocity from De Laval nozzle equation
	M = ve / vSound; //Mach number
	lastM = m;
	m -= An * roAp * ve * dt; //mass decreases
	dm = lastM - m; //mass decrease in one step
	C = p * Math.pow(V, k); //constant for adiabatic process
	V += dm / roAp; //little volume of air escapes rocket
	p = C * Math.pow(V, -k); //air pressure decreases
	temp = tempI * Math.pow(((p + pa) / pI), ((k-1)/k));; //temperature of air dercreases due to adiabatic process
	V -= dm / roAp; //the volume of the vessel remains the same
	T = ve * dm / dt;
	D = -.5 * Cd * roA * vr * vr * Ar;
	
	a = (T + D) / m - g;
	vr += a * dt;
	h += vr * dt;
	ft += dt;
	
  //write data for plots every ts (time steps)
	if (Math.round(ft/dt) % plotDataStorage.ts == 0){
    plotDataStorage.altitude.push(h);
    plotDataStorage.velocity.push(vr);
    plotDataStorage.acceleration.push(a);
    plotDataStorage.thrust.push(T);
	}
}

T = 0;
if (topSpeed < vr) {
	topSpeed = vr;
	airPulseDeltaV = vr - speedAtMECO;
}
  airPulseEnd = ft;
	airPulseEndAltitude = h;

plotDataStorage.al = ft;

console.log("vr: " + vr);
console.log("h: " + h);
console.log('\n');

//calculation loop - balistic flight phase
console.log('balistic flight phase begins' + '\n'); 
while (vr >= 0){
	D = -.5 * Cd * roA * vr * vr * Ar;
	a = D / m - g;
	vr += a * dt;
	h += vr * dt;
	ft += dt;
	//write data for plots every ts (time steps)
	if (stagesNum == currentStage && Math.round(ft/dt) % plotDataStorage.ts == 0){
    plotDataStorage.altitude.push(h);
    plotDataStorage.velocity.push(vr);
    //plotDataStorage.acceleration.push(a);
    //plotDataStorage.thrust.push(T);
	}
}

console.log('\n');
console.log("vr: " + vr);
console.log("air temperature (C): " + (temp - 273));
console.log("airPulseEnd: " + airPulseEnd + " s");
console.log("airPulseEndAltitude: " + airPulseEndAltitude);
console.log("flight time (to apogee): " + ft);
console.log("h: " + h + '\n');
console.log("------" + '\n');

var altitude = h;
var apogeeTime = ft;

//fall back to the ground

plotDataStorage.fl = ft;

//Array with output data
var results = [outputT, outputve, outputa, TWR, Isp, speedAtMECO, topSpeed, airPulseDeltaV, timeToMECO, MECOaltitude, airPulseEnd, airPulseEndAltitude, altitude, apogeeTime];
return results;
}
