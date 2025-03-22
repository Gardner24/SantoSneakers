document.addEventListener("DOMContentLoaded", function () {
  const images = [
    {
      src: "../img/traviesas.jpg",
      title: "NIKE - AIR",
      description: "JORDAN 1 - HIGH CACTUS JACK",
      price: "$2600",
    },
    {
      src: "../img/algobarato.jpg",
      title: "NIKE - MAG",
      description: "REGRESO AL FUTURO - (2016)",
      price: "$55,620",
    },
    {
      src: "../img/chatas.jpg",
      title: "NIKE - JORDAN",
      description: "RETRO 4 - BLACK CAT(2020)",
      price: "$800",
    },
    {
      src: "../img/jordaniaold.jpg",
      title: "NIKE - JORDAN",
      description: "RETRO 1 - CLASSIC",
      price: "$1500",
    },
    {
      src: "../img/jordaniaold2.jpg",
      title: "NIKE - JORDAN",
      description: "RETRO 2 - CLASSIC",
      price: "$1600",
    },
    {
      src: "../img/jordanias4.jpg",
      title: "NIKE - JORDAN",
      description: "RETRO 3 - CLASSIC",
      price: "$1700",
    },
  ];

  const carouselContainer = document.getElementById("carousel-images");
  const prevButton = document.getElementById("carousel-prev");
  const nextButton = document.getElementById("carousel-next");
  let currentIndex = 0;

  function updateCarousel() {
    carouselContainer.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const imageIndex = (currentIndex + i) % images.length;
      const imageData = images[imageIndex];

      const col = document.createElement("div");
      col.className = "col-md-4";

      const img = document.createElement("img");
      img.src = imageData.src;
      img.alt = `Imagen ${imageIndex + 1}`;
      img.className = "d-block w-100";

      const title = document.createElement("h3");
      title.className = "h3-imgs";
      title.textContent = imageData.title;

      const description = document.createElement("p");
      description.className = "p-imgs";
      description.textContent = imageData.description;

      const price = document.createElement("h4");
      price.className = "h4-imgs";
      price.textContent = imageData.price;

      col.appendChild(img);
      col.appendChild(title);
      col.appendChild(description);
      col.appendChild(price);

      carouselContainer.appendChild(col);
    }
  }
  function showPrevious() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  prevButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);
  setInterval(showNext, 10000);
  updateCarousel();
});
