<!DOCTYPE html>
<html>
<body>


<h1>Oregon Hospitals</h1>

<div id="googleMap" style="width:100%;height:400px;"></div>

<script>

//uses load function to get file with lat/long
map.data.loadGeoJson('test_data.json');

  function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(44.037632, -120.513740), //TODO update these coordinates to be center average of all OR hospitals?
    zoom:5,
  };

//make new map using Map()
//general syntax: new google.maps.Map(HTMLElement, MapOptions);
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

//marker that is location of hospital within specified radius
var marker = new google.maps.Marker({position: myCenter, animation:google.maps.Animation.BOUNCE});
marker.setMap(map);

//zooms on marker when user clicks
google.maps.event.addListener(marker,'click',function() {
  map.setZoom(9);
  map.setCenter(marker.getPosition());
});

//save zoom changes and pan map back after 3 seconds
google.maps.event.addListener(marker,'click',function() {
  var pos = map.getZoom();
  map.setZoom(9);
  map.setCenter(marker.getPosition());
  window.setTimeout(function() {map.setZoom(pos);},3000);
});

//infowindow opens when clicking on specific marker
var infowindow = new google.maps.InfoWindow({
  content:"Hello World!"
});

google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map,marker);
});

google.maps.event.addListener(map, 'click', function(event) {
  placeMarker(map, event.latLng);
});

//allows user to place and label a marker on the map
//TODO augment this by allowing user to add coordinates to list of "favorites"?
function placeMarker(map, location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() +
    '<br>Longitude: ' + location.lng()
  });
  infowindow.open(map,marker);
}

</script>


//Google API key
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAKCwoT2QjZr1Kg9w4UNZ7E148wB9M1hrg
&callback=myMap"></script>



</body>
</html>
