const insertCountry = (country) => {
    let initialDiv = document.createElement('div');
    initialDiv.setAttribute('class', 'col-4');

    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card mb-5');

    let cardHead = document.createElement('div');
    cardHead.setAttribute('class', 'card-header text-center bg-dark text-light');

    cardHead.innerHTML = country.countryName;

    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body text-center ');

    const flagImage = document.createElement('img');
    flagImage.src = country.flag;
    flagImage.alt = country.countryName;
    flagImage.style.height = '200px';
    flagImage.style.width = '100%';

    let capitalTag = document.createElement('p');
    capitalTag.innerHTML = `Captial: ${country.capital}`;
    capitalTag.setAttribute('class', 'text-center ');

    let region = document.createElement('p');
    region.innerHTML = `Region : ${country.region}`;
    region.setAttribute('class', 'text-center');

    let code = document.createElement('p');
    code.innerHTML = `Country Code : ${country.code}`;
    code.setAttribute('class', 'text-center');

    let button = document.createElement('button');
    button.type = button;
    button.style.border = '1px solid white';

    button.innerText = "Click for Weather";
    button.innerText = "Check for weather";
    button.addEventListener('click', () => {
        if (navigator.geolocation) {
            button.innerHTML = `<p>Wind speed : ${country.wind.speed} meter/sec</p>
                            <p>Summary : ${country.res.weather[0].description}</p>
                            <p>Temparature : ${country.temp}</p>`;
            console.log("button work");
        }
        else {
            alert("Your browser not support geolocation api");
        }
    })

    cardBody.append(flagImage, capitalTag, region, code, button);

    cardDiv.append(cardHead, cardBody);

    initialDiv.appendChild(cardDiv);

    document.getElementById('container-row').appendChild(initialDiv);

}

async function restcountries() {
    let rest = await fetch("https://restcountries.com/v3.1/all");
    let result = await rest.json();
    console.log(result);
    for (let i = 0; i < 6; i++) {
        let capital = result[i].capital;
        let countryName = result[i].name.common;
        let flag = result[i].flags.png;
        let region = result[i].region;
        let code = result[i].cca3;

        // cardHead.innerText= countryName;
        // document.body.append(cardHead);
        // console.log(countryName);
        // console.log("Capital: ", capital[0]);

        // console.log(flag);
        // console.log("Region : ", region);
        // console.log("Country Code : ", code);

        let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=11d137816e91357cf9dd3ebf2dd093a6`);
        let res = await weather.json();
        let kelvin = 273;
        let wind = res.wind;
        let temp = Math.floor(res.main.temp - kelvin) + "°C";;

        // console.log(res.weather[0].main);
        // console.log(res.wind);
        // console.log("Temp : ", res.main.temp);
        // console.log(res);
        insertCountry({
            capital,
            countryName,
            flag,
            region,
            code,
            res,
            kelvin,
            wind,
            temp
        })
    }

}

restcountries();