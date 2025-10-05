import React, { useEffect, useState } from "react";

function LocationFinder() {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse Geocoding
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data && data.address) {
                const addr = data.address;
                // Pick best available field
                const city =
                  addr.city ||
                  addr.town ||
                  addr.village ||
                  addr.hamlet ||
                  addr.suburb ||
                  addr.county ||
                  addr.state_district ||
                  addr.state ||
                  "Unknown location";

                const country = addr.country || "";
                setLocation(`${city}${country ? ", " + country : ""}`);
              } else {
                setLocation("Unable to detect location ❌");
              }
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

  return (
    <p className="d-flex align-items-center">
      <i className="bi bi-geo-alt-fill text-danger me-2"></i>
      {location}
    </p>
  );
}

export default LocationFinder;
