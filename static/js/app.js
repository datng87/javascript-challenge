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

//load options to filter dropdowns
//load possible value from dataset
var cityData = [];
var stateData =[];
var countryData = [];
var shapeData= [];
tableData.forEach((d) => {
  cityData.push(d.city);
  stateData.push(d.state);
  countryData.push(d.country);
  shapeData.push(d.shape);
});
//remove duplicate values
//convert to set object (only has unique elements) then convert back to array
function uniq(a) {
  return Array.from(new Set(a));
}
var cityList = uniq(cityData);
var stateList = uniq(stateData);
var countryList = uniq(countryData);
var shapeList = uniq(shapeData);
//populate to dropdownlist
function updateList(id, data_arr){
  var dropdownlist = d3.select(id);
  var count = 0;
  data_arr.forEach((item) => {
    var newId = item + count;
    var option = dropdownlist.append("option")
      .attr("id", newId)
      .text(item);
    document.getElementById(newId).value = item; 
    count+=1;
  });
};
updateList(city,cityList);
updateList(state,stateList);
updateList(country,countryList);
updateList(shape,shapeList);

//read date value in the form
var input_form = d3.select("#startDate");
var input_val = input_form.attr("value");
var cityDropdown = d3.select("#city");
var cityDropdownVal = cityDropdown.attr("value");
var stateDropdown = d3.select("#state");
var stateDropdownVal = stateDropdown.attr("value");
var countryDropdown = d3.select("#country");
var countryDropdownVal = countryDropdown.attr("value");
var shapeDropdown = d3.select("#shape");
var shapeDropdownVal = shapeDropdown.attr("value");

//take input value
input_form.on("change", function() {
    input_val = d3.select("#startDate").property("value");
  });
cityDropdown.on("change",function(){
  cityDropdownVal = d3.select("#city").property("value");
})
stateDropdown.on("change",function(){
  stateDropdownVal = d3.select("#state").property("value");
})
countryDropdown.on("change",function(){
  countryDropdownVal = d3.select("#country").property("value");
})
shapeDropdown.on("change",function(){
  shapeDropdownVal = d3.select("#shape").property("value");
})

//filter event
var filter_button = d3.select("#filter_button");
var filtered_data = [];
function handleClick (){
    //remove current data
    table_body.selectAll("*").remove();
    filtered_data = tableData;
    //filter dataset
    function filter_mask_date(sighting) {
        return sighting.datetime === new_format_date;
    };
    function filter_mask_city(sighting) {
      return sighting.city === cityDropdownVal;
    };
    function filter_mask_state(sighting) {
      return sighting.state === stateDropdownVal;
    };
    function filter_mask_country(sighting) {
      return sighting.country === countryDropdownVal;
    };
    function filter_mask_shape(sighting) {
      return sighting.shape === shapeDropdownVal;
    };    
    //filter date first
    if ((input_val==null)||(input_val=="")){
      filtered_data = filtered_data;
    }
    else {
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
      filtered_data = tableData.filter(filter_mask_date);
    };
    //filter city
    if ((cityDropdownVal==null)||(cityDropdownVal=="")||(cityDropdownVal=="Select")){
      filtered_data = filtered_data;
    }
    else {
      filtered_data = filtered_data.filter(filter_mask_city);
    };    
    //filter state
    if ((stateDropdownVal==null)||(stateDropdownVal=="")||(stateDropdownVal=="Select")){
      filtered_data = filtered_data;
    }
    else {
      filtered_data = filtered_data.filter(filter_mask_state);
    };    
    //filter country
    if ((countryDropdownVal==null)||(countryDropdownVal=="")||(countryDropdownVal=="Select")){
      filtered_data = filtered_data;
    }
    else {
      filtered_data = filtered_data.filter(filter_mask_country);
    };    
    //filter shape
    if ((shapeDropdownVal==null)||(shapeDropdownVal=="")||(shapeDropdownVal=="Select")){
      filtered_data = filtered_data;
    }
    else {
      filtered_data = filtered_data.filter(filter_mask_shape);
    };                
    //populate filtered data
    populate(table_body,filtered_data);
};

filter_button.on("click",handleClick);

//clear filter button

var clear_filter = d3.select("#clear_filter");
function clearFilter (){
    // clear filter input form
    document.getElementById('startDate').value = null;
    input_val = d3.select("#startDate").property("value");
    document.getElementById('city').value = "Select";
    document.getElementById('state').value = "Select";
    document.getElementById('country').value = "Select";
    document.getElementById('shape').value = "Select";
    cityDropdownVal = "Select"
    stateDropdownVal = "Select"
    countryDropdownVal = "Select"
    shapeDropdownVal = "Select"
    //remove current data
    table_body.selectAll("*").remove();
    //populate original data
    populate(table_body,tableData);
};
clear_filter.on("click",clearFilter);