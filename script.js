const mymap = L.map('map').setView([22.9074872, 70.07306671], 5);
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(mymap);


function genOutletlist() {

    //generate the list struture for each store
    const ul = document.querySelector('.list');
    storeList.forEach((shop) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');


        //event listener when the link is clicked or heading of outlet is clicked from the list 
        a.addEventListener('click', () => {
            // a animation of zoom in to specific outlet
            flytooutlet(shop)
        })


        div.classList.add('shop-item');
        a.innerText = shop.properties.name;
        a.href = '#';
        p.innerText = shop.properties.address;

//manage the list structure
        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    })





}
//choose a specific icon or marker on the map to show the pizza outlets
var myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [30, 40]
});



genOutletlist();


//pop up function show on the marker of pizza outlet and show the details about the outlet
function makepopupcontent(shop) {
    return `
    <div>
        <h4> ${shop.properties.name} </h4>
        <p> ${shop.properties.address} </p>
        <div class="phone-number">
        <a href="tel:${shop.properties.phone}">${shop.properties.phone} </a>
        </div>
        </div>
    `
}

//make a layer for each shop or store and disable a close for popup
function onEachFeature(feature, layer) {
    layer.bindPopup(makepopupcontent(feature), { closeButton: false, offset: L.point(0, -9) })
}


//setting up Geojson for visible icons on the map. Read the documentation of geoJSON for more information.
const shopsLayer = L.geoJSON(storeList, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: myIcon })
    }

})
shopsLayer.addTo(mymap)

function flytooutlet(outlet) {
    const lat = outlet.geometry.coordinates[1]
    const lng = outlet.geometry.coordinates[0]
    mymap.flyTo([lat, lng], 15, { duration: 3 })


    //show of popup after completion of flyout function or animation

    setTimeout(() => {
        L.popup({ closeButton: false, offset: L.point(0, -9) })
            .setLatLng([lat, lng])
            .setContent(makepopupcontent(outlet))
            .openOn(mymap)
    }, 3000);
}

