function init() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
    Plotly.newPlot("bubble", data);
};
//init();
d3.selectAll("#dropdownMenu").on("change", updatePlotly);

function updatePlotly() {
    var dropdownMenu = d3.select("#dropdownMenu");
    var dataset = dropdownMenu.property("value");
    var xData = [1, 2, 3, 4, 5];
    var yData = [];
    if (dataset === 'dataset1') {
      yData = [1, 2, 4, 8, 16];
    };
    if (dataset === 'dataset2') {
      yData = [1, 10, 100, 1000, 10000];
    };
    var trace = {
      x: [xData],
      y: [yData],
    };
    Plotly.restyle("bubble", trace);
};
//init();
  
function init() {
    var selector = d3.select("#selDataset");
    d3.json("country_dropdown.json").then((data) => {
        var COUNTRY_NAME = data.COUNTRY_NAME;
        COUNTRY_NAME.forEach((data) => {
            selector
            .append("option")
            .text(data)
            .property("value", data);
        });
})}
//////////////////////////        
//init();

        // Use first sample id to build the plots when page is opened
    // var firstID = sampleNames[0];
    // buildMetadata(firstID);
    // buildCharts(firstID);
    // })

function optionChanged(newData) {

        buildLoan(newData);

        buildCharts(newData);
}

        


function buildLoan(data) {

    d3.json("country_dropdown.json").then((data) => {
       
        var max_loan = data.max_loan;
        var min_loan = data.min_loan;
        var COUNTRY_NAME = data.COUNTRY_NAME;
        var total_loan = data.total_loan;

        var resultArray = data.filter(sampleObj => sampleObj.id == COUNTRY_NAME);

        console.log(COUNTRY_NAME);


        var result = resultArray[0];

        var PANEL = d3.select("#sample-COUNTRY_NAME");

        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {

            PANEL.append("h6").text(key + ': ' + value);

        });
    });
}
///////////////////////////////

 //function buildCharts(sample) {

 //d3.json("country_dropdown.json").then((data) => {

     //var dropdownData = data.country_dropdown;

     //var resultArray2 = dropdownData.filter(sampleObj => sampleObj.id == sample);

     //var result2 = resultArray2[0]

     //console.log(dropdownData);

     //var otu_labels = result.otu_labels;

//     console.log(otu_labels);

//     var id_oto = result.otu_ids;
    
//     console.log(id_oto)

//     var sampleValues = result.sample_values;
            
//     var topValues = sampleValues.slice(0,10).reverse();

//     var topLabels = otu_labels.slice(0,10);

//     var otu_id = id_oto.slice(0,10).map(otusample => `OTU ${otusample}`).reverse();

//     // barChart for the data
//     var bar = {
        
//         x: topValues,
        
//         y: otu_id,
        
//         text: topLabels, 
        
//         type: "bar",
        
//         orientation: "h"
//     };

//     // Data
//     var bar2 = [bar];

//     // Apply the group bar mode to the layout
//     var layout = {
        
//         title: "Top 10 Bacterial Species",
        
//         margin: {
            
//             l: 100,
            
//             r: 100,
            
//             t: 100,
            
//             b: 100
//         }
//     };

//     // Render the plot to the div tag with id "bar"
//     Plotly.newPlot("bar", bar2, layout);
//         // Building the bubble chart
//         var bubbleChart = {
        
//         x: id_oto,
        
//         y: sampleValues,
        
//         text: otu_labels,
        
//         mode: "markers",
        
//         marker: {
            
//             size: sampleValues,
            
//             color: id_oto,
            
//             colorscale: "Jet"
//         }
//     };

//     var bubbleData =[bubbleChart];
//     // Bubble Chart Layout
//     var bubbleLayout = {
        
//         title: "Bacteria Species per Sample",
        
//         showlegend: false,
        
//         xaxis: {
            
//             title: {
                
//                 text: "UTO ID" }
//         }
//     };

//     // Render the plot to the div tag with id "bubble"
//     Plotly.plot("bubble", bubbleData, bubbleLayout);
// });

