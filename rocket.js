//object to store flightdata, for plots
var plotDataStorage = {
	dt : 0, //time step
	fl : 0, //whole flight length in seconds
	al : 0, //acceleration length in seconds
	stage1separationTime : 0,
	stage2separationTime : 0,
	
	ascentAltitude : [],
	ballisticAltitude1 : [],
	descentAltitude1 : [],
	ballisticAltitude2 : [],
	descentAltitude2 : [],
	ballisticAltitude3 : [],
	descentAltitude3 : [],
	
	velocity1 : [],
	landingVelocity1 : [],
	velocity2 : [],
	landingVelocity2 : [],
	velocity3 : [],
	landingVelocity3 : [],
	
	acceleration1 : [],
	landingAcceleration1 : [],
	acceleration2 : [],
	landingAcceleration2 : [],
	acceleration3 : [],
	landingAcceleration3 : [],
	
	thrust1 : [],
	landingThrust1 : [],
	thrust2 : [],
	landingThrust2 : [],
	thrust3 : [],
	landingThrust3 : [],
	
	exhaust1 : [],
	landingExhaust1 : [],
	exhaust2 : [],
	landingExhaust2 : [],
	exhaust3 : [],
	landingExhaust3 : [],
	
	kineticEnergy1 : [],
	kineticEnergy2 : [],
	kineticEnergy3 : [],
	mechanicalEnergy1 : [],
	mechanicalEnergy2 : [],
	mechanicalEnergy3 : [],
			
	altitudeExp : [],
	velocityExp : [],
}

