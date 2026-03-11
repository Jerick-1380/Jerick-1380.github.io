---
layout: page
permalink: /hobbies/
title: hobbies
description:
nav: true
nav_order: 7
display_title: false
---

<div class="header-bar">
  <h1>Hobbies</h1>
</div>

## Tricking

<div class="row mt-3">
  <div class="col-sm-12 col-md-8 mt-3 offset-md-2">
    {% include figure.liquid path="assets/img/hobbies/tricking/EAAA06DE-2CEC-4102-93FA-353A78C399D5.JPG" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row mt-3 tricking-bottom">
  <div class="col-sm-6 mt-3 tricking-col">
    {% include figure.liquid path="assets/img/hobbies/tricking/IMG_7198.PNG" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 tricking-col">
    <div style="position: relative; padding-bottom: 177.78%; height: 0; overflow: hidden;">
      <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/Zqw_2Y2xrB8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>

## Breakdancing

<div class="row mt-3 breakdancing-photos">
  <div class="col-sm-6 mt-3 breakdancing-col">
    {% include figure.liquid path="assets/img/hobbies/breakdancing/54897485878_2cf653b99c_k.JPG" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 breakdancing-col">
    {% include figure.liquid path="assets/img/hobbies/breakdancing/IMG_5585.JPG" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm-12 col-md-8 mt-3 offset-md-2">
    <div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/8CMJ0gcUYy8" allowfullscreen></iframe>
    </div>
  </div>
</div>

## Freediving

I'm a certified AIDA 4 Master Freediver, trained in advanced freediving techniques and safety protocols.

<div class="row mt-3 freediving-images">
  <div class="col-sm-6 mt-3 freediving-col">
    {% include figure.liquid path="assets/img/hobbies/freediving/IMG_3529.jpg" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 freediving-col certificate-wrapper">
    {% include figure.liquid path="assets/img/hobbies/freediving/certificate.png" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div style="margin-top: 4rem;"></div>

## Photography

<div class="photography-carousel mt-5">
  <div class="carousel-wrapper">
    <button class="carousel-btn carousel-btn-prev" onclick="changePhoto(-1)">&#10094;</button>
    <div class="carousel-image-container">
      <img id="carousel-image" src="/assets/img/hobbies/photography/54930688209_801dd7969f_b.jpg" alt="Photography" class="img-fluid rounded z-depth-1">
    </div>
    <button class="carousel-btn carousel-btn-next" onclick="changePhoto(1)">&#10095;</button>
  </div>
  <div class="carousel-indicators">
    <span class="indicator active" onclick="setPhoto(0)"></span>
    <span class="indicator" onclick="setPhoto(1)"></span>
    <span class="indicator" onclick="setPhoto(2)"></span>
    <span class="indicator" onclick="setPhoto(3)"></span>
  </div>
</div>

<div style="margin-top: 2rem;">
  <a href="https://flickr.com/photos/203834484@N07/" class="material-download" target="_blank" style="display: inline-block; background: var(--global-theme-color); color: var(--global-bg-color) !important; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600;">
    View Full Portfolio on Flickr →
  </a>
</div>

<script>
const photos = [
  '/assets/img/hobbies/photography/54930688209_801dd7969f_b.jpg',
  '/assets/img/hobbies/photography/54941950886_c363c91da1_b.jpg',
  '/assets/img/hobbies/photography/54942154818_2abf77f85b_b.jpg',
  '/assets/img/hobbies/photography/54946647801_093ea9ffc7_b.jpg'
];

let currentPhotoIndex = 0;

function changePhoto(direction) {
  currentPhotoIndex += direction;

  if (currentPhotoIndex >= photos.length) {
    currentPhotoIndex = 0;
  } else if (currentPhotoIndex < 0) {
    currentPhotoIndex = photos.length - 1;
  }

  updatePhoto();
}

function setPhoto(index) {
  currentPhotoIndex = index;
  updatePhoto();
}

function updatePhoto() {
  const img = document.getElementById('carousel-image');

  // Fade out
  img.style.opacity = '0';

  // Change image and fade in after a short delay
  setTimeout(() => {
    img.src = photos[currentPhotoIndex];
    img.style.opacity = '1';
  }, 300);

  // Update indicators
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentPhotoIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}
</script>

<style>
.photography-carousel {
  width: 100%;
  margin: 3rem 0;
  padding: 2rem 0;
  clear: both;
  position: relative;
  z-index: 1;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.carousel-image-container {
  flex: 1;
  max-width: 800px;
  display: flex;
  justify-content: center;
}

.carousel-image-container img {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: opacity 0.3s ease;
}

.carousel-btn {
  background: var(--global-theme-color);
  color: var(--global-bg-color);
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.carousel-btn:hover {
  background: var(--global-hover-color);
  transform: scale(1.1);
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  position: relative;
  z-index: 2;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--global-divider-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: var(--global-theme-color);
  transform: scale(1.2);
}

.indicator:hover {
  background: var(--global-hover-color);
}

@media (max-width: 768px) {
  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  .carousel-image-container img {
    max-height: 400px;
  }
}

/* Freediving images styling */
.freediving-images {
  display: flex;
  align-items: stretch;
}

.freediving-col {
  display: flex !important;
  flex-direction: column;
}

.freediving-col figure {
  height: 100%;
  margin: 0;
}

.freediving-col img {
  height: 500px;
  width: 100%;
  object-fit: cover;
}

.certificate-wrapper {
  overflow: hidden;
}

.certificate-wrapper figure {
  margin-left: -5px;
  width: calc(100% + 5px);
}

@media (max-width: 768px) {
  .freediving-col img {
    height: 300px;
  }
}

/* Tricking bottom row - same height for photo and video */
.tricking-bottom {
  display: flex;
  align-items: stretch;
}

.tricking-col {
  display: flex !important;
  flex-direction: column;
}

.tricking-col figure {
  height: 100%;
  margin: 0;
}

.tricking-col img {
  height: 600px;
  width: 100%;
  object-fit: contain;
  background: var(--global-bg-color);
}

.tricking-col > div {
  height: 600px !important;
  padding-bottom: 0 !important;
}

/* Breakdancing photos - same height */
.breakdancing-photos {
  display: flex;
  align-items: stretch;
}

.breakdancing-col {
  display: flex !important;
  flex-direction: column;
}

.breakdancing-col figure {
  height: 100%;
  margin: 0;
}

.breakdancing-col img {
  height: 500px;
  width: 100%;
  object-fit: contain;
  background: var(--global-bg-color);
}

@media (max-width: 768px) {
  .tricking-col img {
    height: 400px;
  }

  .tricking-col > div {
    height: 400px !important;
  }

  .breakdancing-col img {
    height: 350px;
  }
}
</style>
