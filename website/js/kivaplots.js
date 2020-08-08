function init() {
    var selector = d3.select("#selDataset");
    d3.json("dashboard_data.json").then((data) => {
      console.log(data);
      var sampleNames = data.COUNTRY_NAME;
      [sampleNames].forEach(function(sample) { console.log(sample); 
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  });
}
  
init();


  function optionChanged(newSample) {
    console.log(newSample);
    buildMetadata(newSample);
    //buildCharts(newSample);
    //buildCharts2(newSample);
  }

  function pageLoad(item) {
    //get_country = result.COUNTRY_NAME[0]

    d3.json("dashboard_data.json").then((data) => {
    d3.select(window).on("load", data.COUNTRY_NAME);
    buildMetadata("Afghanistan");
    //buildCharts("Afghanistan");
    //buildCharts2("Afghanistan");
  });
}
window.onload = pageLoad();


  function buildMetadata(sample) {
    d3.json("dashboard_data.json").then((data) => {

      //var metadata = data.metadata;
      //var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      //var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(["Total Loans: " + data.total_loan[0]]);
      PANEL.append("h6").text(["Minimum Individual Loan: " + data.min_loan[0]]);
      PANEL.append("h6").text(["Maximum Individual Loan: " + data.max_loan[0]]);
      PANEL.append("h6").text(["Country Population(2017): " + data.population_in_thousands_2017[0]]);
      PANEL.append("h6").text(["Gender Ratio (1m:100f): " + data.sex_ratio_m_per_100_f_2017[0]]);
      PANEL.append("h6").text(["GDP in US$: " + data.gross_domestic_product_million_current_us$[0]]);
      PANEL.append("h6").text(["Unemployment: " + data.unemployment_percent_of_labour_force[0]]);
      PANEL.append("h6").text(["Fertility Rate: " + data.fertility_rate_total_live_births_per_woman[0]]);
    });
  }


//function for accessing data and making charts
    function buildCharts(sample) {
        d3.json("dashboard_data.json").then((data) => {
        console.log("hello");
        var metadata = data.metadata;
        var samples = data.samples;
        var resultsArray = samples.filter(sample_object => sample_object.COUNTRY_NAME == sample);
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
        d3.json("dashboard_data.json").then((data) => {
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

