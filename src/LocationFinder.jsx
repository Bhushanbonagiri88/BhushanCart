import React, { useEffect, useState } from "react";

function LocationFinder() {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setLocation(`${data.city}, ${data.region}, ${data.country_name}`);
      })
      .catch(() => setLocation("Unable to fetch location ❌"));
  }, []);

  return <p>📍{location}</p>;
}

export default LocationFinder;
