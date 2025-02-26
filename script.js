const burgerMenu = document.querySelector(".burger_container");
const menuContainer = document.querySelector(".menu_container");
const menuLinks = document.querySelectorAll(".menu_container a");

if (burgerMenu && menuContainer) {
    burgerMenu.addEventListener("click", () => {
        menuContainer.classList.toggle("open");
    });

    menuContainer.addEventListener("click", (event) => {
        if (event.target.closest(".menu_container_close")) {
            menuContainer.classList.remove("open");
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuContainer.classList.remove("open");
        });
    });

    document.addEventListener("click", (event) => {
        if (!menuContainer.contains(event.target) && !burgerMenu.contains(event.target)) {
            menuContainer.classList.remove("open");
        }
    });
}

// -------------------------------

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const com_slides = document.querySelector(".com_slides")
const slides = document.querySelectorAll(".carousel_slide");
const carousel = document.querySelector(".carousel");
let carouselIndex = 0;
const totalSlides = slides.length;

const margin = 30;

window.addEventListener('resize', function (event) {
    updateCarouselPosition()
})

function updateCarouselPosition() {
    let offset;
    const slideWidth = slides[0].offsetWidth;
    const carouselContainer = document.getElementById('classes')
    stopAllVideos();

    if (carouselIndex === totalSlides - 1 && carouselContainer.offsetWidth !== slideWidth) {
        offset = -((carouselIndex - 1) * (slideWidth + margin)) - (slideWidth - ((carouselContainer.offsetWidth * 30 / 100) - 30));
    } else {
        offset = -(carouselIndex * (slideWidth + margin));
    }

    carousel.style.transform = `translateX(${offset}px)`;
}

function moveCarouselSlide(direction) {

    carouselIndex += direction;

    if (carouselIndex < 0) {

        carouselIndex = totalSlides - 1;
    } else if (carouselIndex >= totalSlides) {
        carouselIndex = 0;

    }

    updateCarouselPosition();
}

prevButton.addEventListener("click", () => moveCarouselSlide(-1));
nextButton.addEventListener("click", () => moveCarouselSlide(1));

if (isTouchDevice) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";

    // com_slides.style.display = "none";

    let startX = 0;
    let endX = 0;

    stopAllVideos();

    carousel.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            moveCarouselSlide(1);
        } else if (startX - endX < -50) {
            moveCarouselSlide(-1);
        }
    });
}

// ---------

document.querySelectorAll(".start_button").forEach(button => {
    button.addEventListener("click", (event) => {
        const overlay = event.currentTarget.closest(".overlay");
        const video = overlay.previousElementSibling;

        if (video) {
            video.setAttribute("controls", "");
            video.play();
            overlay.style.display = "none";
        }
    });
});

function stopAllVideos() {
    document.querySelectorAll(".carousel_slide video").forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}


// -------------------------------

const commentSlides = document.querySelectorAll(".com_slide");
const quotes = document.querySelectorAll(".quote");

let currentCommentIndex = 0;

function changeCommentAutomatically() {
    commentSlides.forEach((s) => s.classList.remove("active"));
    quotes.forEach((q) => q.classList.remove("active"));

    commentSlides[currentCommentIndex].classList.add("active");
    quotes[currentCommentIndex].classList.add("active");

    currentCommentIndex = (currentCommentIndex + 1) % commentSlides.length;
}

commentSlides.forEach((slide, index) => {
    slide.addEventListener("click", function (e) {
        e.preventDefault();

        commentSlides.forEach((s) => s.classList.remove("active"));
        quotes.forEach((q) => q.classList.remove("active"));

        this.classList.add("active");
        quotes[index].classList.add("active");

        currentCommentIndex = index;
    });
});

setInterval(changeCommentAutomatically, 5000);

if (isTouchDevice) {
    let startX = 0;
    let endX = 0;

    const commentCarousel = document.querySelector(".comments");

    commentCarousel.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    commentCarousel.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) {
            moveCommentSlide(1);
        } else if (startX - endX < -50) {
            moveCommentSlide(-1);
        }
    });
}

function moveCommentSlide(direction) {
    commentSlides.forEach((s) => s.classList.remove("active"));
    quotes.forEach((q) => q.classList.remove("active"));

    currentCommentIndex += direction;

    if (currentCommentIndex < 0) {
        currentCommentIndex = commentSlides.length - 1;
    } else if (currentCommentIndex >= commentSlides.length) {
        currentCommentIndex = 0;
    }

    commentSlides[currentCommentIndex].classList.add("active");
    quotes[currentCommentIndex].classList.add("active");
}






