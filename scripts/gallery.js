$(document).ready(function () {
    url = 'https://storage.filebin.net/filebin/2ccf3db92d489a2fd213cce6d020d5aff226b395099d902a0bbb571c90b1ea86?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=GK352fd2505074fc9dde7fd2cb%2F20260405%2Fhel1-dc4%2Fs3%2Faws4_request&X-Amz-Date=20260405T184626Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&response-cache-control=max-age%3D900&response-content-disposition=inline%3B%20filename%3D%22gallery.json%22&response-content-type=application%2Fjson&x-id=GetObject&X-Amz-Signature=6203a70767f9a353cae8a41bb88be8432399e8668c1fb05bac769a999bdc3ed2';
    fetch(url).then(response => {return response.json();}).then(function (data) {
        for (var group in data) {
            var newGroup = "";

            newGroup += "<li class='photogallery'><ul>";
            newGroup += "<h1>test</h1>"

            for (let link in data[group].images) {
                let newLink = "";

                newLink += "<li><a href='";
                newLink += data[group].images[link];
                newLink += "' data-lightbox='";
                newLink += data[group].group;
                newLink += "'><img class='lazyload' data-src='";
                newLink += data[group].images[link];
                newLink += "' loading='lazy'/></a></li>";

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