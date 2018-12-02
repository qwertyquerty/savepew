const APIKEY = "AIzaSyDQvj6bpvo8C3k3rtzy0NMn3_fPGZfOZOE"
const TSERIESID = "UCq-Fj5jknLsUf-MWSy4_brA"
const PEWDIEPIEID = "UC-lHJZR3Gqxm24_Vd_AJ5Yw"

var pewdiepie_subs = 0;
var tseries_subs = 0;
var difference_subs = 0;
var data = [];


var pewdiepie_chart_canvas = document.getElementById('pewdiepie_chart');
var pewdiepie_chart_config = {type:"line",data: {labels: [],datasets: [{fill: false,label: "PewDiePie",borderColor: "rgba(0,0,220,0.8)",data: []}]},options:{scales:{xAxes: [{display: false}]},responsive:true,maintainAspectRatio: false,}}
var pewdiepie_chart = new Chart(pewdiepie_chart_canvas.getContext('2d'),pewdiepie_chart_config)

var tseries_chart_canvas = document.getElementById('tseries_chart');
var tseries_chart_config = {type:"line",data: {labels: [],datasets: [{fill: false,label: "T-Series",borderColor: "rgba(220,0,0,0.8)",data: []}]},options:{scales:{xAxes: [{display: false}]},responsive:true,maintainAspectRatio: false,}}
var tseries_chart = new Chart(tseries_chart_canvas.getContext('2d'),tseries_chart_config)

var difference_chart_canvas = document.getElementById('difference_chart');
var difference_chart_config = {type:"line",data: {labels: [],datasets: [{fill: false,label: "Difference",borderColor: "rgba(0,0,0,0.8)",data: []}]},options:{scales:{xAxes: [{display: false}]},responsive:true,maintainAspectRatio: false,}}
var difference_chart = new Chart(difference_chart_canvas.getContext('2d'),difference_chart_config)



setInterval(function(){
  $.getJSON(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${PEWDIEPIEID}=&key=${APIKEY}`, function(data) {
    pewdiepie_subs = parseInt(data.items[0].statistics.subscriberCount)
    
    $("#pewdiepie_subs").html(pewdiepie_subs)

    pewdiepie_chart_config.data.labels.push(new Date().format('m-d-Y h:i:s'));
    pewdiepie_chart_config.data.datasets[0].data.push(pewdiepie_subs);
    pewdiepie_chart.update();
  });

  $.getJSON(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${TSERIESID}&key=${APIKEY}`, function(data) {
    tseries_subs = parseInt(data.items[0].statistics.subscriberCount)

    $("#tseries_subs").html(tseries_subs)

    tseries_chart_config.data.labels.push(new Date().format('m-d-Y h:i:s'));
    tseries_chart_config.data.datasets[0].data.push(tseries_subs);
    tseries_chart.update();
  });


  $("#difference_subs").html(difference_subs)

  difference_subs = pewdiepie_subs - tseries_subs

  if (pewdiepie_subs) {
    difference_chart_config.data.labels.push(new Date().format('m-d-Y h:i:s'));
    difference_chart_config.data.datasets[0].data.push(difference_subs);
    difference_chart.update();
  }

},2000)
