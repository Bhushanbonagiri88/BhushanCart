import React, { useEffect, useState } from "react";

function LocationFinder() {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Use reverse geocoding to convert lat/lon into city, region, etc.
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((res) => res.json())
            .then((data) => {
              setLocation(data.address.city || data.address.town || data.address.village || "Unknown location");
            })
            .catch(() => setLocation("Unable to fetch location ❌"));
        },
        () => {
          setLocation("Permission denied ❌");
        }
      );
    } else {
      setLocation("Geolocation not supported ❌");
    }
  }, []);

  return <p className="d-flex align-items-center">
      <i className="bi bi-geo-alt-fill text-danger me-2"></i>
      {location}
    </p>;
}

export default LocationFinder;
