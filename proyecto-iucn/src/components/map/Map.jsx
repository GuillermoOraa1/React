import './Map.css';
import L from 'leaflet';
import countries_geojson from './docs/countries.geojson';

var SouthEast = L.latLng(-90,180),
NorthWest = L.latLng(90,-180),
Bounds = L.latLngBounds(SouthEast,NorthWest);


var mapa=L.map("mapa",{minZoom: 2.25,zoomSnap: 0.25,maxBounds: Bounds,maxBoundsViscosity: 1.0,zoomControl:false}).setView([12,0],2.25);

mapa.attributionControl.addAttribution('Mapa de prueba de la <a href="https://www.iucnredlist.org/" target="_blank">Lista Roja de Especies Amenazadas de la IUCN</a> hecho por Andres y Guillermo');

L.tileLayer('http://tile.stamen.com/terrain-background/{z}/{x}/{y}.jpg',{noWrap:true}).addTo(mapa); 

/* var fronteras=L.geoJSON(countries_geojson,{
        style: function (feature) {
            return {fillColor: 'none',
            fillOpacity: 0,};
        }
});

fronteras.addTo(mapa);  */


const map =()=>{
    return(
        <>
         <select name="select-region" id="select-region-id"></select>
         <select name="select-pais" id="select-pais-id"></select>
         <div id="principal">
          <div id="contenedor">
            <div id="mapa"></div>
          </div>
         </div>
        </>
    );
}

export default map;