import React, { useState, useEffect, useRef} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer,Marker, Popup, useMap, GeoJSON, ZoomControl } from 'react-leaflet';
import countries_geojson from './docs/countries.geo.json';
import data from './docs/countries-list.json';
import IUCNlogo from "../../assets/images/IUCN_Red_List-2.png";
import mammalsIcon from  "../../assets/icons-menu/mamiferos.png";
import reptilesIcon from  "../../assets/icons-menu/reptiles.jpg";
import insectsIcon from  "../../assets/icons-menu/insectos.png";
import amphibiansIcon from  "../../assets/icons-menu/anfibios-2.png";
import birdsIcon from  "../../assets/icons-menu/aves.png";
import fishesIcon from  "../../assets/icons-menu/peces.jpg";
import './Map.css';
import 'leaflet/dist/leaflet.css';

var SouthEast = L.latLng(-90,180),
NorthWest = L.latLng(90,-180),
Bounds = L.latLngBounds(SouthEast,NorthWest);

var regionsGroups=L.featureGroup([]);
var countryGroups=L.featureGroup([]);

var mammaliaGroup=L.featureGroup([]);
var reptiliaGroup=L.featureGroup([]);
var insectaGroup=L.featureGroup([]);
var amphibiaGroup=L.featureGroup([]);
var birdGroup=L.featureGroup([]);
var fishGroup=L.featureGroup([]);

var paisSeleccionado=null;
var zoom1;
var nivelDeAmenaza="CR";



