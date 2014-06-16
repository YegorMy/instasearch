var myMap;

ymaps.ready(init);

function init () {
    myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], // Москва
        zoom: 15
    });

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        instagram.getLocations(coords);
    });
}