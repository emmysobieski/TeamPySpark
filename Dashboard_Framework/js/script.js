d3.selectAll("body").on("change", updatePage);

//var country = COUNTRY_NAME[0]
var country = COUNTRY_NAME.keys(COUNTRY_NAME)

function updatePage() {
  var dropdownMenu = d3.selectAll("#selectOption").node();
  var dropdownMenuID = dropdownMenu.country;
  var selectedOption = dropdownMenu.value;

  console.log(dropdownMenuID);
  console.log(selectedOption);
};