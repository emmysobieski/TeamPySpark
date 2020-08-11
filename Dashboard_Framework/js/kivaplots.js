


function init() {
    var selector = d3.select("#selDataset");
    d3.json("formatted_dropdown_dashboard.json").then((data) => {
      console.log(data);
      var array = Object.keys(data.COUNTRY_NAME);
      array.forEach(function(sample) { console.log(sample); 
        selector
          .append("option")
          .text(data.COUNTRY_NAME[sample])
          .property("value", sample);
      });
  });
}
  
  init();

  function optionChanged(newSample) {
    console.log(newSample);
    buildMetadata(newSample);
    //buildCharts(newSample);
    buildCharts2();
  }

  function pageLoad() {
    d3.json("formatted_dropdown_dashboard.json").then((data) => {
    d3.select(window).on("load", data.sample);
    buildMetadata(0);
    //buildCharts("Afghanistan");
    buildCharts2();
  });
}
window.onload = pageLoad();

  function buildMetadata(sample) {
    d3.json("formatted_dropdown_dashboard.json").then((data) => {
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(["Total Loans: " + data.total_loan_amount[sample]]);
      PANEL.append("h6").text(["Minimum Individual Loan: " + data.min_loan[sample]]);
      PANEL.append("h6").text(["Maximum Individual Loan: " + data.max_loan[sample]]);
      PANEL.append("h6").text(["Country Population(2017): " + data.population_in_thousands_2017[sample]]);
      PANEL.append("h6").text(["Gender Ratio (1m:100f): " + data.sex_ratio_m_per_100_f_2017[sample]]);
      PANEL.append("h6").text(["GDP in US$: " + data.gross_domestic_product_million_current_us$[sample]]);
      PANEL.append("h6").text(["Unemployment: " + data.unemployment_percent_of_labour_force[sample]]);
      PANEL.append("h6").text(["Fertility Rate: " + data.fertility_rate_total_live_births_per_woman[sample]]);
    });
  }
    // creating a bubble chart
    function buildCharts2() {
        d3.json("bubble_data_final.json").then((data) => {
                console.log(data);
    
            var total_loan_number = data.total_loans_per_country;
            var time_to_fund = data.avg_funding_time;
            var population = data.population_in_thousands_2017
            var country = data.COUNTRY_NAME

            console.log(total_loan_number);
            console.log(time_to_fund);     

            var trace1 = {
                x: total_loan_number,
                y: time_to_fund,
                z: population,
                text: country,
                mode: "markers",
                    marker: {
                        color: time_to_fund,
                        size: time_to_fund,
                        colorScale: "Electric",
                        type: "heatmap"
                    }};

            var data2 = [trace1];
            
            var layout = {
                title: 'Kiva Loan Time vs. Number of Loans by Country',
                xaxis: {title: "Number of Loans Total for Country"},
                yaxis: {title: "Number of Days until Funding Success!"},
                //showlegend: true,
                height: 600,
                width: 600
            };

            Plotly.newPlot("bubble", data2, layout);
        });
    };