//launch rocket as the page opens and hide what is spare
hideStages();
launch();

	function launch(){
		var stagesNum = parseInt(numberOfStages.value);
		var currentStage = 1;
		var land1 = false;
		var land2 = false;
		var land3 = false;
		var land = false;
		
		if (landing1.value == 1){
			land1 = true;
		}
		if (landing2.value == 1){
			land2 = true;
		}
		if (landing3.value == 1){
			land3 = true;
		}
				
		//initial conditions		
	  var h = 0; //rocket's hight over ground
		var vr = 0; //rocket's velocity - depends of stage (m/s)
		var V = (vesselCapacity.value - waterCapacity.value) / 1000; //volume of air inside the vessel (m^3)
		var Vw = (waterCapacity.value) / 1000; //capacity of water (m^3)
	  var Ar = 3.14159 * vesselDiameter.value * vesselDiameter.value / 4 / 1000000; //section area of the rocket's vessel (m^2)
    var An = 3.14159 * nozzleDiameter.value * nozzleDiameter.value / 4 / 1000000; //section area of nozzle (m^2)
    var Alt = 3.14159 * launchTubeDiameter.value * launchTubeDiameter.value / 4 / 1000000; //section area of launch tube (m^2)
    var p = pressure.value * 100000; //air pressure in vessel (Pa)
		var pa = 100000; //ambient pressure (it is used second time in stageIgnition(). Sorry)
		var Cd = dragCoefficient.value;
		var ro = 1000; //water density (kg/m^3)
		var R = 286.9; //gas constant for air (J / (mol * K)) (it is used second time in stageIgnition(). Sorry)
		var temp = 293; //temperature in Kelvins (K)
		var lt = launchTubeLength.value / 1000; // length of the launch tube. If zero - no launch tube (avaible only in first stage) (m)
		var Vlanding = (landingCapacity1.value - landingWater1.value) / 1000 //volume of air inside the landing vessel (m^3)
		var VwLanding = landingWater1.value / 1000; //capacity of water for landing (m^3)
		var pLanding = landingPressure1.value * 100000; //air pressure in landing vessel (Pa)
		var AnLanding = 3.14159 * landingNozzleDiameter1.value * landingNozzleDiameter1.value / 4 / 1000000; //section area of landing nozzle (m^2)
		var hIgnition = landingBurnHeight1.value; //height at which starts the landing burn
		
		switch (stagesNum){ //to m0 for the stage the total mass of upper stages with fuel (and compressed air) must be added
			case 1:
				var m0 = parseFloat(rocketDryMass.value);
				break;
			case 2:
				var m0 = parseFloat(rocketDryMass.value) + parseFloat(rocketDryMass2.value) + (waterCapacity2.value / 1000) * ro + (pressure2.value * 100000 + pa) / (R * temp) * (vesselCapacity2.value - waterCapacity2.value) / 1000;
				break;
			case 3:
				var m0 = parseFloat(rocketDryMass.value) + parseFloat(rocketDryMass2.value) + (waterCapacity2.value / 1000) * ro + (pressure2.value * 100000 + pa) / (R * temp) * (vesselCapacity2.value - waterCapacity2.value) /1000 
							 + parseFloat(rocketDryMass3.value) + (waterCapacity3.value / 1000) * ro + (pressure3.value * 100000  + pa) / (R * temp) * (vesselCapacity3.value - waterCapacity2.value) / 1000;
				break;
		}
		if(land1){ //additional mass of landing fuel in stage 1
			m0 += VwLanding * ro + (pLanding + pa) / (R * temp) * Vlanding; 
		}
		if(land2){ //additional mass of landing fuel in stage 2
			m0 += (landingWater2.value / 1000) * ro + (landingPressure2.value * 100000 + pa) / (R * temp) * ((landingCapacity2.value - landingWater2.value) / 1000);
		}
		if(land3){ //additional mass of landing fuel in stage 3
			m0 += (landingWater3.value / 1000) * ro + (landingPressure3.value * 100000 + pa) / (R * temp) * ((landingCapacity3.value - landingWater3.value) / 1000);
		}
			
	  var ft = 0; //flight time (s)
		
		//stage 1 starts
		var results = stageIgnition(land, h, vr, V, Vw, ro, Ar, An, Alt, p, Cd, m0, lt, ft, temp, currentStage, hIgnition);
		
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
		var vBurnout = results[15];
	
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
	
		//landing 1-st stage
		land = land1;
		if(land){
			m0 = parseFloat(rocketDryMass.value);
			
			var results = stageIgnition(land, altitude, vBurnout, Vlanding, VwLanding, ro, Ar, AnLanding, Alt, pLanding, Cd, m0, lt, apogeeTime, temp, currentStage, hIgnition);
		
			var hBurnout = results[14];
			vBurnout = results[15];
			var landingTime = results[16];
			var landingDeltaV = results[17];
			var landingAcceleration = results[2];
		
			document.getElementById("burnoutAltitude1").innerHTML = Math.round(hBurnout * 10) / 10;
			document.getElementById("burnoutVelocity1").innerHTML = Math.round(vBurnout * 10) / 10;
			document.getElementById("landingBurnTime1").innerHTML = Math.round(landingTime * 10) / 10;
			document.getElementById("landingBurnDeltaV1").innerHTML = Math.round(landingDeltaV * 10) / 10;
			document.getElementById("landingBurnAcceleration1").innerHTML = Math.round(landingAcceleration * 10) / 10;
		}
		
		land = false;
		if (stagesNum >= 2){ 
			//stage 2 starts
			currentStage = 2;
			
			V = (vesselCapacity2.value - waterCapacity2.value) / 1000;
	  	Vw = (waterCapacity2.value) / 1000; //capacity of water (m^3)
			Ar = 3.14159 * vesselDiameter2.value * vesselDiameter2.value / 4 / 1000000; //section area of the rocket's vessel in m^2
      An = 3.14159 * nozzleDiameter2.value * nozzleDiameter2.value / 4 / 1000000; //section area of exhaust nozzle
      p = pressure2.value * 100000; //air pressure in vessel (Pa)
		  Cd = dragCoefficient2.value;
			temp = 293;
			switch (stagesNum){ //to m0 for the stage the total mass of upper stages with fuel (and compressed air) must be added
		  	case 2:
	  			m0 = parseFloat(rocketDryMass2.value);
			  	break;
		  	case 3:
			  	m0 = parseFloat(rocketDryMass2.value) + parseFloat(rocketDryMass3.value) + (waterCapacity3.value / 1000) * ro + (pressure3.value* 100000  + pa) / (R * temp) * (vesselCapacity3.value - waterCapacity2.value) / 1000;
				  break;
			}
			if(land2){ //additional mass of landing fuel in stage 2
				m0 += (landingWater2.value / 1000) * ro + (landingPressure2.value * 100000 + pa) / (R * temp) * (((landingCapacity2.value - landingWater2.value) / 1000) - landingWater2.value / 1000);
			}
			if(land3){ //additional mass of landing fuel in stage 3
				m0 += (landingWater3.value / 1000) * ro + (landingPressure3.value * 100000 + pa) / (R * temp) * (((landingCapacity3.value - landingWater3.value) / 1000) - landingWater3.value / 1000);
			}
			
			results = stageIgnition(land, airPulseEndAltitude, topSpeed, V, Vw, ro, Ar, An, Alt, p, Cd, m0, lt, airPulseEnd, temp, currentStage, hIgnition);
		
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
			vBurnout = results[15];
		
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
			
		  		
			//landing 2-nd stage
	  	land = land2;
			if(land){
				Vlanding = (landingCapacity2.value - landingWater2.value) / 1000 //volume of air inside the landing vessel (m^3)
			  VwLanding = (landingWater2.value) / 1000; //capacity of water for landing (m^3)
		  	pLanding = landingPressure2.value * 100000; //air pressure in landing vessel (Pa)
		  	AnLanding = 3.14159 * landingNozzleDiameter2.value * landingNozzleDiameter2.value / 4 / 1000000; //section area of landing nozzle (m^2)
		  	hIgnition = landingBurnHeight2.value; //height at which starts the landing burn
			
				m0 = parseFloat(rocketDryMass2.value);
			
				var results = stageIgnition(land, altitude, vBurnout, Vlanding, VwLanding, ro, Ar, AnLanding, Alt, pLanding, Cd, m0, lt, apogeeTime, temp, currentStage, hIgnition);
		
				var hBurnout = results[14];
				vBurnout = results[15];
				var landingTime = results[16];
				var landingDeltaV = results[17];
				var landingAcceleration = results[2];
		
				document.getElementById("burnoutAltitude2").innerHTML = Math.round(hBurnout * 10) / 10;
				document.getElementById("burnoutVelocity2").innerHTML = Math.round(vBurnout * 10) / 10;
				document.getElementById("landingBurnTime2").innerHTML = Math.round(landingTime * 10) / 10;
				document.getElementById("landingBurnDeltaV2").innerHTML = Math.round(landingDeltaV * 10) / 10;
				document.getElementById("landingBurnAcceleration2").innerHTML = Math.round(landingAcceleration * 10) / 10;
			}
			
		}
		
		land = false;
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
			temp = 293;
			
			if(land3){ //additional mass of landing fuel in stage 3
				m0 += (landingWater3.value / 1000) * ro + (landingPressure3.value * 100000 + pa) / (R * temp) * (((landingCapacity3.value - landingWater3.value) / 1000) - landingWater3.value / 1000);
			}
			
		  results = stageIgnition(land, airPulseEndAltitude, topSpeed, V, Vw, ro, Ar, An, Alt, p, Cd, m0, lt, airPulseEnd, temp, currentStage, hIgnition);
		
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
			vBurnout = results[15];
					
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
			
			//landing 3-rd stage
	  	land = land3;
			if(land){
				Vlanding = (landingCapacity3.value - landingWater3.value) / 1000 //volume of air inside the landing vessel (m^3)
			  VwLanding = (landingWater3.value) / 1000; //capacity of water for landing (m^3)
		  	pLanding = landingPressure3.value * 100000; //air pressure in landing vessel (Pa)
		  	AnLanding = 3.14159 * landingNozzleDiameter3.value * landingNozzleDiameter3.value / 4 / 1000000; //section area of landing nozzle (m^2)
		  	hIgnition = landingBurnHeight3.value; //height at which starts the landing burn
			
				m0 = parseFloat(rocketDryMass3.value);
			
				results = stageIgnition(land, altitude, vBurnout, Vlanding, VwLanding, ro, Ar, AnLanding, Alt, pLanding, Cd, m0, lt, apogeeTime, temp, currentStage, hIgnition);
		
				var hBurnout = results[14];
				vBurnout = results[15];
				var landingTime = results[16];
				var landingDeltaV = results[17];
				var landingAcceleration = results[2];
		
				document.getElementById("burnoutAltitude3").innerHTML = Math.round(hBurnout * 10) / 10;
				document.getElementById("burnoutVelocity3").innerHTML = Math.round(vBurnout * 10) / 10;
				document.getElementById("landingBurnTime3").innerHTML = Math.round(landingTime * 10) / 10;
				document.getElementById("landingBurnDeltaV3").innerHTML = Math.round(landingDeltaV * 10) / 10;
				document.getElementById("landingBurnAcceleration3").innerHTML = Math.round(landingAcceleration * 10) / 10;
			}
			
		}
			  
		//generating plots for h, v, a, T
		drawPlots();
		
		//clear data in the end
		plotDataStorage.ascentAltitude = [];
		plotDataStorage.descentAltitude1 = [];
		plotDataStorage.ballisticAltitude1 = [];
		plotDataStorage.descentAltitude2 = [];
		plotDataStorage.ballisticAltitude2 = [];
		plotDataStorage.descentAltitude3 = [];
		plotDataStorage.ballisticAltitude3 = [];
		
		plotDataStorage.velocity1 = [];
		plotDataStorage.landingVelocity1 = [];
		plotDataStorage.velocity2 = [];
		plotDataStorage.landingVelocity2 = [];
		plotDataStorage.velocity3 = [];
		plotDataStorage.landingVelocity3 = [];
		
		plotDataStorage.acceleration1 = [];
		plotDataStorage.landingAcceleration1 = [];
		plotDataStorage.acceleration2 = [];
		plotDataStorage.landingAcceleration2 = [];
		plotDataStorage.acceleration3 = [];
		plotDataStorage.landingAcceleration3 = [];
		
		plotDataStorage.thrust1 = [];
		plotDataStorage.landingThrust1 = [];
		plotDataStorage.thrust2 = [];
		plotDataStorage.landingThrust2 = [];
		plotDataStorage.thrust3 = [];
		plotDataStorage.landingThrust3 = [];
		
		plotDataStorage.exhaust1 = [];
		plotDataStorage.landingExhaust1 = [];
		plotDataStorage.exhaust2 = [];
		plotDataStorage.landingExhaust2 = [];
		plotDataStorage.exhaust3 = [];
		plotDataStorage.landingExhaust3 = [];
		
		plotDataStorage.kineticEnergy1 = [];
		plotDataStorage.mechanicalEnergy1 = [];
		plotDataStorage.kineticEnergy2 = [];
		plotDataStorage.mechanicalEnergy2 = [];
		plotDataStorage.kineticEnergy3 = [];
		plotDataStorage.mechanicalEnergy3 = [];
				
		plotDataStorage.stage1separationTime = 0;
		plotDataStorage.stage2separationTime = 0;
		
		plotDataStorage.altitudeExp = [];
		plotDataStorage.velocityExp = [];
		
		console.log("------------------" + '\n');
}

 	
function stageIgnition(land, h, vr, V, Vw, ro, Ar, An, Alt, p, Cd, m0, lt, ft, temp, currentStage, hIgnition){
	//physical constants for calculations
	var waterLossFactor = 0.1; //pressure loss factor in nozzle for water flow
	var airLossFactor = 0.5; //pressure loss factor in nozzle for air flow
	var launchTubeWall = 0.0028 //launch tube wall thickness
  var k = 1.4; //Boltzman constant for atmospheric air
  var g = 9.81; //acceleration of Earth's gravity
  var tempI = temp; //initial temperature in Kelvins (K)
	var pI = p; //initial pressure (Pa)
  var pa = 100000; //atmospheric pressure in Pa (N/m^2) (1 bar)
	var Vwi = Vw; //initial volume of water
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
	var dt = 0.001; //time step
	var localTime = 0; //time counted from ignition for plots generation
	var dm = An * ro * Math.sqrt(2 * p / ro) * dt; //mass decrease in first step of loop (kg)
  var T = ve * dm / dt + p * (1 - waterLossFactor) * An; //thrust force (N)
	var Isp = T * dt / (g * dm); //specific impulse (s)
	var TWR = T / (g * m); //thrust to weight ratio (-)
	var a = T / m - g; //acceleration (m/s^2)
	var M = 1; //Mach number
	var Mol = 28.96; //molecylar mass of dry air - cold air is really dry
	var stagesNum = parseInt(numberOfStages.value);
	var ascentDragWork = 0;
  var firstLoop = true;
	var kE; //kinetic energy of the stage (calculated for making plots only out of curiosity)
	var mE; //mechanical energy of the stage (calculated for making plots only out of curiosity)
	switch (currentStage){
		case 1:
			mStage = parseFloat(rocketDryMass.value); //mass of stage with fuel without upper stages
			if (!land && landing1.value == 1) {
				var landingmA = (landingPressure1.value * 100000 + pa) / (R * temp) * (landingCapacity1.value - landingWater1.value) / 1000; //mass of air pressurised for landing
				mStage += ((landingWater1.value) / 1000 * ro) + landingmA; //mass of landing fuel
			}
			break;
		case 2:
			mStage = parseFloat(rocketDryMass2.value); //mass of stage with fuel without upper stages
			if (!land && landing2.value == 1) {
				var landingmA = (landingPressure2.value * 100000 + pa) / (R * temp) * (landingCapacity2.value - landingWater2.value) / 1000; //mass of air pressurised for landing
				mStage += ((landingWater2.value) / 1000 * ro) + landingmA; //mass of landing fuel
			}
			break;
		case 3:
			mStage = parseFloat(rocketDryMass3.value); //mass of stage with fuel without upper stages
			if (!land && landing3.value == 1) {
				var landingmA = (landingPressure3.value * 100000 + pa) / (R * temp) * (landingCapacity3.value - landingWater3.value) / 1000; //mass of air pressurised for landing
				mStage += ((landingWater3.value) / 1000 * ro) + landingmA; //mass of landing fuel
			}
			break;
	}
		
	mStage += (Vw * ro) + mA; // added mass of fuel for ascent
		
	console.log("air mass: " + mA);
	console.log("landing air mass: " + landingmA);
	console.log("air density: " + roA);
	console.log("pressurised air density: " + roAp);
	console.log("air temp [Celcius]: " + (temp - 273));
	console.log("m: " + m);
	console.log("mStage: " + mStage);
	console.log("mStage - m: " + (mStage-m));
	console.log("m0: " + m0);
	console.log("dry mass: " + (0.6 + Vw * ro + mA));
	console.log("p: " + p);
	console.log("hw: " + hw);
	console.log("ve: " + ve);
	console.log("h: " + h);
	console.log("vr: " + vr);
	console.log("ft: " + ft);
	console.log("T: " + T);
	console.log('\n');


//calculation loop - acceleration on launch tube phase
if (h == 0){ 
 V += lt * Math.PI * Math.pow((Math.sqrt(4 * An / Math.PI) - launchTubeWall * 2), 2) / 4 - lt * An; //launch tube grabs space inside the rocket's vessel
 C = p * Math.pow(V, k);
 console.log("launch tube phase");
	while (h < lt && h >= 0){
 	  p = C * Math.pow(V, -k); //air (and water) pressure decreases
	  T = p * Alt;
	  D = -.5 * Cd * roA * vr * vr * Ar;
	 
	  a = (T + D) / m - g;
	  vr += a * dt;
	  h += vr * dt;
	  ft += dt;
		localTime += dt;
		
		V += vr * dt * An; //air volume increases
	  temp = tempI * Math.pow(((p + pa) / pI), ((k-1)/k)); //temperature of air dercreases due to adiabatic process
		
		kE = 0.5 * mStage * vr * vr;
		mE = kE + mStage * g * h;
		
		//write data for plots
	  
    plotDataStorage.ascentAltitude.push(h);
    plotDataStorage.velocity1.push(vr);
    plotDataStorage.acceleration1.push(a/g);
    plotDataStorage.thrust1.push(T);
    plotDataStorage.exhaust1.push(vr);
		plotDataStorage.kineticEnergy1.push(kE);
		plotDataStorage.mechanicalEnergy1.push(mE);
	}		
}


//calculation loop - balistic fall before landing burn (only if stage pretends to land)

if(land){
	console.log("balistic fall before landing burn" + '\n');
	while (h > hIgnition){
		D = .5 * Cd * roA * vr * vr * Ar;
		a = D / m - g;
		vr += a * dt;
		h += vr * dt;
		ft += dt;
		localTime += dt;
		
		kE = 0.5 * mStage * vr * vr;
		mE = kE + mStage * g * h;
		
		//write data for plots
	  
		switch (currentStage){
			case 1:
   			plotDataStorage.descentAltitude1.push(h);
				plotDataStorage.landingVelocity1.push(-vr);
				plotDataStorage.kineticEnergy1.push(kE);
				plotDataStorage.mechanicalEnergy1.push(mE);
				break;
			case 2:
				plotDataStorage.descentAltitude2.push(h);
				plotDataStorage.landingVelocity2.push(-vr);
				plotDataStorage.kineticEnergy2.push(kE);
				plotDataStorage.mechanicalEnergy2.push(mE);
				break;
			case 3:
				plotDataStorage.descentAltitude3.push(h);
				plotDataStorage.landingVelocity3.push(-vr);
				plotDataStorage.kineticEnergy3.push(kE);
				plotDataStorage.mechanicalEnergy3.push(mE);
				break;
		}		
 	}
}


//calculation loop - water acceleration phase

console.log('water acceleration phase'); 
console.log("\n");
var landingStartTime = ft;
var landingStartVelocity = vr;
 while (m > m0 + mA){
	ve = Math.sqrt(2 * p * (1 - waterLossFactor) / ro); //water loss factor couses pressure drop
	dm = An * ro * ve * dt; //mass decreases
	m -= dm; //mass decrease in one step
	V += dm / ro; //air volume increases
	Vw -= dm / ro; //water volume decreases
	hw = Vw / Ar;
	p = C * Math.pow(V, -k) + ro * (g + a) * hw; //air (and water) pressure decreases
	temp = tempI * Math.pow(((p + pa) / (pI+ pa)), ((k-1)/k)); //temperature of air dercreases due to adiabatic process
	T = ve * dm / dt + p * (1 - waterLossFactor) * An;
	if (land) D = .5 * Cd * roA * vr * vr * Ar;
	else D = -.5 * Cd * roA * vr * vr * Ar;

	a = (T + D) / m - g;
	vr += a * dt;
	h += vr * dt;
	ft += dt;
	localTime += dt;

	kE = 0.5 * mStage * vr * vr;
	mE = kE + mStage * g * h;
	mStage -= dm;
	
	//write data for results table
	if (firstLoop){
			  var outputT = T;
        var outputve = ve;
    		var outputa = a/g;
				TWR = T / (g * m);
				firstLoop = false;
	}
	//write data for plots
	if (!land){
		plotDataStorage.ascentAltitude.push(h);
		switch (currentStage){
			case 1:
				plotDataStorage.velocity1.push(vr);
    		plotDataStorage.acceleration1.push(a/g);
   			plotDataStorage.thrust1.push(T);
				plotDataStorage.kineticEnergy1.push(kE);
				plotDataStorage.mechanicalEnergy1.push(mE);
				plotDataStorage.exhaust1.push(ve);
				break;
			case 2:
				plotDataStorage.velocity2.push(vr);
    		plotDataStorage.acceleration2.push(a/g);
				plotDataStorage.thrust2.push(T);
				plotDataStorage.kineticEnergy2.push(kE);
				plotDataStorage.mechanicalEnergy2.push(mE);
				plotDataStorage.exhaust2.push(ve);
				break;
			case 3:
				plotDataStorage.velocity3.push(vr);
    		plotDataStorage.acceleration3.push(a/g);
				plotDataStorage.thrust3.push(T);
				plotDataStorage.kineticEnergy3.push(kE);
				plotDataStorage.mechanicalEnergy3.push(mE);
				plotDataStorage.exhaust3.push(ve);
				break;
		}
	}
	else {
		switch (currentStage){
			case 1:
				plotDataStorage.descentAltitude1.push(h);
				plotDataStorage.landingVelocity1.push(-vr);
    		plotDataStorage.landingAcceleration1.push(a/g);
				plotDataStorage.landingThrust1.push(T);
				plotDataStorage.kineticEnergy1.push(kE);
				plotDataStorage.mechanicalEnergy1.push(mE);
				plotDataStorage.landingExhaust1.push(ve);
				break;
			case 2:
				plotDataStorage.descentAltitude2.push(h);
				plotDataStorage.landingVelocity2.push(-vr);
    		plotDataStorage.landingAcceleration2.push(a/g);
				plotDataStorage.landingThrust2.push(T);
				plotDataStorage.kineticEnergy2.push(kE);
				plotDataStorage.mechanicalEnergy2.push(mE);
				plotDataStorage.landingExhaust2.push(ve);
				break;
			case 3:
				plotDataStorage.descentAltitude3.push(h);
				plotDataStorage.landingVelocity3.push(-vr);
    		plotDataStorage.landingAcceleration3.push(a/g);
				plotDataStorage.landingThrust3.push(T);
				plotDataStorage.kineticEnergy3.push(kE);
				plotDataStorage.mechanicalEnergy3.push(mE);
				plotDataStorage.landingExhaust3.push(ve);
				break;
		}
	}
 }

//calculation loop - air pulse phase after all the water escapes

var speedAtMECO = vr; //value to calculate delta v of air pulse
var topSpeed = vr;
var airPulseDeltaV = 0;
var timeToMECO = ft;
var MECOaltitude = h;
var airPulseEndAltitude = h;
var airPulseEnd = ft;
var vSound = Math.sqrt(k * R * temp); //sound speed in cooled air
var tempE; //temperature of air at exhaust nozzle - it decreases due to flow acceleration in the nozzle throat
var roApE; //density of air pressurised at exhaust nozzle - it also changes

console.log("air pulse phase after all the water escapes");
console.log("\n");
while (a > -9 && mA > 0){
	roAp = mA / V; //pressurised air density (kg/m^3)
  ve = Math.sqrt(temp * R * 2 * k / (k - 1) * (1 - Math.pow((pa / (p + pa)), ((k - 1) / k)))); //exhaust velocity from De Laval nozzle equation
	
	if (M >= 1) dm = An * p / Math.sqrt(temp) * Math.sqrt(k / R) * Math.pow((k + 1) / 2, (-(k + 1) / (2 * (k-1)))) * dt; //equation from nasa' page
	else dm = ve * An * roApE * dt;
	
	tempE = temp * 2 / (k + 1);
	vSound = Math.sqrt(k * R * tempE);
	M = ve / vSound; 
	if (M >= 1){
		ve = vSound;
		//console.log("Mach  : " + M);
		//console.log("temp  : " + (temp - 273));
	  //console.log("tempE : " + (tempE - 273));
		//console.log("---- ");
		
	}
	roApE = dm / (ve * dt * An);
	
	m -= dm;
	mA -= dm;
	C = p * Math.pow(V, k); //constant for adiabatic process
	V += dm / roApE; //little volume of air escapes rocket
	p = C * Math.pow(V, -k); //air pressure decreases
	temp = tempI * Math.pow(((p + pa) / (pI + pa)), ((k-1)/k)); //temperature of air dercreases due to adiabatic process
	V -= dm / roApE; //the volume of the vessel remains the same
		
	ve = ve * (1 - airLossFactor); //air loss factor couses drop of effective air speed (part of the air stream flow sideways, not straight down)
	T = ve * dm / dt + p * An;
	if (land) D = .5 * Cd * roA * vr * vr * Ar;
	else D = -.5 * Cd * roA * vr * vr * Ar;
	
	a = (T + D) / m - g;
	vr += a * dt;
	h += vr * dt;
	ft += dt;
	localTime += dt;
	
	kE = 0.5 * mStage * vr * vr;
	mE = kE + mStage * g * h;
	mStage -= dm;
	
  //write data for plots
	if (!land){
		plotDataStorage.ascentAltitude.push(h);
		switch (currentStage){
			case 1:
				plotDataStorage.velocity1.push(vr);
  			plotDataStorage.acceleration1.push(a/g);
				plotDataStorage.thrust1.push(T);
				plotDataStorage.kineticEnergy1.push(kE);
				plotDataStorage.mechanicalEnergy1.push(mE);
				plotDataStorage.exhaust1.push(ve);
				break;
			case 2:
				plotDataStorage.velocity2.push(vr);
				plotDataStorage.acceleration2.push(a/g);
				plotDataStorage.thrust2.push(T);
				plotDataStorage.kineticEnergy2.push(kE);
				plotDataStorage.mechanicalEnergy2.push(mE);
				plotDataStorage.exhaust2.push(ve);
				break;
			case 3:
				plotDataStorage.velocity3.push(vr);
				plotDataStorage.acceleration3.push(a/g);
				plotDataStorage.thrust3.push(T);
				plotDataStorage.kineticEnergy3.push(kE);
				plotDataStorage.mechanicalEnergy3.push(mE);
				plotDataStorage.exhaust3.push(ve);
				break;
		}
	}
	else {
		switch (currentStage){
			case 1:
				plotDataStorage.descentAltitude1.push(h);
				plotDataStorage.landingVelocity1.push(-vr);
				plotDataStorage.landingAcceleration1.push(a/g);
				plotDataStorage.landingThrust1.push(T);
				plotDataStorage.kineticEnergy1.push(kE);
				plotDataStorage.mechanicalEnergy1.push(mE);
				plotDataStorage.landingExhaust1.push(ve);
				break;
			case 2:
				plotDataStorage.descentAltitude2.push(h);
				plotDataStorage.landingVelocity2.push(-vr);
				plotDataStorage.landingAcceleration2.push(a/g);
				plotDataStorage.landingThrust2.push(T);
				plotDataStorage.kineticEnergy2.push(kE);
				plotDataStorage.mechanicalEnergy2.push(mE);
				plotDataStorage.landingExhaust2.push(ve);
				break;
			case 3:
				plotDataStorage.descentAltitude3.push(h);
				plotDataStorage.landingVelocity3.push(-vr);
				plotDataStorage.landingAcceleration3.push(a/g);
				plotDataStorage.landingThrust3.push(T);
				plotDataStorage.kineticEnergy3.push(kE);
				plotDataStorage.mechanicalEnergy3.push(mE);
				plotDataStorage.landingExhaust3.push(ve);
				break;
		}
	}
	if(a < 0 && land) break; //if acceleration is negative rocket doesn't breaks an more
}

T = 0;
if (topSpeed < vr) {
	topSpeed = vr;
	airPulseDeltaV = vr - speedAtMECO;
}
airPulseEnd = ft;
airPulseEndAltitude = h;
plotDataStorage.al = ft;
if (!land) switch (currentStage){
	case 1:
		plotDataStorage.stage1separationTime = ft;
		break;
	case 2:
		plotDataStorage.stage2separationTime = ft;
		break;
}


//calculation loop - balistic flight phase
if(!land){
 console.log('balistic flight phase begins' + '\n'); 
 while (vr > 0){
	D = -.5 * Cd * roA * vr * vr * Ar;
	a = D / m - g;
	vr += a * dt;
	h += vr * dt;
	ft += dt;
	 
	kE = 0.5 * mStage * vr * vr;
	mE = kE + mStage * g * h;
	if (m > m0){
		m -= 10 * dm;
		mStage -= 10 * dm;
		//console.log("mStage: " + mStage);
		//console.log("m:      " + m);
	}
	//write data for plots
	if (currentStage == stagesNum){
    plotDataStorage.ascentAltitude.push(h);		
	}
	switch (currentStage){
			case 1:
				plotDataStorage.ballisticAltitude1.push(h);
				plotDataStorage.velocity1.push(vr);
				plotDataStorage.kineticEnergy1.push(kE);
				plotDataStorage.mechanicalEnergy1.push(mE);
				break;
			case 2:
				plotDataStorage.ballisticAltitude2.push(h);
				plotDataStorage.velocity2.push(vr);
				plotDataStorage.kineticEnergy2.push(kE);
				plotDataStorage.mechanicalEnergy2.push(mE);
				break;
			case 3:
				plotDataStorage.ballisticAltitude3.push(h);
				plotDataStorage.velocity3.push(vr);
				plotDataStorage.kineticEnergy3.push(kE);
				plotDataStorage.mechanicalEnergy3.push(mE);
				break;
	}
 }
}

//if the rocket lands it is assumed that there's no balistic flight after deceleration (because rocket should land on the ground)
var hBurnout = h;
var vBurnout = vr;
var landingTime = ft - landingStartTime;
var landingDeltaV = vr - landingStartVelocity;	
	
plotDataStorage.dt = dt; //insert dt value in object that stores data for plots to properly calculate time scale on x axis
 
console.log('\n');
console.log("air temperature (C): " + (temp - 273));
console.log("airPulseEnd: " + airPulseEnd + " s");
console.log("airPulseEndAltitude: " + airPulseEndAltitude);
console.log("ft: " + ft);
console.log("m: " + m);
console.log("mStage: " + mStage);
console.log("------" + '\n');

plotDataStorage.fl = ft;
apogeeTime = ft;
altitude = h;

/*
for(i = 0; i < 38; i++){
  plotDataStorage.altitudeExp.push(0)
}
for(i = 0; i < 1; i++){
  plotDataStorage.altitudeExp.push(.25)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.264)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.346)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.442)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.562)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.726)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.918)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(1.134)
}
for(i = 0; i < plotDataStorage.altitude.length - 75; i++){
  plotDataStorage.altitudeExp.push(1.394)
}
*/

for(i = 0; i < 15; i++){
  plotDataStorage.altitudeExp.push(0)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.247)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.425)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.644)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(.897)
}
for(i = 0; i < 5; i++){
  plotDataStorage.altitudeExp.push(1.185)
}
for(i = 0; i < 1; i++){
  plotDataStorage.altitudeExp.push(1.51)
}
for(i = 0; i < plotDataStorage.ascentAltitude.length - 42; i++){
  plotDataStorage.altitudeExp.push(1.586)
}


for(i = 0; i < 16; i++){
  plotDataStorage.velocityExp.push(0)
}
for(i = 0; i < 5; i++){
  plotDataStorage.velocityExp.push(34.25)
}
for(i = 0; i < 5; i++){
  plotDataStorage.velocityExp.push(44.52)
}
for(i = 0; i < 5; i++){
  plotDataStorage.velocityExp.push(53.08)
}
for(i = 0; i < 5; i++){
  plotDataStorage.velocityExp.push(61.64)
}
for(i = 0; i < 5; i++){
  plotDataStorage.velocityExp.push(68.49)
}
for(i = 0; i < plotDataStorage.ascentAltitude.length - 42; i++){
  plotDataStorage.velocityExp.push(78.77)
}


//Array with output data
var results = [outputT, outputve, outputa, TWR, Isp, speedAtMECO, topSpeed, airPulseDeltaV, timeToMECO, MECOaltitude, airPulseEnd, airPulseEndAltitude, altitude, apogeeTime, hBurnout, vBurnout, landingTime, landingDeltaV];
return results;
}