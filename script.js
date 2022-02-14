var url = "";
var basicURL = "https://www.omdbapi.com/?apikey=c8ed38c2&plot=full&";


// FUNCTION GETS MOVIE DATA FROM API BY ***ANY**** URL and DRAW MOVIES SECTION CONTENT
async function getApiData(url) {
   const response = await fetch(url);
   const data = await response.json();

   moviesContainer.innerHTML = '';

   //console.log(data);
   const list = data.Search;
   //console.log(list);

   list.map((item) => {
      const imdbID = item.imdbID;
      getMovieData(`${basicURL}i=${imdbID}&`);
   });
};


// FUNCTION GETS MOVIE DATA FROM API BY IMDB-ID and DRAW MOVIES SECTION CONTENT
async function getMovieData(url) {
   const response = await fetch(url);
   const movieData = await response.json();

   const title = movieData.Title;
   const poster = movieData.Poster;
   const plot = movieData.Plot;
   const rating = movieData.imdbRating;
   const movie = `<div class="movie__container"><img src="${poster}" alt="${title}" /><h2>${title}</h2><div class="movie__rate"><div class="movie__stars">IMDB Rating</div><h3 class="rate">${rating}</h3></div><p class="movie__plot">${plot}</p></div>`;

   moviesContainer.innerHTML += movie;
};
/* MOVIE SECTION CONTENT BUILDER ---------------------------------------------------------- */


/* SLIDER SECTION CONTENT BUILDER  ========================================================*/
async function getApiDataSlider(url) {
   const response = await fetch(url);
   const data = await response.json();

   sliderTrack.innerHTML = '';

   const sliderDataList = data.Search;

   sliderDataList.map((item) => {
      const imdbID = item.imdbID;
      getSliderData(`${basicURL}i=${imdbID}&`);
   });
};
// FUNCTION GETS MOVIE DATA FROM API BY IMDB-ID and DRAW MOVIES SECTION CONTENT
async function getSliderData(url) {
   const response = await fetch(url);
   const movieData = await response.json();

   const title = movieData.Title;
   const poster = movieData.Poster;
   const plot = movieData.Plot;
   const rating = movieData.imdbRating;
   const movie = `<div class="slider__item"><div class="slider__poster"><img src="${poster}" alt="${title}" /></div><!--<h2 class="item__title">${title}</h2>--></div>`;

   sliderTrack.innerHTML += movie;
};
/* SLIDER SECTION CONTENT BUILDER ---------------------------------------------------------- */


const moviesContainer = document.querySelector(".movies");

const searchBox = document.querySelector(".search__str");
const clearButton = document.querySelector(".clear__btn");
const searchButton = document.querySelector(".search__btn");
const queryes = document.querySelectorAll(".queries__btn");


window.onload = () => {
   searchBox.focus();

   getApiDataSlider(`${basicURL}s=marvel&type=movie&`); // content for SLIDER section

   url = `${basicURL}s=back&`;
   drawContent(url); // content for MOVIES section



}

// ON PRESS ENTER ON INPUT ACTION
searchBox.addEventListener("change", function () {
   url = `${basicURL}s=${this.value}&`;
   drawContent(url);
});

// BUTTON SEARCH ACTION
searchButton.addEventListener("click", function () {
   if (searchBox.value !== '') {
      url = `${basicURL}s=${this.value}&`;
      drawContent(url);
      //console.log(url);
   }
});

// ON INPUT CHANGE FOCUS
searchBox.addEventListener("input", function () {
   if (this.value !== "") {
      clearButton.classList.add("active");
      searchButton.classList.add("active")
   } else {
      clearButton.classList.remove("active");
      searchButton.classList.remove("active");
   }
})
clearButton.addEventListener("click", function () {
   searchBox.value = "";
   this.classList.remove("active");
   searchButton.classList.remove("active");
})
queryes.forEach((item) => {
   item.addEventListener("click", function () {
      const query = this.textContent;
      //console.log(parseInt(query) +"  " + typeof (parseInt(query)));

      if (isNaN(Number(query))) {
         url = `${basicURL}s=${query}`;
      } else {
         url = `${basicURL}s=marvel&y=${query}`;
      }
      drawContent(url);
      //console.log(url);
      //console.log(this + " click");
   });
})


/* HELP FUNCTIONS */

// windows loader
function loader() {
   moviesContainer.innerHTML = `<div class="loader"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div></div>`;
}

// draw content from url and show 404 if not found
function drawContent(url) {
   loader();
   getApiData(url)
      .catch(err => {
         console.error(err);
         moviesContainer.innerHTML = "";
         var i = 0;
         var interval = setInterval(function () {
            moviesContainer.innerHTML = `<div class="error__404">${i}</div>`;
            if (i <= 350) {
               i += 10;
            } else {
               i++;
            }
            if (i == 405) {
               clearInterval(interval);
            }
         }, 0);
         setTimeout(function () {
            moviesContainer.innerHTML += `<div class="noresults">Oooooooooooops!<br><br>No results or inappropriate content.</div>`;
         }, 1500);
      });
}


/* SLIDER NAVIGATION SECTION =================================================== */

const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const sliderContainer = document.querySelector(".slider__container");
const sliderTrack = document.querySelector(".slider__track");
const sliderItem = document.querySelector(".slider__item");

var trackPosition = 0;
var itemWidth = 185;
var step = 0;
var totalWidth = 0;

nextButton.addEventListener("click", function () {

   prevButton.style.pointerEvents = "auto";

   totalWidth = sliderTrack.offsetWidth;
   step = Math.floor(sliderContainer.offsetWidth / itemWidth) * itemWidth;

   if (trackPosition + 2 * step > totalWidth) {
      this.style.pointerEvents = "none";
      trackPosition = totalWidth - step;
      sliderTrack.style.left = -trackPosition + "px";
      //console.log(trackPosition);
   } else {
      trackPosition += step;
      sliderTrack.style.left = -trackPosition + "px";
   }
   //console.log(step + " " + trackPosition + " " + sliderTrack.style.left);
});
prevButton.addEventListener("click", function () {

   nextButton.style.pointerEvents = "auto";
   
   totalWidth = sliderTrack.offsetWidth;
   step = Math.floor(sliderContainer.offsetWidth / itemWidth) * itemWidth;

   //console.log(trackPosition);
   //console.log(step);

   if (trackPosition - 2 * step < 0) {
      this.style.pointerEvents = "none";
      trackPosition = 0;
      sliderTrack.style.left = 0;
      //console.log(trackPosition);
   } else {
      trackPosition -= step;
      //console.log(trackPosition);
      sliderTrack.style.left = -trackPosition + "px";
   }
   //console.log(step + " " + trackPosition + " " + sliderTrack.style.left);
});
/* SLIDER NAVIGATION SECTION ----------------------------------------------- */

console.log('1. Task: js30#2.3-movie-app \n2. Done 14.02.2022 / 14.02.2022 23:59 UTC \n3. Score: 60 / 60 \n+ Вёрстка +10\n   + При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10 \n   + Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10 \n   + Поиск +30:\n   + при открытии приложения курсор находится в поле ввода +5\n   + есть placeholder +5\n   + автозаполнение поля ввода отключено +5\n   + поисковый запрос можно отправить нажатием клавиши Enter +5\n   + после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n   + в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n   + Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10:\n   + собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо\n   + дополнительныйфункционал:\n   + наличие на карточке фильма его описания и рейтинга на IMDb\n   + кастомная прокрутка описания, если оно больше высоты карточки\n   + карусель');