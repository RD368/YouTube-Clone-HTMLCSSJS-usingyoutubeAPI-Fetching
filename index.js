const videoContainer = document.querySelector(".video-container");
let api_key = "AIzaSyAUCXOT4OBf1zKvaKoXgSgSWopkyzu6Qjc"; //later we get this from youtube link and GCP cloud
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
})).then(res => res.json())
.then(data =>{
    data.items.forEach(item => {
        getChannelIcon(item);
    });
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) =>{
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    })).then(res => res.json())
    .then(data =>{
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideocard(video_data);
    })
}
const makeVideocard = (data) =>{
    videoContainer.innerHTML += `
    <div class="video" onclick= "location.href = 'https://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
    <img src="${data.channelThumbnail}" class="channel-icon" alt="">
    <div class="info">
    <h4 class="title"> ${data.snippet.title} </h4>
    <p class="channel-name"> ${data.snippet.channelTitle} </p>
    </div>
    </div>
    </div>
    `
}
// search logic
const searchInut = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click",()=>{
    if(searchInut.value.length){
        location.href = searchLink + searchInut.value;
    }
});

// logic for on pressing "enter" key youtube searches:
/* searchInut.addEventListener("keyup",()=>{
    if(searchInut.value.length){
        location.href = searchLink + searchInut.value;
    }
}); */