const geolib = require('geolib');

function getDistance(params) {

    const { fromLat, fromLng, toLat, toLng } = params;

    let distance =  geolib.getDistance(
        { latitude: fromLat, longitude: fromLng },
        { latitude: toLat, longitude: toLng }
    );

    let minutes = distance/1.39;
    minutes = minutes/60;


    return { distance, minutes };
}

module.exports = {
    getDistance
}


