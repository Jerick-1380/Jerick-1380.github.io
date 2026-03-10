---
layout: page
permalink: /hobbies/
title: hobbies
description:
nav: true
nav_order: 7
---

## Tricking

Tricking is an aesthetic blend of gymnastics, martial arts, and breakdancing. It combines flips, kicks, and twists into fluid sequences that emphasize creativity and style.

<div class="row mt-3">
  <div class="col-sm-6 mt-3">
    {% include figure.liquid path="assets/img/hobbies/tricking/EAAA06DE-2CEC-4102-93FA-353A78C399D5.JPG" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3">
    {% include figure.liquid path="assets/img/hobbies/tricking/IMG_7198.PNG" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm-12 col-md-6 mt-3 offset-md-3">
    <div class="embed-responsive embed-responsive-9by16">
      <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/Zqw_2Y2xrB8" allowfullscreen></iframe>
    </div>
  </div>
</div>

---

## Breakdancing

<div class="row mt-3">
  <div class="col-sm-6 mt-3">
    {% include figure.liquid path="assets/img/hobbies/breakdancing/54897485878_2cf653b99c_k.JPG" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3">
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

---

## Freediving

I'm a certified AIDA 4 Master Freediver, trained in advanced freediving techniques and safety protocols.

<div class="row mt-3">
  <div class="col-sm-6 mt-3">
    {% include figure.liquid path="assets/img/hobbies/freediving/IMG_3529.jpg" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3">
    {% include figure.liquid path="assets/img/hobbies/freediving/certificate.png" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## Photography

I enjoy capturing moments through photography. You can view my full portfolio on Flickr.

<div class="photography-carousel mt-3">
  <div class="carousel-wrapper">
    <div class="carousel-container">
      {% include figure.liquid path="assets/img/hobbies/photography/54930688209_801dd7969f_b.jpg" class="carousel-image" %}
      {% include figure.liquid path="assets/img/hobbies/photography/54941950886_c363c91da1_b.jpg" class="carousel-image" %}
      {% include figure.liquid path="assets/img/hobbies/photography/54942154818_2abf77f85b_b.jpg" class="carousel-image" %}
      {% include figure.liquid path="assets/img/hobbies/photography/54946647801_093ea9ffc7_b.jpg" class="carousel-image" %}
    </div>
  </div>
</div>

<div style="margin-top: 2rem;">
  <a href="https://flickr.com/photos/203834484@N07/" class="material-download" target="_blank" style="display: inline-block; background: var(--global-theme-color); color: var(--global-bg-color) !important; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600;">
    View Full Portfolio on Flickr →
  </a>
</div>

<style>
.photography-carousel {
  width: 100%;
  overflow: hidden;
  margin: 2rem 0;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
}

.carousel-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0;
  -webkit-overflow-scrolling: touch;
}

.carousel-container::-webkit-scrollbar {
  height: 8px;
}

.carousel-container::-webkit-scrollbar-track {
  background: var(--global-divider-color);
  border-radius: 4px;
}

.carousel-container::-webkit-scrollbar-thumb {
  background: var(--global-theme-color);
  border-radius: 4px;
}

.carousel-container::-webkit-scrollbar-thumb:hover {
  background: var(--global-hover-color);
}

.carousel-image {
  flex: 0 0 auto;
  width: 400px;
  max-width: 80vw;
}

.carousel-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.carousel-image img:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .carousel-image {
    width: 300px;
  }

  .carousel-image img {
    height: 225px;
  }
}
</style>
