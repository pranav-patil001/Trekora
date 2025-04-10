maptilersdk.config.apiKey = mapToken;


const mapData = document.getElementById('map-data');
const coordinates = JSON.parse(mapData.dataset.coordinates); // [lng, lat]
const locationText = mapData.dataset.location; 

const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element to render the map
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});



const marker = new maptilersdk.Marker({ color: "red"})
.setLngLat(coordinates)
.setPopup(new maptilersdk.Popup({offset: 25})
.setHTML(`
    <div style="text-align: center;">
      <h4 style="margin: 0;">${locationText}</h4>
      <p style="margin: 0;">Exact Location provided after booking</p>
    </div>
  `)
)
.addTo(map);