function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  });
}
  
  init();
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
    buildCharts2(newSample);
  }

  function pageLoad(item) {
    //get_940 = result.id[940]
    d3.json("samples.json").then((data) => {
    //d3.select(window).on("load", get_940);
    buildMetadata(940);
    buildCharts(940);
    buildCharts2(940);
  });
}
window.onload = pageLoad();


  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {

      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(["ID: " + result.id]);
      PANEL.append("h6").text(["ETHNICITY: " + result.ethnicity]);
      PANEL.append("h6").text(["GENDER: " + result.gender]);
      PANEL.append("h6").text(["AGE: " + result.age]);
      PANEL.append("h6").text(["LOCATION: " + result.location]);
      PANEL.append("h6").text(["BBTYPE: " + result.bbtype]);
      PANEL.append("h6").text(["WFREQ: " + result.wfreq]);
    });
  }


//function for accessing data and making charts
    function buildCharts(sample) {
        d3.json("samples.json").then((data) => {
        console.log("hello");
        var metadata = data.metadata;
        var samples = data.samples;
        var resultsArray = samples.filter(sample_object => sample_object.id == sample);
        var result = resultsArray[0];
        console.log(result);

        var sample_values = result.sample_values;
        var num_bacteria = result.sample_values;
        var bacteria_id = result.otu_ids;   
        var bacteria_names = result.otu_labels;  
        console.log(num_bacteria);
        console.log(bacteria_id);
        
        //build a bar chart
        var y_data = bacteria_id.slice(0,10).map(name => "OTU "+name.toString()).reverse();
        var x_data = num_bacteria.slice(0,10);
        console.log(x_data)
        console.log(y_data)

        var chartData = [
        {x: x_data,
         y: y_data,
         type: "bar",
         orientation: "h"
        }];
    
        var chartLayout = {
            title: "Most Frequently Occuring Bacteria<br /> by ID Number",
            xaxis: {title: "Number of Individual Bacteria in Sample"},
            yaxis: {title: "Bacteria ID"}
        };
        
        Plotly.newPlot("bar", chartData, chartLayout);
        
    });
}
    // creating a bubble chart
    function buildCharts2(sample) {
        d3.json("samples.json").then((data) => {
                console.log("hello");
            //var metadata = data.metadata;
            var samples = data.samples;
            var resultsArray = samples.filter(sample_object => sample_object.id == sample);
            var result = resultsArray[0];
            console.log(result);
    
            var sample_values = result.sample_values;
            var num_bacteria2 = result.sample_values;
            var bacteria_id2 = result.otu_ids;   
            var bacteria_names2 = result.otu_labels;  
            console.log(num_bacteria2);
            console.log(bacteria_id2);
            console.log(bacteria_names2);
                
            //build a bar chart
            //var bubble_y_data = num_bacteria2;
            //var bubble_x_data = bacteria_id2;
            //console.log(bubble_x_data)
            //console.log(bubble_y_data)


            var trace1 = {
                x: bacteria_id2,
                y: num_bacteria2,
                text: bacteria_names2,
                mode: "markers",
                    marker: {
                        color: bacteria_id2,
                        size: num_bacteria2,
                        colorScale: "Electric",
                        type: "heatmap"
                    }};

            var data2 = [trace1];
            
            var layout = {
                title: 'Belly Button Bacteria Counts',
                xaxis: {title: "Specie Identification Number of Bacteria"},
                yaxis: {title: "Number of Individual Bacteria in Sample"},
                //showlegend: true,
                //height: 600,
                //width: 600
            };

            Plotly.newPlot("bubble", data2, layout);
        });
    };

