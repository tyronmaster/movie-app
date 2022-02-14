/* HORISONTAL SCROLL  DOESN'T WORK PROPERLY
import scroller from "./scroll.js";
scroller();
*/


// START WITH THIS URL ^)
// var url = "https://www.omdbapi.com/?apikey=c8ed38c2&s=back&";


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

   track.innerHTML = '';

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

   track.innerHTML += movie;
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
const track = document.querySelector(".slider__track");
const sliderItem = document.querySelector(".slider__item");

//var trackPosition = window.getComputedStyle(track).left;
var totalWidth = track.offsetWidth;
var itemWidth = sliderItem.offsetWidth + 60;
var step = Math.floor(sliderContainer.offsetWidth / itemWidth) * itemWidth;
console.log(totalWidth + " " + step + " " + track.style.left + " " + itemWidth);
var trackPosition = 0;

nextButton.addEventListener("click", function () {
   prevButton.style.pointerEvents = "auto";
   //console.log(trackPosition);
   if (trackPosition + 2 * step > totalWidth) {
      this.style.pointerEvents = "none";
      trackPosition = totalWidth - step;
      track.style.left = -trackPosition + "px";
      //console.log(trackPosition);
   } else {
      trackPosition += step;
      track.style.left = -trackPosition + "px";
   }
   //console.log(trackPosition);
});
prevButton.addEventListener("click", function () {
   nextButton.style.pointerEvents = "auto";
   //console.log(trackPosition);
   if (trackPosition - 2 * step < 0) {
      this.style.pointerEvents = "none";
      trackPosition = 0;
      track.style.left = 0;
      //console.log(trackPosition);
   } else {
      trackPosition -= step;
      track.style.left = trackPosition + "px";
   }
   //console.log(trackPosition);
});
/* SLIDER NAVIGATION SECTION ----------------------------------------------- */

/*
Вёрстка +10
++ на странице есть несколько карточек фильмов и строка поиска. 
   На каждой карточке фильма есть постер и название фильма. 
   Также на карточке может быть другая информация, которую предоставляет API, 
   например, описание фильма, его рейтинг на IMDb и т.д. 
   +5

++ в футере приложения есть ссылка на гитхаб автора приложения, 
   год создания приложения, логотип курса со ссылкой на курс 
   +5

-- При загрузке приложения на странице отображаются карточки фильмов 
   с полученными от API данными 
   +10

-- Если в поле поиска ввести слово и отправить поисковый запрос, 
   на странице отобразятся карточки фильмов, в названиях которых 
   есть это слово, если такие данные предоставляет API 
   +10

++ Поиск +30

  ++ при открытии приложения курсор находится в поле ввода 
     +5

  ++ есть placeholder 
     +5

  -- автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) 
     +5

  -- поисковый запрос можно отправить нажатием клавиши Enter 
     +5

  -- после отправки поискового запроса и отображения результатов поиска, 
     поисковый запрос продолжает отображаться в поле ввода 
     +5

  ++ в поле ввода есть крестик при клике по которому поисковый запрос из поля 
     ввода удаляется и отображается placeholder 
     +5

++ Очень высокое качество оформления приложения и/или дополнительный не предусмотренный 
   в задании функционал, улучшающий качество приложения 
   +10

   ++ высокое качество оформления приложения предполагает собственное 
      оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо

   ++ дополнительным функционалом может быть, например, наличие на карточке фильма 
      его описания и рейтинга на IMDb

*/


/* GOOD WORKING VARIANT ============================
fetch(url, {
   "method": "GET",
})
   .then(response => response.json())
   .then(data => {
      // console.log(data);
      const list = data.Search;
      // console.log(list);
      list.map((item) => {
         const title = item.Title;
         const poster = item.Poster;
         const imdbID = item.imdbID;
         fetch(`https://www.omdbapi.com/?apikey=c8ed38c2&i=${imdbID}&`, {
            "method": "GET",
         })
            .then(response => response.json())
            .then(movieData => {
               //console.log(movieData);
               const plot = movieData.Plot;
               const rating = movieData.imdbRating;
               const movie = `<div class="movie__container"><img src="${poster}" alt="${title}" /><h2>${title}</h2><div class="movie__rate"><div class="movie__stars">IMDB Rating</div><h3 class="rate">${rating}</h3></div><p class="movie__plot">${plot}</p></div>`;
               document.querySelector(".movies").innerHTML += movie;
            });
      });
   })
   .catch(err => {
      console.error(err);
   });
*/



/* IMDB API */
/*
fetch("https://imdb8.p.rapidapi.com/auto-complete?q=game", {
   "method": "GET",
   "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "5034c4df4emsh426a86961656757p1cf604jsn169cd90a84a4"
   }
})
   .then(response => response.json())
   .then(data => {
      //console.log(data);
      const list = data.d;

      list.map( (item) => {
         const name = item.l;
         const poster = item.i.imageUrl;
         const movie = `<li><img src="${poster}" alt="image poster"><h2>${name}</h2></li>`;
         document.querySelector(".movies").innerHTML += movie;
      })
      //console.log(list);
   })
   .catch(err => {
      console.error(err);
   });
   */