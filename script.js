

let map;

function initMap() {
    const myloc = { lat: 40.38127583822331, lng: 49.86776630483177 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: myloc,
    });

    new google.maps.Marker({
        position: myloc,
        map: map,
        title: "You are here",
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new google.maps.Size(30, 30)
        },
    });

    fetchNearbyPlaces(myloc);
}

function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    if (menu.style.width === "100%") {
        menu.style.width = "0";
    } else {
        menu.style.width = "100%";
    }
}

function fetchNearbyPlaces(location) {
    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: location,
        radius: '1000',
        type: 'museum'
    };

    service.nearbySearch(request, processResults);
}

function processResults(results, status, pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
            console.log(results[i])
        }

        if (pagination && pagination.hasNextPage) {
            setTimeout(() => {
                pagination.nextPage();
            }, 2000);
        }
    } else {
        console.error('Places request failed due to ' + status);
    }
}

function createMarker(place) {
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
    });

}



window.initMap = initMap;

