const imgUrl = "https://image.tmdb.org/t/p/w500"
const main = document.querySelector(".main");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const searchBox = document.querySelector(".search");
const home = document.getElementById('home');
const english = document.querySelector('.english');
const arabic = document.querySelector('.arabic');
const chinese = document.querySelector('.chinese');
const French = document.querySelector('.French');
const pageTitle = document.querySelector('h1#title');
const pagePara = document.querySelector('h4#para');
const hoverShow = document.querySelector('.show');
const hoverHidden = document.querySelector('.hide');
let language = "en-us"
let page = 1
const getTMDB = async(route,option)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTZmZmZkMGE3NGIwZjM1MThkYjhkMGU1NTQ2NzYyMyIsInN1YiI6IjY0ZjcwMjIwYThiMmNhMDExYjg4ZWQ5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZhCUzOZFwXYwWSr-Ux2Ev67Kjdj71zVpj9iW1i_-Nw'
        }
      };
try{let response = await fetch(`https://api.themoviedb.org${route}?${option.query?`query=${option.query}&`:""}language=${option.language||"en-US"}&page=${option.page||1}&sort_by=created_at.asc`, options)
 let result = await response.json()
 return result
} catch (err){console.log(err);}
}

const loadMovies =(page, language = "en-us")=>{getTMDB('/3/movie/popular', {page, language}).then(res=>{ 
  main.innerHTML=''
  res.results.forEach(movie => {
  const {id, title, release_date, poster_path, vote_average, overview} = movie
  console.log(movie)
  let img = imgUrl + poster_path
  const movieEl = document.createElement('div');
  movieEl.className.padEnd("movie");
  movieEl.innerHTML = `
  <div class="movie">
  <img class="img-hover" src="${img}" alt="image">
  <div class="movie-info">
<h5><a href="">${title}</a></h5>
<span calss="rate">${(release_date).split("-")[0]}</span>
<span class="${colorchange(vote_average)}">${vote_average}</span>
</div>
<div class="Overveiw">
         ${overview}
        </div>
  </div>
  `
  main.appendChild(movieEl)
});
})}
loadMovies(page)


nextBtn.addEventListener("click",(e)=>{
e.preventDefault();
page++;
loadMovies(page, language)
window.scroll({top:0,
behavior:"smooth"});
if(page > 1){
  previousBtn.disabled = false
}
})
previousBtn.addEventListener("click",(e)=>{
e.preventDefault();
page--;
loadMovies(page, language)
window.scroll({top:0,
behavior:"smooth"});
if(page < 2){
  previousBtn.disabled = true
}
})

const search =(query, language)=>{
  getTMDB("/3/search/movie",{page, query, language}).then(res=>{ 
  main.innerHTML=''
  let img
  res.results.forEach(movie => {
  const {title, release_date, poster_path, vote_average, overview} = movie
  if(!poster_path){
    img = "me.jpeg"
  }else
{  
  img = imgUrl + poster_path;
}  
const movieEl = document.createElement('div');
  movieEl.className.padEnd("movie");
  movieEl.innerHTML = `
  <div class="movie">
  <img class="img-hover" src="${img}" alt="image">
  <div class="movie-info">
<h5><a href="">${title}</a></h5>
<span calss="rate">${(release_date).split("-")[0]}</span>
<span class="${colorchange(vote_average)}">${vote_average}</span>
</div>
<div class="Overveiw">
        ${overview}
        </div>
  </div>
  `
//   img.onerror = function(){
//     this.onerror = null;
//     this.value = me.jpeg;
// };
  main.appendChild(movieEl)
});
})
}
function colorchange(e){
if(e>=8){
  return "rate"
}
else if(e>=5){
return "medium"
}
else{
  return "low"
}
}

searchBox.addEventListener("keyup",function(e){
  if(e.key ==='Enter'){
    search(this.value, language)
  }
});

home.addEventListener("click",(e)=> {
  e.preventDefault()
location.reload()
});

english.addEventListener("click",(e)=>{
  e.preventDefault();
  language = "en-us"
  loadMovies(page, language)
  pageTitle.innerText=englishPage.title
  pagePara.innerText=englishPage.para
  hoverShow.innerText=englishPage.hover
  hoverHidden.innerText=englishPage.subhover
  previousBtn.innerText=englishPage.previous
  nextBtn.innerText=englishPage.next
});
arabic.addEventListener("click",(e)=>{
  e.preventDefault();
  language = "ar"
  loadMovies(page, language)
  pageTitle.innerText=arabicPage.title
  pagePara.innerText=arabicPage.para
  hoverShow.innerText=arabicPage.hover
  hoverHidden.innerText=arabicPage.subhover
  previousBtn.innerText=arabicPage.previous
  nextBtn.innerText=arabicPage.next

});

chinese.addEventListener("click",(e)=>{
  e.preventDefault();
  language = "zh"
  loadMovies(page, language)
  pageTitle.innerText=chinesePage.title
  pagePara.innerText=chinesePage.para
  hoverShow.innerText=chinesePage.hover
  hoverHidden.innerText=chinesePage.subhover
  previousBtn.innerText=chinesePage.previous
  nextBtn.innerText=chinesePage.next
});
French.addEventListener("click",(e)=>{
  e.preventDefault();
  language = "fr"
  loadMovies(page, language)
  pageTitle.innerText=frenchPage.title
  pagePara.innerText=frenchPage.para
  hoverShow.innerText=frenchPage.hover
  hoverHidden.innerText=frenchPage.subhover
  previousBtn.innerText=frenchPage.previous
  nextBtn.innerText=frenchPage.next
});
// let gg =15
// let GG =14
// console.log(gg=1?gg:"no")


function submitValue(e) {
e.preventDefault();
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let password = document.getElementById('pwd');

  let namevalue = name.value;
  let emailvalue = email.value;
  let passwordvalue = password.value;

  localStorage.setItem('Name', namevalue);
  localStorage.setItem('Email', emailvalue);
  localStorage.setItem('Password', passwordvalue);
  window.location.href = 'test.html';
};


function toggleSignUp(e){
  // e.preventDefault();
let x =  document.getElementById("signup");

if(x.style.display === 'none'){
  x.style.display = 'block';
}else{
  // e.preventDefault();
  x.style.display = 'none';
};
};

const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((link) => {
        link.classList.remove("active") 
      });
      e.preventDefault()
      link.classList.add("active");
    });
});

arabicPage={
title:"استمتع بفلمك",
para:">>الأفلام الأكثر شعبية<<",
hover:"قم بالتمرير للحصول على حكمه لليوم",
subhover:" :) لا يوجد سبب للموت بعد ربما ",
previous:"السابق",
next:"التالي",
};
englishPage={
title:"ENJOY YOUR MOVIE",
para:">>MOST POPULAR MOVIES<<",
hover:"HOVER TO GET QUOTE OF YOUR DAY",
subhover:"NO REASONE TO DIE YET MAYBE :)",
previous:"Previous",
next:"Next",
};
frenchPage={
title:"Profitez de votre film",
para:">>FILMS LES PLUS POPULAIRES<<",
hover:"SURVOLEZ POUR OBTENIR LE QUOT DE VOTRE JOURNÉE",
subhover:"aucune raison de mourir pour l'instant peut-être :)".toUpperCase(),
previous:"précédent",
next:"suivant",
};
chinesePage={
title:"享受你的電影",
para:">>最受歡迎的電影<<",
hover:"將鼠標懸停即可獲取您一天的評價",
subhover:"也許還沒有理由去死 :)",
previous:"上一頁",
next:"下一頁",
};



