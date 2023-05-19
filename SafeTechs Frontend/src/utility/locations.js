import route_service from "../services/route_service";
var locations = new Map();
const getPromisedMarkers = async () => {
    var locations = await route_service.getRoutes();
    return locations;
}

const processRoutes = async (data) => {
    locations.set(data.name, convertTolatLng(`${data.location.getLatitude()}, ${data.location.getLongitude()}`, "Horana"))
    
}

const convertTolatLng = (latLng, title) => {
    return {
      latLng,
      title
    };
};

export default getPromisedMarkers;