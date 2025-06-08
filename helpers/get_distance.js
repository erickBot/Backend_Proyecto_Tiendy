const geolib = require('geolib');

function getDistance(params) {

    const { fromLat, fromLng, toLat, toLng } = params;

    const distance =  geolib.getDistance(
        { latitude: fromLat, longitude: fromLng },
        { latitude: toLat, longitude: toLng }
    );

    return distance;
}

module.exports = {
    getDistance
}


