# camera-combinator-6crickets
Assumes the following data structure for a spec / camera
```
{
	distance: {
		start: 0,
		end: 20
	},
	light: {
		start: 1000,
		end: 2000
	}
}
```
Each of the parameters to the function 
`doGivenCamerasSufficeTheSpecs(specs, providedCameras)`
has to be an array of that data structure mentioned above.

The function tells whether the provided camera list suffices the desired specs.

By default the `specs` and `providedCameras` vars have been populated with some values in the script
file but feel free to change their values with your test inputs.

## Run
Navigate to project root and run the script
```
node index.js
```
