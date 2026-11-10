function searchUsingXHR() {
    var access = "QkJKeewY0vHS-1Saj0clrRo31AgGxDCpU8tQoOEUu2c"
    var search = document.getElementById("inputBox").value;
    var sampElem = document.getElementById("sampleOutput");
    var titleElem = document.getElementById("title");


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4&& this.status == 200) {
            sampElem.innerHTML ="";
            var responseObj = JSON.parse(xhr.responseText);
            titleElem.innerText = search;


            responseObj.results.forEach(function(photo){
            var image = document.createElement("img");
            image.src = photo.urls.small;
            sampElem.appendChild(image);
        });
        }
    };
    xhr.open("GET", "https://api.unsplash.com/search/photos?query=" + search, true);
    xhr.setRequestHeader("Authorization", "Client-ID " + access);
    xhr.send();
}

function searchUsingFetch() {
    var search = document.getElementById("inputBox").value;
    var access = "QkJKeewY0vHS-1Saj0clrRo31AgGxDCpU8tQoOEUu2c"
    var sampElem = document.getElementById("sampleOutput");
    var titleElem = document.getElementById("title");

    fetch("https://api.unsplash.com/search/photos?query=" + search +"&client_id=" +access)
        .then(response => {
            return response.json()
        })
        .then(data => {
            sampElem.innerHTML="";
            titleElem.innerText =search;
            data.results.forEach(function(photo){
                var image =document.createElement("img");
                image.src= photo.urls.small;
                sampElem.appendChild(image);
            });
        })
}

async function searchUsingFetchAwaitAsync() {
    var search =document.getElementById("inputBox").value;
    var access="QkJKeewY0vHS-1Saj0clrRo31AgGxDCpU8tQoOEUu2c"
    var sampElem =document.getElementById("sampleOutput");
    var titleElem =document.getElementById("title");


    let response = await fetch("https://api.unsplash.com/search/photos?query=" + search+
         "&client_id=" +access);
    let data = await response.json();
    sampElem.innerHTML = "";
    titleElem.innerText = search;
    data.results.forEach(function(photo){
        var image =document.createElement("img");
        image.src =photo.urls.small;
        sampElem.appendChild(image);
    });
}