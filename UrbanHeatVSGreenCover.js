//Area of interests
var urbanAOI=geometry;
var ruralAOI=geometry2;

//Satellite imagery
var urban = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterBounds(urbanAOI)
  .filterDate('2023-01-01', '2023-12-31') 
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .select(['B2', 'B3', 'B4', 'B8'])
  .median(); 

Map.centerObject(urbanAOI, 10);
Map.addLayer(urban.clip(urbanAOI), {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Sentinel-2 urban Image');

var rural = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterBounds(ruralAOI)
  .filterDate('2023-01-01', '2023-12-31') 
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .median(); 

Map.centerObject(ruralAOI, 10);
Map.addLayer(rural.clip(ruralAOI), {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Sentinel-2  rural Image');

// NDVI calculation 
function calculateNDVI(image) {
  return image.normalizedDifference(['B8', 'B4']).rename('NDVI');
}

var urbanNDVI = calculateNDVI(urban);
var ruralNDVI = calculateNDVI(rural);

Map.addLayer(urbanNDVI.clip(urbanAOI), {min: 0, max: 1, palette: ['white', 'green']}, 'Urban NDVI');
Map.addLayer(ruralNDVI.clip(ruralAOI), {min: 0, max: 1, palette: ['white', 'green']}, 'Rural NDVI');

//Land surface temperature
var urbanLandsat=ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
.filterBounds(urbanAOI)
.filterDate('2023-01-01', '2023-12-31')
.filter(ee.Filter.lt('CLOUD_COVER',10))
.median()

var urbanLST = urbanLandsat.select('ST_B10').multiply(0.00341802).add(149.0);
var urbanLST_Celsius = urbanLST.subtract(273.15);
Map.addLayer(urbanLST_Celsius.clip(urbanAOI), 
  {min: 20, max: 45, palette: ['blue', 'yellow', 'orange', 'red']}, 
  'Urban LST (°C)');

var ruralLandsat=ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
.filterBounds(ruralAOI)
.filterDate('2023-01-01', '2023-12-31')
.filter(ee.Filter.lt('CLOUD_COVER',10))
.median()

var ruralLST = ruralLandsat.select('ST_B10').multiply(0.00341802).add(149.0);
var ruralLST_Celsius = ruralLST.subtract(273.15);
Map.addLayer(ruralLST_Celsius.clip(ruralAOI), 
  {min: 20, max: 45, palette: ['blue', 'yellow', 'orange', 'red']}, 
  'Rural LST (°C)');

//Quantitaive analysis
var urbanNDVIStats = urbanNDVI.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: urbanAOI,
  scale: 30, // Sentinel-2 resolution
  maxPixels: 1e9
});

print('Urban NDVI min and max', urbanNDVIStats);
var urbanLSTStats = urbanLST_Celsius.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: urbanAOI,
  scale: 30, // Approximate Landsat resolution
  maxPixels: 1e9
});

print('Urban LST (°C) min and max', urbanLSTStats);


var ruralNDVIStats = ruralNDVI.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: ruralAOI,
  scale: 30, // Sentinel-2 resolution
  maxPixels: 1e9
});

print('rural NDVI min and max', ruralNDVIStats);
var ruralLSTStats = ruralLST_Celsius.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: ruralAOI,
  scale: 30, // Approximate Landsat resolution
  maxPixels: 1e9
});

print('rural LST (°C) min and max', ruralLSTStats);






//OUTPUT
//Urban NDVI min and max
//Object (2 properties)
//NDVI_max: 0.6212736179146257
//NDVI_min: -0.19445504260460383
//Urban LST (°C) min and max
//Object (2 properties)
//ST_B10_max: 49.20001133000005
//ST_B10_min: 24.60393941000001
//rural NDVI min and max
//Object (2 properties)
//NDVI_max: 0.7175856181580798
//NDVI_min: -0.02312673450508788
//rural LST (°C) min and max
//Object (2 properties)
//ST_B10_max: 34.760585839999976
//ST_B10_min: 15.841845140000032