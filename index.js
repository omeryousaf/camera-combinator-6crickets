const desiredSpecs = [
	{
		distance: {
			start: 0,
			end: 20
		},
		light: {
			start: 1000,
			end: 2000
		}
	}, {
		distance: {
			start: 50,
			end: 100
		},
		light: {
			start: 500,
			end: 1000
		}
	}];

const cameras = [
	{
		distance: {
			start: 20,
			end: 100
		},
		light: {
			start: 500,
			end: 2000
		}
	}, {
		distance: {
			start: 0,
			end: 10
		},
		light: {
			start: 200,
			end: 400
		}
	}, {
		distance: {
			start: 0,
			end: 19
		},
		light: {
			start: 0,
			end: 2000
		}
	}];


function isSpec2DRangeCovered(spec, providedCameras) {
	let coveredRangeMap = {};
	const cameraCount = providedCameras.length;
	let currentCamera, cameraDistStart, cameraDistEnd, cameraLightStart, cameraLightEnd;
	console.log(`ranges
		distance: ${spec.distance.start} - ${spec.distance.end}
		light: ${spec.light.start} - ${spec.light.end}`)
	let distanceIndexStart, distanceIndexEnd, lightIndexStart, lightIndexEnd;
	for(let i = 0; i < cameraCount; i++) {
		currentCamera = providedCameras[i];
		cameraDistStart = currentCamera.distance.start;
		cameraDistEnd = currentCamera.distance.end;
		cameraLightStart = currentCamera.light.start;
		cameraLightEnd = currentCamera.light.end;
		console.log(`processing camera #${i + 1}
			distance range: ${cameraDistStart} - ${cameraDistEnd}
			light range: ${cameraLightStart} - ${cameraLightEnd}`);
		// Skip camera if either of it has no overlap with desired spec range(s)
		if(cameraDistStart > spec.distance.end || cameraDistEnd < spec.distance.start) {
			continue;
		}
		if(cameraLightStart > spec.light.end || cameraLightEnd < spec.light.start) {
			continue;
		}
		// If spec's distance range START lies within camera's distance range, set spec distance START
		// as start index for traversal on distance dimension.
		if(cameraDistStart <= spec.distance.start && spec.distance.start <= cameraDistEnd) {
			distanceIndexStart = spec.distance.start;
		}
		// If camera's distance range START lies within spec's distance range, set camera distance
		// START as starting index for traversal on distance dimension.
		if(spec.distance.start <= cameraDistStart && cameraDistStart <= spec.distance.end) {
			distanceIndexStart = cameraDistStart;
		}
		// If camera's distance range END lies within spec's distance range, set camera distance END
		// as end index for distance traversal.
		if(spec.distance.start <= cameraDistEnd && cameraDistEnd <= spec.distance.end) {
			distanceIndexEnd = cameraDistEnd;
		}
		// If spec's distance range END lies within camera's distance range, set spec distance END
		// as end index for distance traversal.
		if(cameraDistStart <= spec.distance.end && spec.distance.end <= cameraDistEnd) {
			distanceIndexEnd = spec.distance.end;
		}
		// Set lightIndexStart, lightIndexEnd in a similar way.
		// If spec's light range START lies within camera's light range
		if(cameraLightStart <= spec.light.start && spec.light.start <= cameraLightEnd) {
			lightIndexStart = spec.light.start;
		}
		// If camera's light range START lies within spec's light range
		if(spec.light.start <= cameraLightStart && cameraLightStart <= spec.light.end) {
			lightIndexStart = cameraLightStart;
		}
		// If camera's light range END lies within spec's light range
		if(spec.light.start <= cameraLightEnd && cameraLightEnd <= spec.light.end) {
			lightIndexEnd = cameraLightEnd;
		}
		// If spec's light range END lies within camera's light range
		if(cameraLightStart <= spec.light.end && spec.light.end <= cameraLightEnd) {
			lightIndexEnd = spec.light.end;
		}

		console.log(`Ranges to traverse
			distance: ${distanceIndexStart} ... ${distanceIndexEnd}
			light: ${lightIndexStart} ... ${lightIndexEnd}`);
		// Traverse the ranges in two dimensions and mark them covered by creating an entry in a
		// dictionary.
		for(let distanceIndex = distanceIndexStart; distanceIndex <= distanceIndexEnd; distanceIndex++) {
			for(let lightIndex = lightIndexStart; lightIndex <= lightIndexEnd; lightIndex++) {
				coveredRangeMap[`${distanceIndex}-${lightIndex}`] = `${distanceIndex}-${lightIndex}`;
			}
		}
	}
	console.log(`Actual 2D (distance * light) range cells covered: ${Object.keys(coveredRangeMap).length}`);
	const specDistanceRangeLength = spec.distance.end - spec.distance.start + 1; // +1 adds range start to the length
	const specLightRangeLength = spec.light.end - spec.light.start + 1;
	const spec2DCellsCount = specDistanceRangeLength * specLightRangeLength;
	console.log(`Expected Distance * Light cells count: ${specDistanceRangeLength} * ${specLightRangeLength} = ${spec2DCellsCount}`)
	return Object.keys(coveredRangeMap).length === spec2DCellsCount;
}

function doGivenCamerasSufficeTheSpecs(specs, providedCameras) {
	const specCount = specs.length;
	let spec;
	for(let i = 0; i < specCount; i++) {
		spec = specs[i];
		console.log(`Checking coverage for spec #${i + 1}`);
		if(!isSpec2DRangeCovered(spec, providedCameras)) {
			return false;
		}
	}
	return true;
}

console.log(`Provided cameras suffice the desired specs: ${doGivenCamerasSufficeTheSpecs(desiredSpecs, cameras)}`);