const RefMap = ({changeIdAnimal}) => {

    const [idAnimal2, setIdAnimal2]=useState('');
    useEffect(() => {
      changeIdAnimal(idAnimal2);
    }, [idAnimal2]);

    /*
    const [idAnimal, setIdAnimal]=useState('');

    useEffect(() => {
      changeId(idAnimal);
    }, [idAnimal]);
    */

    const {results,paises}=data;

    const cargarSelectPaises=(identificadorRegion)=>{
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

    const consultarEspeciespais = async(texto)=>{
      const mySet1 = new Set();
      var url="http://apiv3.iucnredlist.org/api/v3/country/getspecies/"+texto+"?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee";
      const funcion=await fetch(url)
          .then((response) => response.json())
          .then((data) => { 
          const {result}=data;
          result.map((registro)=>{
              if(registro.category==nivelDeAmenaza) {
                  mySet1.add("http://apiv3.iucnredlist.org/api/v3/species/id/"+registro.taxonid+"?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee");
              };

          });
      }).catch(error=>{console.log(error)});

      return mySet1;
    }

    const consultarDatosEspecies= async(rutas)=>{
        var respuesta=[];
        for (const ruta of rutas) {
            const registro=await fetchDataBySpecie(ruta);
            if(registro!==null){
                //console.log(registro);
                //console.log("xxx4");
                respuesta.push(registro);
            }
        }
        return respuesta;
    }

    const fetchDataBySpecie =async(url)=>{
        var registro=null;
        var nombrecomun="";
        await fetch(url)
        .then((response) => response.json())
        .then(async (data) => {
            const {result}=data;
            if(result[0].class==="MAMMALIA" || result[0].class==="AMPHIBIA" || 
            result[0].class==="REPTILIA" || result[0].class==="INSECTA" ||
            result[0].class==="AVES" || result[0].class==="ACTINOPTERYGII") {
                /* if (result[0].scientific_name !=null){
                    nombrecientifico=result[0].scientific_name.toLowerCase().replace(" ","-").split(" ")[0]
                }else {nombrecientifico="";} */
                if (result[0].main_common_name !=null){
                    nombrecomun=result[0].main_common_name;
                }else {
                  var nombres=result[0].scientific_name.split(" ");
                  nombrecomun=nombres[0].concat(' ',nombres[1]);
                }
                

                registro={taxonid:result[0].taxonid,clase:result[0].class,nombreComun:nombrecomun,
                    nombreCientifico:result[0].scientific_name.toLowerCase().replace(" ","-").split(" ")[0],
                    poblacion:result[0].population_trend,nombreCientificoTexto:result[0].scientific_name,
                    assementDate:result[0].assessment_date};

                await fetch("http://localhost:8000/photo-google/icon/"+nombrecomun)
                .then((res) => res.json())
                .then((data) => {
                      registro.url=data.photo;
                });
            }
            

        }).catch(error=>{console.log(error)}); 
        return registro;
    }
    
    //CREAMOS LA VARIABLE QUE HACE REFERENCIA AL MAPA
    const refMap = useMap();

    const [omap, setOMap] = useState();

    const popupElRef = useRef(null);

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
                  marcador.on('click', ()=>{
                    omap.flyTo([point.coordinates[0],point.coordinates[1]],point.zoom);
                    //Cargamos en el select la lista de paises de la region que hemos pinchado
                    document.getElementById('select-pais-id').options.length=0;
                    cargarSelectPaises(point.identifier);
                  });
                  marcador.addTo(regionsGroups);
                }
                return null;
              });
            regionsGroups.addTo(omap);

           //AGREGAMOS LOS MARCADORES DE LOS PAISES  
            paises.map((pais)=>{
              var marcador=L.marker([pais.coordinates[0],pais.coordinates[1]]).bindTooltip(pais.country,{direction:'center',permanent:true}).openTooltip();
              marcador.on('click', ()=>{
                  mostrarAnimalThreatLevelSelector(false);
                  mostrarAnimalClassControl(false);
                  omap.flyTo([pais.coordinates[0],pais.coordinates[1]],pais.zoom);
                  mostrarAnimalThreatLevelSelector(true);
                  paisSeleccionado=pais;
                  fetchDataByCountry (pais);                
                  omap.on('zoomend', function() {
                      if(omap.getZoom() === pais.zoom) {
                          zoom1=pais.zoom;
                      }
                  });
                  
              });
              marcador.addTo(countryGroups);
              marcador.on('contextmenu', function() { 
                  mostrarAnimalClassControl(false);
                  mostrarAnimalThreatLevelSelector(false);
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
                mostrarAnimalClassControl(false);
                mostrarAnimalThreatLevelSelector(false);
              }
              if (omap.getZoom() <4){
                omap.removeLayer(countryGroups);
                regionsGroups.addTo(omap);
              }else {
                omap.removeLayer(regionsGroups);
                countryGroups.addTo(omap);       
              }
            });

            //HACEMOS QUE CADA VEZ QUE SE SELECCIONE UN PAIS SE MUESTREN SUS ANIMALES
            const fetchDataByCountry = (pais)=>{
              var codigoPais=pais.isocode;
              consultarEspeciespais(codigoPais)
              .then((especiesPais)=>{
                  //console.log("xxx3");
                  consultarDatosEspecies(especiesPais)
                  .then((response)=>{
                      var datosEspecie=response; //ESTA ES LA RESPUESTA CON LOS DATOS DE LAS ESPECIES DEL PAIS
                      //console.log(datosEspecie);
                      let lat=pais.coordinates[0];
                      let long=pais.coordinates[1];
                      var point1 = omap.latLngToLayerPoint([lat, long]);
                      //sacamos la altura y anchura del mapa en cada momento para que la espiral se ajuste sola
                      var mapa2=document.getElementById("mapa");
                      var estilo=getComputedStyle(mapa2);
                      var altura=Math.round(parseInt(estilo.height));
                      var anchura=Math.round(parseInt(estilo.width));
                      //var rBase=210; 
                      var rBase=340;
                      var center = point1;
                      //point1 = point1.add(L.point(130, 0));
                      let xspan = anchura / (anchura + altura);
                      let yspan = altura / (anchura + altura);
                      for (let i = 0; i < datosEspecie.length; i++) {
                          //let asymptoticExpansion = 1.2; // expansion al infinito
                          //let initialExpansion = 17;
                          //let globalExpansion = 18; // asintotica * global debe quedar mas o menos constante
                          //rho = globalExpansion * i * (asymptoticExpansion + initialExpansion/(1 + i));
                          //point1 = point1.add(L.point(xspan*rho*Math.cos(i), yspan*rho*Math.sin(i)));
                          if(datosEspecie.length<=8){
                            let x = rBase*(1+Math.trunc(i/8))*Math.cos(Math.trunc(i/8)*0.0+(i%8)*Math.PI/4)*xspan ;
                            let y = rBase*(1+Math.trunc(i/8))*Math.sin(Math.trunc(i/8)*0.0+(i%8)*Math.PI/4)*yspan;
                            point1 = center;
                            point1 = point1.add(L.point(x, y));
                          }else if(datosEspecie.length>8 && datosEspecie.length<=20){
                            if(i%4===0 && i!==0) {point1 = point1.add(L.point(-560, 90))};
                            point1 = point1.add(L.point(140, 0));
                          }else{
                            if(i%5===0 && i!==0) {point1 = point1.add(L.point(-700, 90))};
                            point1 = point1.add(L.point(140, 0));
                          }
                          
                          var latLong= omap.layerPointToLatLng(point1);
                          var imagenIcono=datosEspecie[i]["url"];
                          //var imagenIcono="https://wir.iucnredlist.org/"+datosEspecie[i]["nombreCientifico"]+".jpg";
                          var myIcon = L.icon({
                              iconUrl: imagenIcono,
                              iconSize: [48, 45],
                              iconAnchor: [25, 45],
                              shadowUrl: IUCNlogo,
                              shadowSize: [48, 45],
                              shadowAnchor: [25, 45],
                              popupAnchor: [0, -45],
                              className: 'image'
                          });
                          let marcador= L.marker(latLong,{icon: myIcon,alt: ""});
                          marcador.bindPopup(
                            L.popup().setContent(
                              `<h4>${datosEspecie[i]["nombreComun"]}</h4>
                              <img class="imagenPopup" src=${datosEspecie[i]["url"]} alt="${datosEspecie[i]["nombreComun"]}" onerror="this.style.display='none'"/><br/>
                              <p>Scientific name: "${datosEspecie[i]["nombreCientificoTexto"]}"<br/> 
                              Assessed for The IUCN Red List since: ${new Date(datosEspecie[i]["assementDate"]).getFullYear()}<br/>
                              Population: ${datosEspecie[i]["poblacion"]}<br/><button id="mostrarDatos" onclick="clicSobreImagen(${datosEspecie[i]["taxonid"]})">See more...</button>`
                            )
                          );
                          marcador.bindTooltip(datosEspecie[i]["nombreComun"],{direction:'bottom',permanent:true,className: 'transparent-tooltip'}).openTooltip();
                          if(datosEspecie[i]["clase"]==="MAMMALIA") marcador.addTo(mammaliaGroup);
                          if(datosEspecie[i]["clase"]==="REPTILIA") marcador.addTo(reptiliaGroup);
                          if(datosEspecie[i]["clase"]==="INSECTA") marcador.addTo(insectaGroup);
                          if(datosEspecie[i]["clase"]==="AMPHIBIA") marcador.addTo(amphibiaGroup);
                          if(datosEspecie[i]["clase"]==="ACTINOPTERYGII") marcador.addTo(fishGroup);
                          if(datosEspecie[i]["clase"]==="AVES") marcador.addTo(birdGroup);
                      }
      
                      mostrarAnimalClassControl(true);              
                  });

              })
              .catch(err=>console.log("Error: ",err))
            }
            //Movemos de posicion el boton del zoom
            L.control.zoom({position:'topright'}).addTo(omap);

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

          //CONTROLES DE SELECCION DE ANIMALES
          const layerControl = L.control.layers(null,null,{collapsed: false,position:"topleft"});
          function mostrarAnimalClassControl(arg){
              const mammals = L.layerGroup([mammaliaGroup]);
              const reptils = L.layerGroup([reptiliaGroup]);
              const insects = L.layerGroup([insectaGroup]);
              const amphibians = L.layerGroup([amphibiaGroup]);
              const birds = L.layerGroup([birdGroup]);
              const fishes = L.layerGroup([fishGroup]);

              if(arg===true){
                  layerControl.addOverlay(mammals, '<img src='+mammalsIcon+' width="18" height="17" /> Mammals');
                  layerControl.addOverlay(reptils, '<img src='+reptilesIcon+' width="16" height="16" /> Reptiles');
                  layerControl.addOverlay(insects, '<img src='+insectsIcon+' width="16" height="16" /> Insects');
                  layerControl.addOverlay(amphibians, '<img src='+amphibiansIcon+' width="18" height="12" /> Amphibians');
                  layerControl.addOverlay(birds, '<img src='+birdsIcon+' width="17" height="13" /> Birds');
                  layerControl.addOverlay(fishes, '<img src='+fishesIcon+' width="14" height="12" /> Fishes');
                  mammals.addTo(omap);
                  reptils.addTo(omap);
                  insects.addTo(omap);
                  amphibians.addTo(omap);
                  birds.addTo(omap);
                  fishes.addTo(omap);
                  layerControl.addTo(omap);
              }
              if(arg===false){
                  mammaliaGroup=L.featureGroup([]);
                  reptiliaGroup=L.featureGroup([]);
                  insectaGroup=L.featureGroup([]);
                  amphibiaGroup=L.featureGroup([]);
                  birdGroup=L.featureGroup([]);
                  fishGroup=L.featureGroup([]);

                  mammals.eachLayer(function(layer) { omap.removeLayer(layer);});
                  reptils.eachLayer(function(layer) { omap.removeLayer(layer);});
                  insects.eachLayer(function(layer) { omap.removeLayer(layer);});
                  amphibians.eachLayer(function(layer) { omap.removeLayer(layer);});
                  birds.eachLayer(function(layer) { omap.removeLayer(layer);});
                  fishes.eachLayer(function(layer) { omap.removeLayer(layer);});

                  layerControl._layerControlInputs=[];
                  layerControl._layers=[];
                  //console.log("ppp");
                  console.log(layerControl);
                  omap.removeControl(layerControl);
              }
          }   
          
          //CONTROLES DE NIVEL DE AMENAZA

          L.Control.SelectAnimalThreatLevel = L.Control.extend({
            //Inicializacion
            initialize: function(options){
                L.Util.setOptions(this,options);
            },
            //Opciones
            options: {
                position:'topleft',
            },

            onAdd: function(map) {
                const controlDiv = L.DomUtil.create('span', 'nivelAmenaza');
                controlDiv.innerHTML=`
                <label>Extinct in the wild<input type="radio" id="EX" name="threatLevel" onClick="modificarNivelDeAmenaza('EX')"></label><br>
                <label>Critically endangered<input type="radio" id="CR" name="threatLevel" checked onClick="modificarNivelDeAmenaza('CR')"></label><br>
                <label>Endangered<input type="radio" id="EN" name="threatLevel" onClick="modificarNivelDeAmenaza('EN')"></label><br>
                `;
                controlDiv.style.width='35%';
                controlDiv.style.height='20px';
                controlDiv.style.backgroundColor='#f1f1f1';
                controlDiv.style.textAlign='center';
                controlDiv.style.border='3px solid green';
                controlDiv.style.borderRadius='16px';
                controlDiv.style.marginLeft='20%';
                controlDiv.style.marginRight='20%';
                controlDiv.style.marginTop='0px';
                return controlDiv;
            },

            onRemove: function(map) {},
          });

          var controlAnimalThreatLevelSelector= new L.Control.SelectAnimalThreatLevel();

          function mostrarAnimalThreatLevelSelector(arg){
              if(arg===true){
                  controlAnimalThreatLevelSelector.addTo(omap);
              }
              if(arg===false){
                  omap.removeControl(controlAnimalThreatLevelSelector);  
                  nivelDeAmenaza="CR";  
              }
          }
        
          window.modificarNivelDeAmenaza=(nivel)=>{
              nivelDeAmenaza=nivel;
              mostrarAnimalClassControl(false);
              fetchDataByCountry (paisSeleccionado);
          }

          window.clicSobreImagen = (numero) => {
            omap.closePopup();
            setIdAnimal2(numero);
            const section = document.getElementById('speciesInfo');
            if (section) {
              section.scrollIntoView({block: "start", inline: "nearest", behavior: 'smooth' });
            } else {
              setTimeout(() => {
                  const section = document.getElementById('speciesInfo');
                  console.log("zzz");
                  console.log(section);
                  if (section) {
                      section.scrollIntoView({block: "start", inline: "nearest", behavior: 'smooth' });
                  }
              }, 2000)
            }
          };

        }
    }, [omap]);
    
    return null;
  };

  

    
 

const Mapa =({changeId})=>{

    const [idAnimal, setIdAnimal]=useState('');

    useEffect(() => {
      changeId(idAnimal);
    }, [idAnimal]);

    return (
      <>
        <select name="select-region" id="select-region-id"></select>
        <select name="select-pais" id="select-pais-id"></select>
        <div className="principal">
          <div className="contenedor">
            <div className="location-container">
              <MapContainer id="mapa" className={'mapa'} center={[12,0]} zoom={2.25} minZoom= {2.25} zoomSnap= {0.25} maxBounds= {Bounds} maxBoundsViscosity= {1.0} zoomControl={false}>
                <RefMap changeIdAnimal={setIdAnimal}/>
                <TileLayer
                  attribution='Mapa de prueba de la <a href="https://www.iucnredlist.org/" target="_blank">Lista Roja de Especies Amenazadas de la IUCN</a> hecho por Andres y Guillermo'
                  url="http://tile.stamen.com/terrain-background/{z}/{x}/{y}.jpg" noWrap={true}
                />
              </MapContainer>
            </div>
          </div>
        </div>
     
      </>

     );
}

export default Mapa;