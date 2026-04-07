$(document).ready(async function () {
    var min = 200;
    var max = 500;
    
    const url = "https://cdn.isbo.cc/website/gallery/";

    let groups = await fetchGroups(url);

    for (let i in groups) {
        let group = groups[i];

        var newGroup = "";

        newGroup += "<li class='photogallery'><ul>";
        newGroup += "<div class='group'><h1>";
        newGroup += group;
        newGroup += "</h1></div>";

        let newUrl = url+group;
        let images = await fetchImages(newUrl);

        for (let i in images) {
            let image = images[i];

            let newImage = "";

            newImage += "<li><a href='";
            newImage += url+group+"/"+image;
            newImage += "' data-lightbox='";
            newImage += group;
            newImage += "'><img class='lazyload' data-src='";
            newImage += url+group+"/thumbnails/"+image;
            newImage += "' loading='lazy' width='"
            newImage += Math.floor(Math.random() * (max - min + 1)) + min;
            newImage += "'/></a></li>";

            newGroup += newImage;
        }

        newGroup += "</ul></li>";

        $('#gallery').append(newGroup);

        lazyLoading();
    }
});

async function fetchGroups(url) {
    return fetch(url).then(response => {return response.text()}).then(function (data) {
        let response = data.match(/href=\".*(?<!\.)\/\">/gm);
        var groups = [];

        for (let i in response) {
            var group = response[i].replace(/href=\"/, "")
            group = group.replace(/\/\">/, "");
            
            groups.push(group);
        }

        return groups;
    });
}

async function fetchImages(url) {
    return fetch(url).then(response => {return response.text()}).then(function (data) {
        let response = data.match(/href=\".*(?<!\/)\">/gm);
        var images = [];

        for (let i in response) {
            let image = response[i].replace(/href=\"/, "");
            image = image.replace(/\">/, "");

            images.push(image);
        }

        return images;
    })
}

document.addEventListener('DOMContentLoaded', function() {
    lazyLoading();

    // object-fit and object-position polyfill
    objectFitImages();
});

function lazyLoading() {
    // Lazy loading fallback
    if ('loading' in HTMLImageElement.prototype) {

        var images = document.querySelectorAll('img[loading="lazy"]');

        for (var i = 0; i < images.length; i++) {
            images[i].src = images[i].dataset.src;
            images[i].onload = function(e) {
                e.target.classList.add('loaded');
            }
        }

    } else {
        // Dynamically import the LazySizes library
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';

        document.body.appendChild(script);
    }
}