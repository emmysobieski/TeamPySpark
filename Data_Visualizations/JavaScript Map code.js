"use strict";

// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
function initMap() {
  const data = [
    [-0.3, 36.066667, "Nakuru", "Jane", "Tailoring	", "Nakuru", "Kenya", "$225", "Jane is a married woman. She has two children..."],
    [20.47, 84.23, "Phulbani", "Arati", "Personal Housing", "Phulbani", "India", "$250", "Arati is a 29-year-old woman from a village in..."],
    [-6.65, 106.21667, "Lebak", "Tini", "Personal Housing", "Lebak", "Indonesia", "$525", "Good day, lenders! Meet one of KSPPS BMI’s cli..."],
    [43.075556, -70.760556, "Portsmouth", "Jessica", "Health", "Portsmouth", "United States", "$10.000", "Over twenty years ago something happened that..."],
    [-20, -64.416667, "Chuquisaca", "Claudia", "Higher education costs", "Chuquisaca", "Bolivia", "$750", "Claudia has always dreamed of becoming a profe..."],
    [47.498889, 34.655833, "Energodar", "Anna", "Farm Supplies", "Energodar", "Ukraine", "$2.525", "Anna is married with a 7-year-old daughter. Sh...	"]
  ]
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {
      lat: 41.0082,
      lng: 28.9784
    }
  });

  data.forEach(([x, y, location, loan_name, activity_name, town_name, country_name, loan_amount, loan_description]) => {
    const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Loan Informations</h1>' +
      '<div id="bodyContent">' +
      "<p>LOAN NAME: " + loan_name + "</p>" +
      "<p>ACTIVITY NAME: " + activity_name + "</p>" +
      "<p>TOWN NAME: " + town_name + "</p>" +
      "<p>COUNTRY NAME: " + country_name + "</p>" +
      "<p>LOAN AMOUNT: " + loan_amount + "</p>" +
      "<p>DESCRIPTION: " + loan_description + "</p>" +


      "</div>" +
      "</div>";
    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    const marker = new google.maps.Marker({
      position: {
        lat: x,
        lng: y
      },
      map,
      title: location
    });
    infowindow.open(map, marker);
  })
}