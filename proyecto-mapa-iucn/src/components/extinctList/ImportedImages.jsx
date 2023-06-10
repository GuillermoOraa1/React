import imageAve1 from '../../assets/images/extincts/aves/ave1.jpg';
import imageAve2 from '../../assets/images/extincts/aves/ave2.jpg';
import imageAve3 from '../../assets/images/extincts/aves/ave3.jpg';
import imageAve4 from '../../assets/images/extincts/aves/ave4.jpg';
import imageAve5 from '../../assets/images/extincts/aves/ave5.jpg';
import imageAve6 from '../../assets/images/extincts/aves/ave6.jpg';
import imageAve7 from '../../assets/images/extincts/aves/ave7.jpg';
import imageAve8 from '../../assets/images/extincts/aves/ave8.jpg';
import imageAve9 from '../../assets/images/extincts/aves/ave9.jpg';
import imageAve10 from '../../assets/images/extincts/aves/ave10.jpg';

import imageInsect1 from '../../assets/images/extincts/insects/insect1.jpg';
import imageInsect2 from '../../assets/images/extincts/insects/insect2.PNG';
import imageInsect3 from '../../assets/images/extincts/insects/insect3.jpg';
import imageInsect4 from '../../assets/images/extincts/insects/insect4.jpg';
import imageInsect5 from '../../assets/images/extincts/insects/insect5.jpg';
import imageInsect6 from '../../assets/images/extincts/insects/insect6.jpg';
import imageInsect7 from '../../assets/images/extincts/insects/insect7.jpg';


const Ave1={name:"Thick-billed Ground-dove",year:"1927", image:imageAve1 }
const Ave2={name:"Labrador Duck",year:"1878", image:imageAve2 }
const Ave3={name:"Dodo",year:"1662", image:imageAve3 }
const Ave4={name:"Bonin Woodpigeon",year:"1889", image:imageAve4 }
const Ave5={name:"White Swamphen",year:"1834", image:imageAve5 }
const Ave6={name:"Kangaroo Island emu",year:"1827", image:imageAve6 }
const Ave7={name:"Hawaian Oahu Oo",year:"1837", image:imageAve7 }
const Ave8={name:"Cuban Macaw",year:"1885", image:imageAve8 }
const Ave9={name:"Laughing owl",year:"1910", image:imageAve9 }
const Ave10={name:"Canarian Oystercatcher",year:"1940", image:imageAve10 }
const AveCollection=[Ave1,Ave2,Ave3,Ave4,Ave5,Ave6,Ave7,Ave8,Ave9,Ave10]

const Insect1={name:"Adelocosa anops",year:"1956", image:imageInsect1 }
const Insect2={name:"Glaucopsyche xerces",year:"1941", image:imageInsect2 }
const Insect3={name:"Pachnodus velutinus",year:"2000", image:imageInsect3 }
const Insect4={name:"Lake Pedder Earthworm",year:"1972", image:imageInsect4 }
const Insect5={name:"Levuana moth",year:"1925", image:imageInsect5 }
const Insect6={name:"Rocky Mountain Locust",year:"1902", image:imageInsect6 }
const Insect7={name:"Volutine Stoneyian Tabanid Fly",year:"1892", image:imageInsect7 }
const InsectsCollection=[Insect1,Insect2,Insect3,Insect4,Insect5,Insect6,Insect7]

export{AveCollection,InsectsCollection}

/*
anfibios 10
	https://www.iucnredlist.org/species/9023/3149101 Floreana Giant Tortoise, 1850, amphibians1
	https://www.iucnredlist.org/species/55201/54344718  Splendid Poison Frog, 2017, amphibians2
	https://www.iucnredlist.org/species/3172/54357699   Golden Toad, 2004, amphibians3
	https://www.iucnredlist.org/species/6065/12391587   Cylindraspis vosmaeri, 1820, amphibians4
	https://www.iucnredlist.org/species/12149/78434814  Mountain Mist Frog, 1990 amphibians5
	https://www.iucnredlist.org/species/21529/78447380  Sharp Snouted Day Frog, 1994 amphibian6
	https://www.iucnredlist.org/species/56782/54369332  Craugastor myllomyllon, 2000 amphibian7
	https://www.iucnredlist.org/species/19475/78430533  Southern Gastric Brooding Frog, 2002 amphibian8
	https://www.iucnredlist.org/species/54549/54358350  Pass Stubfoot Toad, 1986 amphibian9
	https://www.iucnredlist.org/species/59376/54381158  Jalpa False Brook Salamander, 2019, amphibian10

mamiferos 10
	https://www.iucnredlist.org/species/4288/79818502   Schomburgk's Deer, 1938 mammal1
	https://www.iucnredlist.org/species/13655/45228171  Caribbean Monk Seal, 1952 mammal2
	https://www.iucnredlist.org/species/17365/22123157  Bonin Pipistrelle, 2018, mammal3

	https://www.iucnredlist.org/species/41667/113089431 Japanese Sea Lion, 1974 mammal4
	https://www.iucnredlist.org/species/5223/22450334   White-footed Rabbit-rat, 1845 mammals5
	https://www.iucnredlist.org/species/21866/21949291  Thylacine,1936 mammals6
	https://www.iucnredlist.org/species/10168/50188573  Bluebuck, 1800 mammals7
	https://www.iucnredlist.org/species/6923/82310440   Falklands Wolf, 1876 mammals8
	https://www.iucnredlist.org/species/41320/22177809  Cryptonanus ignitus, 1962, mammal9


reptiles 10
	https://www.iucnredlist.org/species/178595/101749951  Christmas Island Whiptail-skink, 2014 reptile1
	https://www.iucnredlist.org/species/173001/6955940    Navassa Rhinoceros Iguana, 1960, reptile2
	https://www.iucnredlist.org/species/2864/13483086     Round Island Burrowing Boa, 1975, reptile3
	https://www.iucnredlist.org/species/9017/217759270    Pinta Giant Tortoise, 2012 reptile4
	https://www.iucnredlist.org/species/11410/166839636   Leiolopisma mauritiana, 1600 reptile5
	https://www.iucnredlist.org/species/17432631/17432636 Rodrigues Day Gecko, 1917, reptile6
	https://www.iucnredlist.org/species/44979051/197419111 Günther's Dwarf Burrowing Skink,1986 reptile7
	https://www.iucnredlist.org/species/16527/97386102    Seychelles Mud Turtle,1959, reptile8
	https://www.iucnredlist.org/species/21286/217760413   Tonga Ground Skink, 1996 reptile9
	https://www.iucnredlist.org/species/13152363/217783334 Cape Verde Giant Skink, 2013,reptile10

peces	8
	https://www.iucnredlist.org/species/4530/3000349     Parras Characodon,1900, fish1
	https://www.iucnredlist.org/species/14891/130025081  Phantom Shiner,1996, fish2
	https://www.iucnredlist.org/species/6176/3107502     Charco Azul Pupfish,1993 fish3
	https://www.iucnredlist.org/species/8432/3145753     Mexican Dace, 1983, fish4
	https://www.iucnredlist.org/species/18428/146104283  Chinese Paddlefish, 2005, fish5
	https://www.iucnredlist.org/species/5371/11124753    Coregonus nigripinnis, 1923 fish6
	https://www.iucnredlist.org/species/60765/137272327  Giant Atlas Barbel, 2001, fish7
	https://www.iucnredlist.org/species/61372/19010617   Long Jaw Tristramella, 1990, fish8
	https://www.iucnredlist.org/species/19873/9089084    Silver Trout,1979 fish9
	


*/








