'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg){
  countriesContainer.insertAdjacentText('beforeend', msg)
  // countriesContainer.style.opacity = 1
}
const renderCountry = function (data, className = '') {
  
  const html = ` <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}     people</p>
    <p class="country__row">🦜<span>  ${data.languages[0].name}</span>LANG</p>
    <p class="country__row">💲 <span> ${data.currencies[0].name}</span>CUR</p>
  </div>
</article>`
countriesContainer.insertAdjacentHTML('beforeend', html);
countriesContainer.style.opacity = 1

}



///////////////////////////////////////
/*
const renderCountry = function (data, className = '') {
  
  const html = ` <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}     people</p>
    <p class="country__row">🦜<span>  ${data.languages[0].name}</span>LANG</p>
    <p class="country__row">💲 <span> ${data.currencies[0].name}</span>CUR</p>
  </div>
</article>`
countriesContainer.insertAdjacentHTML('beforeend', html);
countriesContainer.style.opacity = 1

}

const getCountryAndNeighbour = function (country) {
  
  //AJAX call counrty 1
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send()

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);

  //render contry
  renderCountry(data)

  //get neighbor country (2)
  const [neighbour] = data.borders

  if (!neighbour) return
  
  //AJAX call (2)
  const request2 = new XMLHttpRequest();
request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
request2.send()

  request2.addEventListener('load', function () {
    const data2 = JSON.parse(this.responseText)
    
    console.log(data2);

    renderCountry(data2, 'neighbour')
  })
 
})
}

getCountryAndNeighbour('germany')

const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send()


*/

// const request = fetch('https://restcountries.com/v2/name/kenya')
// console.log(request);



// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`).then(function (
//     response
//   ) {
//     console.log(response);
//     return response.json()
//   }).then(function (data) {
    // console.log(data);
//   renderCountry(data[0])
//   })
// }
const getJSON = function (url, errorMsg = 'Something went Wrong') {
  return fetch(url).then(response => {
    if (!response.ok) 
      throw new Error(`${errorMsg} (${response.status})`)
      return response.json()
    
  });

};


// const getCountryData = function (country) 
//   {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//       .then(response => {
//         console.log(response);
      
//               if (!response.ok)
//         throw new Error(`Country not Found(${response.status})`)
//         return response.json();
//       })
//       .then(data => {
//         renderCountry(data[0]);
//         // const neighbour = data[0].borders[0]
//         const neighbour = 'abujubuju'
//         if (!neighbour) return;

//         //country 2
//         return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
     
//       })
//       .then(response =>{
//         console.log(response);
      
//               if (!response.ok)
//         throw new Error(`Country not Found(${response.status})`)
//         return response.json()
//       })
//       .then(data => renderCountry(data, 'neighbour'))
//       .catch(err => {
//         console.error(`${err} 💥💥💥💥💥`)
//         renderError(`Something went wrong 💥💥💥💥💥 ${err}. Try again`)
//       })
//       .finally(() => {
//         countriesContainer.style.opacity = 1;
//       })
//   };
//   btn.addEventListener('click', function () {
//     getCountryData('austria');
//   })

  

const getCountryData = function (country) 
{
  //country 1

  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0]
      console.log(neighbour);
      if (!neighbour)
      throw new Error('No Neighbour!');

      //country 2
      return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found'
      )
    })
    .then(data => renderCountry(data, 'neighbor'))
    .catch(err => {
      console.error(`${err} 💥💥`)
      console.log(err);
      renderError(`Something went wrong 💥💥💥💥 ${err.message}. Try again`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
};

btn.addEventListener('click', function () {
  getCountryData('austria');
})


  getCountryData('new zealand');
