const address = `${listing.location}, ${listing.country}`;

fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
    .then((res) => res.json())
    .then((data) => {
        let lat = 23.2599;
        let lng = 77.4126;

        if (data.length > 0) {
            lat = data[0].lat;
            lng = data[0].lon;
        }

        const map = L.map("map").setView([lat, lng], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);

        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>${listing.title}</b><br>${address}`)
            .openPopup();
    });