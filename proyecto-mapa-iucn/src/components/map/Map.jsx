import React, { useState, useEffect, useRef} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer,Marker, Popup, useMap, GeoJSON, ZoomControl } from 'react-leaflet';
import countries_geojson from './docs/countries.geo.json';
import data from './docs/countries-list.json';
import './Map.css';
import 'leaflet/dist/leaflet.css';

var SouthEast = L.latLng(-90,180),
NorthWest = L.latLng(90,-180),
Bounds = L.latLngBounds(SouthEast,NorthWest);

var regionsGroups=L.featureGroup([]);
var countryGroups=L.featureGroup([]);
var paisSeleccionado=null;
var zoom1;



const RefMap = () => {
    const {results,paises}=data;

    function cargarSelectPaises(identificadorRegion){
      var selectPaises=document.getElementById("select-pais-id");
      const {paises}=data;
      paises.forEach(pais => {
        if(pais.region === identificadorRegion){
          var opt = document.createElement('option');
          opt.value = pais.zoom+","+pais.coordinates[0]+","+pais.coordinates[1];
          opt.innerHTML=pais.country;
          selectPaises.appendChild(opt);
        }
      });
    } 

    
    //CREAMOS LA VARIABLE QUE HACE REFERENCIA AL MAPA
    const refMap = useMap();

    const [omap, setOMap] = useState();

    useEffect(() => {
                setOMap(refMap);
        }, [refMap])
    
    useEffect(() => {
        if (omap) {
              //METEMOS LOS DATOS DEL GEOJSON
            var fronteras=L.geoJSON(countries_geojson,{
              style: function (feature) {
                  return {fillColor: 'none',
                  fillOpacity: 0,};
              }
            });
            fronteras.addTo(omap);
    
            


            //RELLENAMOS EL SELECT DE LAS REGIONES Y LES ASIGNAMOS ACCIONES
            var selectRegiones=document.getElementById("select-region-id");
            results.forEach(region => {
                    var opt = document.createElement('option');
                    opt.id=region.identifier;
                    opt.value = region.zoom+","+region.coordinates[0]+","+region.coordinates[1];
                    opt.innerHTML=region.name;
                    selectRegiones.appendChild(opt);
            });
            document.getElementById("select-region-id").addEventListener('change',(event)=>{
                let ZoomYCoordenadas= event.target.value.split(",");
                omap.flyTo([ZoomYCoordenadas[1],ZoomYCoordenadas[2]],ZoomYCoordenadas[0]);
                document.getElementById("select-pais-id").innerHTML="";
                cargarSelectPaises(event.target.options[event.target.selectedIndex].id); //Rellenamos el select de los paises
              }); 

            //DESPUES DE RELLENAR EL SELECT DE LOS PAISES LES ASIGNAMOS ACCIONES            
            document.getElementById('select-pais-id').addEventListener('change',(event)=>{
              let ZoomYCoordenadas= event.target.value.split(",");
              omap.flyTo([ZoomYCoordenadas[1],ZoomYCoordenadas[2]],ZoomYCoordenadas[0]);
            });

            //AGREGAMOS LOS MARCADORES DE LAS REGIONES
            results.map((point)=>{
                if(point.name!=="Global"){
                  var marcador=L.marker([point.coordinates[0],point.coordinates[1]]).bindTooltip(point.name,{direction:'center',permanent:true}).openTooltip();
                  marcador.on('click', ()=>{omap.flyTo([point.coordinates[0],point.coordinates[1]],point.zoom)});
                  marcador.addTo(regionsGroups);
                }
                return null;
              });
            regionsGroups.addTo(omap);

           //AGREGAMOS LOS MARCADORES DE LOS PAISES  
            paises.map((pais)=>{
              var marcador=L.marker([pais.coordinates[0],pais.coordinates[1]]).bindTooltip(pais.country,{direction:'center',permanent:true}).openTooltip();
              marcador.on('click', ()=>{
                  omap.flyTo([pais.coordinates[0],pais.coordinates[1]],pais.zoom);
                  //mostrarAnimalClassControl(false);
                  paisSeleccionado=pais;
                  //fetchDataByCountry (pais);                
                  omap.on('zoomend', function() {
                      if(omap.getZoom() === pais.zoom) {
                          zoom1=pais.zoom;
                      }
                  });
                  
              });
              marcador.addTo(countryGroups);
              marcador.on('contextmenu', function() { 
                  //mostrarAnimalClassControl(false);
                  
              });
              return null;
            });

            //PONEMOS Y QUITAMOS CAPAS EN FUNCION DEL ZOOM
            omap.on('zoomend', function() {
              if(omap.getZoom() >8 && omap.hasLayer(fronteras)){
                omap.removeLayer(fronteras);
              }
              if(omap.getZoom() <8 && !omap.hasLayer(fronteras)){
                  fronteras.addTo(omap); 
              }
              if(omap.getZoom() <(zoom1-2)){
                  //mostrarAnimalClassControl(false);
              }
            if (omap.getZoom() <4){
                  omap.removeLayer(countryGroups);
                  regionsGroups.addTo(omap);
              }else {
                  omap.removeLayer(regionsGroups);
                  countryGroups.addTo(omap);       
              }
            });

            //CONTROL PARA HACER FULL SCREEN
            var fullScreenControl = L.control({position:'topright'});
            fullScreenControl.onAdd=()=>{
                const container = L.DomUtil.create("input", "leaflet-control-zoom leaflet-bar leaflet-control");
                container.type = "button";
                container.title = "Ver en pantalla completa";
                container.style.backgroundImage = "url(https://cdn-icons-png.flaticon.com/512/2089/2089670.png)";
                container.style.backgroundSize = "15px 15px";
                container.style.backgroundRepeat = "no-repeat";
                container.style.backgroundPosition = "50% 50%";
                container.style.width = "32px";
                container.style.height = "32px";
                container.style.padding = "12px";
                container.style.lineHeight = "30px";
                container.style.fontSize = "22px";
                container.style.fontWeight = "bold";
                container.style.cursor = "pointer";

                container.onclick = () => {
                    if (!document.fullscreenElement) {
                        document.getElementById("mapa")?.requestFullscreen();
                        container.title = "Salir de pantalla completa";
                    }else{
                        container.title = "Ver en pantalla completa";
                        document.exitFullscreen();
                    }
                };
                return container;
            }
            fullScreenControl.addTo(omap);

            
          

        }
    }, [omap]);
    

/* 








 */


    return null;
  };

  

    
 

const Mapa =()=>{

    return (
      <>
        <select name="select-region" id="select-region-id"></select>
        <select name="select-pais" id="select-pais-id"></select>
        <div className="principal">
          <div className="contenedor">
            <div className="location-container">
              <MapContainer id="mapa" className={'mapa'} center={[12,0]} zoom={2.25} minZoom= {2.25} zoomSnap= {0.25} maxBounds= {Bounds} maxBoundsViscosity= {1.0} zoomControl={false}>
                <RefMap />
              <TileLayer
                attribution='Mapa de prueba de la <a href="https://www.iucnredlist.org/" target="_blank">Lista Roja de Especies Amenazadas de la IUCN</a> hecho por Andres y Guillermo'
                url="http://tile.stamen.com/terrain-background/{z}/{x}/{y}.jpg" noWrap={true}
              />
              <ZoomControl position='topright' />
              {/* <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
              </MapContainer>
            </div>
          </div>
        </div>
     
      </>

     );
}

export default Mapa;