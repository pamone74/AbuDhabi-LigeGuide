
// Initialize the map with a default view in case location is unavailable
var map = L.map('map').setView([23.821077, 54.319628], 8);  // Centered around Abu Dhabi

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to add mosque data to the map
function addMosqueData() {
    fetch("https://data.abudhabi/opendata/dataset/detail?id=8b5c5e63-2af1-4516-9a8c-cebd9d85f7b3&outSR=4326&f=geojson")
        .then(response => response.json())
        .then(data => {
            // Add markers to the map
            data.features.forEach(feature => {
                const coords = feature.geometry.coordinates;
                const properties = feature.properties;
                const marker = L.marker([coords[1], coords[0]]).addTo(map);

                // Add popup to each marker
                marker.bindPopup(`
                        <strong>${properties.NAMEENG}</strong><br>
                        Capacity: ${properties.CAPACITY}<br>
                        Wheelchair Access: ${properties.WHEELCHAIRACCESS}<br>
                        Female Room: ${properties.FEMALEROOM ? 'Yes' : 'No'}
                    `);
            });
        })
        .catch(error => console.log("Error loading mosque data: ", error));
}

// Check if geolocation is available
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Center the map on the user's location
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const userLocation = [userLat, userLng];
            map.setView(userLocation, 13);  // Zoom level 13 for closer view

            // Add a circle to indicate the user's location with a radius of 5 km
            L.circle(userLocation, {
                color: 'blue',
                fillColor: '#add8e6',
                fillOpacity: 0.3,
                radius: 5000  // Radius in meters (5 km)
            }).addTo(map).bindPopup("You are here");

            // Load mosque data after setting the user's location
            addMosqueData();
        },
        function (error) {
            console.log("Geolocation not available or permission denied.");
            // Load mosque data even if geolocation fails
            addMosqueData();
        }
    );
} else {
    console.log("Geolocation is not supported by this browser.");
    // Load mosque data if geolocation is not supported
    addMosqueData();
}

//Map content from Page

// Initialize the map with a default view in case location is unavailable
var map = L.map('map').setView([23.821077, 54.319628], 8);  // Centered around Abu Dhabi

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to add mosque data to the map
function addMosqueData() {
    fetch("https://data.abudhabi/opendata/dataset/detail?id=8b5c5e63-2af1-4516-9a8c-cebd9d85f7b3&outSR=4326&f=geojson")
        .then(response => response.json())
        .then(data => {
            // Add markers to the map
            data.features.forEach(feature => {
                const coords = feature.geometry.coordinates;
                const properties = feature.properties;
                const marker = L.marker([coords[1], coords[0]]).addTo(map);

                // Add popup to each marker
                marker.bindPopup(`
                     <strong>${properties.NAMEENG}</strong><br>
                     Capacity: ${properties.CAPACITY}<br>
                     Wheelchair Access: ${properties.WHEELCHAIRACCESS}<br>
                     Female Room: ${properties.FEMALEROOM ? 'Yes' : 'No'}
                 `);
            });
        })
        .catch(error => console.log("Error loading mosque data: ", error));
}

// Check if geolocation is available
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Center the map on the user's location
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const userLocation = [userLat, userLng];
            map.setView(userLocation, 13);  // Zoom level 13 for closer view

            // Add a circle to indicate the user's location with a radius of 5 km
            L.circle(userLocation, {
                color: 'blue',
                fillColor: '#add8e6',
                fillOpacity: 0.3,
                radius: 5000  // Radius in meters (5 km)
            }).addTo(map).bindPopup("You are here");

            // Load mosque data after setting the user's location
            addMosqueData();
        },
        function (error) {
            console.log("Geolocation not available or permission denied.");
            // Load mosque data even if geolocation fails
            addMosqueData();
        }
    );
} else {
    console.log("Geolocation is not supported by this browser.");
    // Load mosque data if geolocation is not supported
    addMosqueData();
}