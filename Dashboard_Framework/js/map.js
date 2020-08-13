"use strict";

let map;

console.log("I'm working")
    
      function initMap() {
        // var data = [
        //     [-0.3, 36.066667, "Nakuru", "Jane", "Tailoring	","Nakuru", "Kenya", "$225", "Jane is a married woman. She has two children..."],
        //     [20.47, 84.23, "Phulbani", "Arati", "Personal Housing","Phulbani","India", "$250", "Arati is a 29-year-old woman from a village in..."],
        //     [-6.65, 106.21667, "Lebak", "Tini", "Personal Housing","Lebak","Indonesia", "$525", "Good day, lenders! Meet one of KSPPS BMI’s cli..."],
        //     [43.075556, -70.760556, "Portsmouth", "Jessica", "Health","Portsmouth","United States","$10.000", "Over twenty years ago something happened that..."],
        //     [-20, -64.416667, "Chuquisaca", "Claudia", "Higher education costs","Chuquisaca","Bolivia","$750", "Claudia has always dreamed of becoming a profe..."],
        //     [47.498889, 34.655833, "Energodar", "Anna", "Farm Supplies","Energodar","Ukraine", "$2.525", "Anna is married with a 7-year-old daughter. Sh...	"]
        // ]
        
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 3,
            center: {lat:41.0082, lng:28.9784}
        })
    }