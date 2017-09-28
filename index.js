let data = [
    {
        lat: 28.412839,
        lng: 77.041664
    },
    {
        lat: 28.421507,
        lng: 77.039018
    },
    {
        lat: 28.427017,
        lng: 77.037505
    },
    {
        lat: 28.429536,
        lng: 77.040552
    },
    {
        lat: 28.432287,
        lng: 77.046930
    },
    {

        lat: 28.437011,
        lng: 77.045957
    },
    {
        lat: 28.442948,
        lng: 77.038161
    },
    {
        lat: 28.448240,
        lng: 77.038023
    },
    {
        lat: 28.453622,
        lng: 77.043232
    },
    {
        lat: 28.463078,
        lng: 77.052115
    },
    {
        lat: 28.489606,
        lng: 77.080004
    },
    {
        lat: 28.498286,
        lng: 77.088410
    },
    {
        lat: 28.503162,
        lng: 77.088471
    },
    {
        lat: 28.506467,
        lng: 77.083922
    },
    {
        lat: 28.509734,
        lng: 77.079330
    }
]


var directionsDisplay;
var directionsService;
var map;

function initialize() {
    directionsService = new google.maps.DirectionsService()
    directionsDisplay = new google.maps.DirectionsRenderer({ preserveViewport: true });
    var start = new google.maps.LatLng(data[0].lat, data[0].lng);
    var mapOptions = {
        zoom: 18,
        center: start
    }
    map = new google.maps.Map(document.getElementById('myMap'), mapOptions);
    directionsDisplay.setMap(map);
    setTimeout(() => {
        calcRoute();
    }, 1000);
}

function calcRoute() {
    var waypts = [];
    for (let waypt of waypts) {
        waypts.push(new google.maps.LatLng(waypt.lat, waypt.lng))
    }

    var start = new google.maps.LatLng(data[0].lat, data[0].lng);
    var end = new google.maps.LatLng(data[data.length - 1].lat, data[data.length - 1].lng);

    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING',
        waypoints: waypts
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            setCarMarker();
        }
    });
}

var marker;
var interval;
function setCarMarker() {
    /**
     * Using symbols
     */
    let pathPoints = directionsDisplay.getDirections().routes[0].overview_path;
    marker = new google.maps.Marker({
        position: pathPoints[0],
        icon: 'bus-marker.png',
        map: map
    });

    var lineSymbol = {
        path: "m17.895,-0.31579l-11.759,0c-3.117,0 -5.643,3.467 -5.643,6.584l0,34.804c0,3.116 2.526,5.644 5.643,5.644l11.759,0c3.116,0 5.644,-2.527 5.644,-5.644l0,-34.804c-0.002,-3.117 -2.528,-6.584 -5.644,-6.584zm4.655,14.188l0,11.665l-2.729,0.351l0,-4.806l2.729,-7.21zm-1.432,-3.415c-1.016,3.9 -2.219,8.51 -2.219,8.51l-13.768,0l-2.222,-8.51c0.001,0 8.884,-3.018 18.209,0zm-16.877,10.94l0,4.492l-2.73,-0.349l0,-11.354l2.73,7.211zm-2.73,16.225l0,-10.359l2.73,0.343l0,8.196l-2.73,1.82zm1.557,2.944l2.218,-3.336l13.771,0l2.219,3.336l-18.208,0zm16.753,-5.077l0,-7.872l2.729,-0.355l0,10.048l-2.729,-1.821z",
        scale: 0.6,
        strokeColor: '#393',
        fillColor: '#000',
        fillOpacity: 1
    };
    
    var line = new google.maps.Polyline({
        path: pathPoints,
        icons: [{
          icon: lineSymbol,
          offset: '100%'
        }],
        map: map
    });
    animateCircle(line, pathPoints);


    /**
     * Using markers
     */
    // let pathIndex = 1;
    // let initialPoint = [pathPoints[pathIndex-1].lat(),pathPoints[pathIndex-1].lng()]
    // let finalPoint = [pathPoints[pathIndex].lat(),pathPoints[pathIndex].lng()]
    // let frames = 100;
    // let frameIncrement = [(finalPoint[0]-initialPoint[0])/frames, (finalPoint[1]-initialPoint[1])/frames];
    // let frameNo = 0;
    // let delay = 10;

    // setTimeout(
    //     function moveMarker(){
    //         initialPoint[0]+=frameIncrement[0];
    //         initialPoint[1]+=frameIncrement[1];

    //         let latLng = new google.maps.LatLng(initialPoint[0], initialPoint[1]);
    //         marker.setPosition(latLng);
    //         map.panTo(latLng);

    //         if(frameNo<=frames){
    //             frameNo++;
    //             setTimeout(moveMarker, delay);
    //         }else{
    //             pathIndex++;
    //             if(pathIndex < pathPoints.length){
    //                 initialPoint = [pathPoints[pathIndex-1].lat(),pathPoints[pathIndex-1].lng()]
    //                 finalPoint = [pathPoints[pathIndex].lat(),pathPoints[pathIndex].lng()]
    //                 frameIncrement = [(finalPoint[0]-initialPoint[0])/frames, (finalPoint[1]-initialPoint[1])/frames];
    //                 frameNo = 0;
    //                 setTimeout(moveMarker, delay);
    //             }
    //         }
    //     }, delay
    // );


    // interval = setInterval(()=>{
    //     // slow and consice movement
    //     marker.setPosition(pathPoints[pathIndex]);
    //     map.panTo(pathPoints[pathIndex]);
    //     pathIndex++;
    //     if(pathPoints.length <= pathIndex)
    //         clearInterval(interval);
    // },100);
}

function animateCircle(line, lineCoordinates) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % ((lineCoordinates.length)*100);

      var icons = line.get('icons');
      icons[0].offset = (count / lineCoordinates.length) + '%';
      line.set('icons', icons);
  }, 100);
}


function resetMarker() {
    marker.setMap(null);
    marker = null;
    clearInterval(interval);
    setCarMarker();
}