// from data.js
var tableData = data;

// load data to website
var table_body = d3.select("#ufo_table");

function populate(target_table,data_arr){
    data_arr.forEach((witness) => {
        var row = target_table.append("tr");
        Object.entries(witness).forEach(([key, value]) => {
          row.append("td").text(value);
        });
      });
}
populate(table_body,tableData);

//read date value in the form
var input_form = d3.select("#startDate");
var input_val = input_form.attr("value");

input_form.on("change", function() {
    input_val = d3.event.target.value;
  });

//filter event
var filter_button = d3.select("#filter_button");

function handleClick (){
    //remove current data
    table_body.selectAll("*").remove();
    //convert to right format m-d-yyyy
    var date_filter = input_val.split("-");
    var year = date_filter[0];
    var month = date_filter[1];
    var day = date_filter[2];
    var x = parseInt(month);
    month = ""+x;
    x=parseInt(day);
    day = ""+x;
    new_format_date = month+"/" + day+"/"+year;
    console.log(new_format_date);
    //filter dataset
    function filter_mask(sighting) {
        return sighting.datetime === new_format_date;
    };
    var filtered_data = tableData.filter(filter_mask);
    //populate filtered data
    populate(table_body,filtered_data);
};

filter_button.on("click",handleClick);

//clear filter button

var clear_filter = d3.select("#clear_filter");
function clearFilter (){
    //remove current data
    table_body.selectAll("*").remove();
    //populate original data
    populate(table_body,tableData);
};
clear_filter.on("click",clearFilter);