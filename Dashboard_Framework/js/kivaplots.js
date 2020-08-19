

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
  buildCharts2();
  buildBar();
  buildPie();
  buildBurst();
}

function pageLoad() {
  d3.json("formatted_dropdown_dashboard.json").then((data) => {
  d3.select(window).on("load", data.sample);
  buildMetadata(0);
  buildCharts2();
  buildBar();
  buildPie();
  buildBurst();
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
          var population = data.population_in_thousands_2017;
          var country = data.COUNTRY_NAME;

          console.log(total_loan_number);
          console.log(time_to_fund);     

          var trace1 = {
              x: time_to_fund,
              y: total_loan_number,
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
              xaxis: {title: "Average Number of Days until Funding Success"},
              yaxis: {title: "Total Loans for Country (in USD)"},
              //showlegend: true,
              height: 550,
              width: 870
          };

          Plotly.newPlot("bubble", data2, layout);
      });
  };

  function buildBar() {
        var data3 = [
        {
        type: 'bar',
        x: ['Philippines', 'Kenya', 'Peru', 'Cambodia', 'El Salvador', 'Uganda', 'Tajikistan', 'Pakistan', 'Ecuador', 'Nicaragua'], 
        y: [391168, 202372, 97552, 95994, 74859, 66493, 58507, 55033, 49242],
        marker: {
          color: 'rgb(142,124,195)'
        }
        }
      ];
      var layout3 = {
        title: 'Top 10 Countries<br /> by Total Funding',
        height: 400,
        width: 400,
        //margin: {"t": 0, "b": 0, "l": 0, "r": 0},
      };

      Plotly.newPlot('bar', data3, layout3)
    };
  


  function buildPie() {
      var data4 = [{
        values: [1249772, 407567, 93446, 46079, 9969, 1965, 1003, 343],
        labels: ['English', 'Spanish', 'French', 'Russian', 'Portuguese', 'Vietnamese', 'Indonesian', 'Arabic'],
        type: 'pie',
        marker: {
          colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "white"]
      }}];
      
      var layout4 = {
        title: 'Most Common Borrower Languages',
        height: 400,
        width: 400
        //margin: {"t": 0, "b": 0, "l": 0, "r": 0},
      };
      
      Plotly.newPlot('pie', data4, layout4);
    };

    function buildBurst() {
    
      var data5 = [{
        type: "sunburst",
        labels: ["Farming", "General Store", "Personal Housing Expenses", "Retail", "Food Production/Sales", "Clothing Sales", "Agriculture", "Pigs", "Grocery Store"],
        parents: ["", "Farming", "Farming", "Personal Housing Expenses", "Personal Housing Expenses", "Farming", "Farming", "Agriculture", "Farming" ],
        values:  [192961, 157244, 92166, 84627, 83775, 72002, 69665, 63550, 52900],
        outsidetextfont: {size: 20, color: "#377eb8"},
        leaf: {opacity: 0.4},
        marker: {line: {width: 2}},
      }];
      
      var layout5 = {
        title: 'Most Funded Activities Globally',
        margin: {l: 0, r: 0, b: 0, t: 50},
        width: 400,
        height: 400,
        sunburstcolorway:["#636efa","#ef553b","#00cc96"]
      };
      
      
      Plotly.newPlot('sunburst', data5, layout5);
    };
