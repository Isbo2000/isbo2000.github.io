$(document).ready(function () {
    url = 'https://isbo.cc/assets/gallery/gallery.json';
    fetch(url).then(response => {return response.json();}).then(function (data) {
        var min = 200;
        var max = 500;

        for (var group in data) {
            var newGroup = "";

            newGroup += "<li class='photogallery'><ul>";
            newGroup += "<div class='group'><h1>";
            newGroup += data[group].group;
            newGroup += "</h1></div>";

            for (let link in data[group].images) {
                let newLink = "";

                newLink += "<li><a href='";
                newLink += data[group].images[link];
                newLink += "' data-lightbox='";
                newLink += data[group].group;
                newLink += "'><img class='lazyload' data-src='";
                newLink += data[group].images[link];
                newLink += "' loading='lazy' width='"
                newLink += Math.floor(Math.random() * (max - min + 1)) + min;
                newLink += "'/></a></li>";

                newGroup += newLink;
            }
            
            newGroup += "</ul></li>";

            $('#gallery').append(newGroup);

            lazyLoading();
        }
    });
});

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