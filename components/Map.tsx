import { useState } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { HomeIcon } from "@heroicons/react/solid";

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGl
      mapStyle="mapbox://styles/strandev/ckswbiu7d3oey17qnjnzbxlza"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <a
              role="img"
              aria-label="location-icon"
              onClick={() => setSelectedLocation(result)}
              className=""
            >
              <HomeIcon className="h-6  text-red-100" />
            </a>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              className="z-20"
              onClose={() => setSelectedLocation({})}
              longitude={result.long}
              latitude={result.lat}
              closeOnClick={true}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGl>
  );
};

export default Map;
