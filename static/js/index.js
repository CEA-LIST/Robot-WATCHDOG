window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

})


// Video mosaic: play videos only while visible, click to open fullscreen
document.addEventListener('DOMContentLoaded', function() {
    var videos = document.querySelectorAll('.video-mosaic video');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.play().catch(function() {});
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.25 });
        videos.forEach(function(v) { observer.observe(v); });
    } else {
        videos.forEach(function(v) { v.autoplay = true; v.play().catch(function() {}); });
    }
    videos.forEach(function(v) {
        v.addEventListener('click', function() {
            if (v.requestFullscreen) { v.requestFullscreen(); }
            else if (v.webkitEnterFullscreen) { v.webkitEnterFullscreen(); }
        });
    });
});
