# UrbanHeatVSGreenCover
# 🌍 Urban Heat & Vegetation Analysis using Google Earth Engine

## 📌 Project Overview
This project analyzes and compares **vegetation cover (NDVI)** and **land surface temperature (LST)** between:
- **Urban area**: New Delhi and surrounding regions
- **Rural area**: Aizawl and its surrounding areas

The aim is to visualize the impact of urbanization on green cover and surface temperature using remote sensing data on Google Earth Engine (GEE).

---

## 📍 Why These AOIs?
- **New Delhi**: A highly urbanized region with dense population, infrastructure, and relatively lower vegetation.
- **Aizawl**: A hilly, less urbanized rural region with abundant green cover and lesser built-up stress.

These two contrasting areas help illustrate the effects of vegetation on surface temperature.

---

## 🛰️ Datasets Used

| Satellite       | Dataset ID                        | Use Case             | Key Bands         |
|-----------------|------------------------------------|----------------------|--------------------|
| **Sentinel-2**  | `COPERNICUS/S2_SR`                | NDVI calculation     | B4 (Red), B8 (NIR) |
| **Landsat 8**   | `LANDSAT/LC08/C02/T1_L2`          | LST calculation      | ST_B10 (Thermal)   |

---

## 🧪 NDVI and LST — What & Why

- **NDVI (Normalized Difference Vegetation Index)**:  
  Indicates the amount and health of vegetation.  
  Range: -1 to 1 (higher = more vegetation).

- **LST (Land Surface Temperature)**:  
  Measures how hot the land surface is.  
  Calculated from thermal bands of Landsat.

- **Relationship**:  
  Generally, **higher NDVI leads to lower LST**, because plants cool the land via shade and transpiration.

---

## 🔧 Setup Instructions

> This project runs on the [Google Earth Engine Code Editor](https://code.earthengine.google.com/).

### Steps to Run:
1. Go to [code.earthengine.google.com](https://code.earthengine.google.com/)
2. Copy and paste the script into the editor.
3. Create two geometries:
   - `geometry` for New Delhi (urban AOI)
   - `geometry2` for Aizawl (rural AOI)
4. Click **Run** to visualize the NDVI and LST layers on the map and inspect statistics in the console.

---

## 📊 Output Summary

| Metric              | Urban (New Delhi)      | Rural (Aizawl)         |
|---------------------|------------------------|------------------------|
| **NDVI (min–max)**  | -0.19 to **0.62**      | -0.02 to **0.72**      |
| **LST (min–max)**   | **24.6°C** to **49.2°C** | **15.8°C** to **34.7°C** |

---

## 📈 Interpretation

- **Urban region** has:
  - **Lower NDVI**, indicating sparse green cover.
  - **Higher LST**, due to concrete surfaces and heat retention.

- **Rural region** has:
  - **Higher NDVI**, meaning denser vegetation.
  - **Lower LST**, due to cooling effects of vegetation.

✅ This confirms the **Urban Heat Island effect**, where built-up areas are significantly warmer than their rural counterparts.

---

## 🧠 Learnings

- The use of **two different satellites** (Sentinel-2 for NDVI and Landsat-8 for LST) requires careful handling due to differences in resolution and acquisition times.
- Despite these differences, combining them provides valuable insights into environmental contrasts between urban and rural areas.

---


