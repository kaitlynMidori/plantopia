'use strict'

header("Access-Control-Allow-Origin: *");

const apiKey = 'token'
'itTjf7x1LU-SmG1cyX5-hbAaG2LQm2OW3foAnfX3QT8';

const plantUrl = 'https://trefle.io/api/v1/plants/search';

const params = new URLSearchParams(window.location.search)
params.get('light')

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const name = $('#common_name').val();
        const sName = $('#scientific_name').val();
        const color = $('#color').val();
        const toxicity = $('#toxicity').val();
        const light = $('#light').val();
        console.log('Im Working')
        getPlant(name, sName, color, toxicity, light);
    });
}

function formatQueryParams(params) {
    console.log('query params is working');
    const queryItems = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getPlant(name, sName, color, toxicity, light) {
    console.log('request sent');
    const params = {
        q: name + sName + color + toxicity + light,
        token: 'itTjf7x1LU - SmG1cyX5 - hbAaG2LQm2OW3foAnfX3QT8',
        name: name,
        sName: sName,
        color: color,
        toxicity: toxicity,
        light: light
    };

    const queryString = formatQueryParams(params)
    const url = plantUrl + '?' + queryString;
    console.log(url);

    fetch(plantUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();


    if (!Object.keys(responseJson).length) {
        $('#results-list').append('<h2>Sorry, no plants found with input parameters</h2>');
    }

    for (let i = 0; i < responseJson.length; i++) {

        $('#results-list').append(
            `<li class="each-product-result">
      <h3 class="common_name">${responseJson[i].name}</h3>
      <p class="scientific_name">$${responseJson[i].duration}</p>
      <p class="color">${responseJson[i].color}</p>
      <p class="toxicity">${responseJson[i].toxicity}</p>
      <p class="light">${responseJson[i].light}</p>
      </li>`
        )
    };

    $('#results').removeClass('hidden');

    $('#common_name').val('')
    $('#scientific_name').val('')
    $('#light').val('')
    $('#toxicity').val('')
    $('#color').val('')
};

$(watchForm);

$.ajax({
    url: 'https://trefle.io/api/v1/plants/search',
    type: 'GET',
    contentType: 'application/json',
    headers: {
        'Authorization': 'Bearer <itTjf7x1LU-SmG1cyX5-hbAaG2LQm2OW3foAnfX3QT8>'
    },

    success: function(result) {
        // CallBack(result);
    },
    error: function(error) {

    }
});

// {
//     "data": [],
//     "links": {
//       "self": "/api/v1/plants/search?q=cocos",
//       "first": "/api/v1/plants/search?page=1&q=cocos",
//       "last": "/api/v1/plants/search?page=1&q=cocos"
//     },
//     "meta": {
//       "total": 0
//     }
//   }