function init() {

    var selector = d3.select("#selDataset");
  
    d3.json("country_values.json").then((data) => {

        var country = data.country;

        country.forEach((sample) => {
            
            selector
            
            .append("option")
            
            .text(sample)
            
            .property("value", sample);

        });

init();

        // Use first sample id to build the plots when page is opened
    // var firstID = sampleNames[0];
    // buildMetadata(firstID);
    // buildCharts(firstID);
    // })

    function optionChanged(newSample) {

        buildLoan(newSample);

        buildCharts(newSample);
    }

        
});


function buildLoan(sample) {

    d3.json("country_values.json").then((data) => {
       
        var max_loan = data.max_loan;

        var resultArray2 = max_loan.filter(sampleObj => sampleObj.id == sample);

        console.log(max_loan);


        var result = resultArray2[0];

        var PANEL = d3.select("#sample-max_loan");

        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {

            PANEL.append("h6").text(key + ': ' + value);

        });
    });
}

// function buildCharts(sample) {

// d3.json("samples.json").then((data) => {

//     var samples = data.samples;

//     var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

//     var result = resultArray[0]

//     console.log(result);

//     var otu_labels = result.otu_labels;

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


 }