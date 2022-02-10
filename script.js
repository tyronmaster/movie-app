var url = "http://www.omdbapi.com/?apikey=c8ed38c2&s=back&";

/*var url = "https://api.themoviedb.org/3/search/company?api_key=e3d3ddb01fbf1cb4fe05c7d1d14ed8a9&query=marvel&page=1";*/

fetch(url, {
   "method": "GET",
})
   .then(response => console.log(response.json()))
   /*.then(data => {
      console.log(data);
      const list = data.Poster;
      console.log(list);
   })*/
   .catch(err => {
      console.error(err);
   });


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

const searchBox = document.querySelector(".search__str");

window.onload = () => {
   searchBox.focus();
}