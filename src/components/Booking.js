import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from './Navbar';
import 'leaflet-routing-machine';
import axios from 'axios';

// Fix default marker icons for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Booking = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropOffCoords, setDropOffCoords] = useState(null);
  const [vehicleType, setVehicleType] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState(null);

  // Function to calculate the Haversine distance
  const haversineDistance = (coords1, coords2) => {
    const toRad = (Value) => (Value * Math.PI) / 180;
    const lat1 = coords1[0];
    const lon1 = coords1[1];
    const lat2 = coords2[0];
    const lon2 = coords2[1];
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Function to get the coordinates of an address using OpenStreetMap's Nominatim API
  const getCoordsFromAddress = async (address) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
      const { lat, lon } = response.data[0]; // Get the first result
      return [parseFloat(lat), parseFloat(lon)];
    } catch (error) {
      console.error('Error getting coordinates:', error);
      return null;
    }
  };

  // Move map to a new location and add marker
  const MoveToLocation = ({ coords }) => {
    const mapInstance = useMap();
    useEffect(() => {
      if (coords) {
        mapInstance.setView(coords, 13);
      }
    }, [coords, mapInstance]);
    return coords ? <Marker position={coords}><Popup>{coords.toString()}</Popup></Marker> : null;
  };

  // Function to handle cost estimation
  const handleCostEstimation = () => {
    if (pickupCoords && dropOffCoords) {
      const calculatedDistance = haversineDistance(pickupCoords, dropOffCoords);
      setDistance(calculatedDistance);

      const costPerKm = vehicleType === 'lorry' ? 20 : 5;
      setEstimatedCost(calculatedDistance * costPerKm);

      // Show route on the map
      if (map) {
        L.Routing.control({
          waypoints: [
            L.latLng(pickupCoords[0], pickupCoords[1]),
            L.latLng(dropOffCoords[0], dropOffCoords[1]),
          ],
          routeWhileDragging: true,
        }).addTo(map);
      }
    }
  };

  // Update map when input fields change
  useEffect(() => {
    const updateCoordsFromInput = async () => {
      if (pickupLocation) {
        const coords = await getCoordsFromAddress(pickupLocation);
        if (coords) setPickupCoords(coords);
      }

      if (dropOffLocation) {
        const coords = await getCoordsFromAddress(dropOffLocation);
        if (coords) setDropOffCoords(coords);
      }
    };
    updateCoordsFromInput();
  }, [pickupLocation, dropOffLocation]);

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Book a Vehicle</h2>

        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Drop-Off Location"
          value={dropOffLocation}
          onChange={(e) => setDropOffLocation(e.target.value)}
          style={styles.input}
        />

        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} style={styles.select}>
          <option value="">Select Vehicle Type</option>
          <option value="bike">Bike</option>
          <option value="lorry">Lorry</option>
        </select>

        <button onClick={handleCostEstimation} style={styles.button}>Estimate Cost</button>

        <p style={styles.resultText}>Estimated Distance: {distance.toFixed(2)} km</p>
        <p style={styles.resultText}>Estimated Cost: ₹{estimatedCost.toFixed(2)}</p>
      </div>

      {/* Map component */}
      <div style={styles.mapContainer}>
        <MapContainer
          center={[51.505, -0.09]} // Default center
          zoom={13}
          style={styles.map}
          whenCreated={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <MoveToLocation coords={pickupCoords} />
          <MoveToLocation coords={dropOffCoords} />
        </MapContainer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  resultText: {
    fontSize: '18px',
    marginTop: '10px',
    color: '#333',
  },
  mapContainer: {
    width: '100%',
    maxWidth: '800px',
    height: '400px',
    marginTop: '20px',
  },
  map: {
    height: '100%',
    width: '100%',
  },
};

export default Booking;
