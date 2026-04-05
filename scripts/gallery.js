$(document).ready(function () {
    url = 'https://isbo.cc/assets/gallery.json';
    fetch(url).then(response => {return response.json();}).then(function (data) {
        for (let link in data) {
            let newLink = "";

            newLink += "<li><a href='";
            newLink += data[link].url;
            newLink += "' data-lightbox='";
            newLink += data[link].group;
            newLink += "'><img class='lazyload' data-src='";
            newLink += data[link].url;
            newLink += "' loading='lazy'/></a></li>";

            $('#gallery').append(newLink);

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
    });
});

document.addEventListener('DOMContentLoaded', function() {
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

    // object-fit and object-position polyfill
    objectFitImages();
});