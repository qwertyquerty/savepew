const APIKEY = "AIzaSyDQvj6bpvo8C3k3rtzy0NMn3_fPGZfOZOE "
const TSERIESID = "UCq-Fj5jknLsUf-MWSy4_brA"
const REWINDVIDEO = "YbJOTdZBX1g"

var likes = 0;
var dislikes = 0;
var difference_likes = 0;



var likes_chart_canvas = document.getElementById('likes_chart');
var likes_chart_config = {type:"line",data: {labels: [],datasets: [{fill: false,label: "Likes",borderColor: "rgba(0,0,220,0.8)",data: []}]},options:{scales:{xAxes: [{display: false}]},responsive:true,maintainAspectRatio: false, elements: { point: { radius: 0 } } }}
var likes_chart = new Chart(likes_chart_canvas.getContext('2d'),likes_chart_config)

var dislikes_chart_canvas = document.getElementById('dislikes_chart');
var dislikes_chart_config = {type:"line",data: {labels: [],datasets: [{fill: false,label: "Dislikes",borderColor: "rgba(220,0,0,0.8)",data: []}]},options:{scales:{xAxes: [{display: false}]},responsive:true,maintainAspectRatio: false, elements: { point: { radius: 0 } } }}
var dislikes_chart = new Chart(dislikes_chart_canvas.getContext('2d'),dislikes_chart_config)

var difference_chart_canvas = document.getElementById('difference_chart');
var difference_chart_config = {type:"line",data: {labels: [],datasets: [{fill: false,label: "Difference",borderColor: "rgba(0,0,0,0.8)",data: []}]},options:{scales:{xAxes: [{display: false}]},responsive:true,maintainAspectRatio: false, elements: { point: { radius: 0 } } }}
var difference_chart = new Chart(difference_chart_canvas.getContext('2d'),difference_chart_config)

function update() {
  $.getJSON(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${REWINDVIDEO}&key=${APIKEY}`, function(data) {
    likes = parseInt(data.items[0].statistics.likeCount)

    $("#likes").html(likes)

    likes_chart_config.data.labels.push(new Date().format('m-d-Y h:i:s'));
    likes_chart_config.data.datasets[0].data.push(likes);
    likes_chart.update();

    dislikes = parseInt(data.items[0].statistics.dislikeCount)

    $("#dislikes").html(dislikes)

    dislikes_chart_config.data.labels.push(new Date().format('m-d-Y h:i:s'));
    dislikes_chart_config.data.datasets[0].data.push(dislikes);
    dislikes_chart.update();
  });



  $("#difference_likes").html(difference_likes)

  difference_likes = likes - dislikes

  if (difference_likes) {
    difference_chart_config.data.labels.push(new Date().format('m-d-Y h:i:s'));
    difference_chart_config.data.datasets[0].data.push(difference_likes);
    difference_chart.update();
    document.title = difference_likes+" difference!"
  }
}
update()
setInterval(update,3000)
