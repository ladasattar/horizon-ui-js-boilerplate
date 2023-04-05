import React, { useEffect, useState } from "react";
import Card from "components/card";
import L from "leaflet";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = (props) => {
  const [googleMap, setGoogleMap] = useState(null);
  const [map, setMap] = useState(null);
  const [positionGMap, setPositionGMap] = useState({});
  const [position, setPosition] = useState([51.505, -0.09]);

  // Google Map
  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCtuj4abWmAxkuQaRMZHu2uLyUFzMTShog",
  });

  const onLoad = React.useCallback(function callback(googleMap) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    googleMap.fitBounds(bounds);

    setGoogleMap(googleMap);
  }, []);

  const onUnmount = React.useCallback(function callback(googleMap) {
    setGoogleMap(null);
  }, []);

  // Leaflet Map
  useEffect(() => {
    if (map) {
      map?.flyTo(position, 10, {
        duration: 2,
      });
    }
  }, [map, position]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setPositionGMap({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="mt-3">
      <Card extra={"w-full p-4 h-full"}>
        <div className="mb-8 w-full">
          {props.title !== "" && (
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {props.title}
            </h4>
          )}
          {props.description !== "" && (
            <p className="mt-2 text-base text-gray-600">{props.description}</p>
          )}
        </div>
        <div className="overflow-hidden rounded-xl">
          <MapContainer
            markerZoomAnimation={true}
            zoomAnimation={false}
            center={position}
            zoom={5}
            scrollWheelZoom={true}
            style={{
              height: "500px",
            }}
            ref={(ref) => setMap(ref)}
          >
            <TileLayer
              url="http://mt0.google.com/vt/lyrs=m,traffic&hl=sl&x={x}&y={y}&z={z}&s=Ga"
              attribution="Tiles &copy; Google &mdash; Source: Google Map"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </Card>
      <Card extra={"w-full p-4 h-full mt-5"}>
        <div className="mb-8 w-full">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Google Map
          </h4>
          <p className="mt-2 text-base text-gray-600">Map from Google Map</p>
        </div>
        <div className="overflow-hidden rounded-xl">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                height: "500px",
                width: "100%",
              }}
              zoom={8}
              center={{
                lat: -3.745,
                lng: -38.523,
              }}
              onLoad={onLoad}
              onUnmount={onUnmount}
            ></GoogleMap>
          ) : (
            <></>
          )}
        </div>
      </Card>
    </div>
  );
};

Map.defaultProps = {
  title: "Map React Leaflet",
  description: "Map React Leaflet",
};

export default Map;
