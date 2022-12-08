import axios from "axios";
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {fromLonLat} from 'ol/proj';

const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

// declare var ol: any;
// declare var google: any;

const formEl = document.querySelector('form')! as HTMLFormElement;
const addressInputEl = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[],
    status: 'OK' | 'ZERO_RESULTS'
};

function searchAddressHandler(event: Event) {
    event.preventDefault();

    const address = addressInputEl.value;
    const encodedAddress = encodeURI(address);


    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            let coordinates = {lat: 40.41, lng: -73.99}; // Can't fetch coordinates from Google API, use dummy ones

            // if (response.data.status !== "OK") {
            if (response.data.status === "OK") {
                // throw new Error('Could not fetch the location!');
                coordinates = response.data.results[0].geometry.location;
            }

            document.getElementById('map')!.innerHTML = '';

            new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([coordinates.lng, coordinates.lat]),
                    zoom: 16
                })
            });

            // const map = new google.maps.Map(document.getElementById("map")!, {
            //     center: coordinates,
            //     zoom: 16
            // });
            // new google.maps.Marker({position: coordinates, map: map});
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
}

formEl.addEventListener('submit', searchAddressHandler);
