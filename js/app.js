
// emplement on search button click by Enter press
const searchBtn = document.getElementById("button-addon2");
const searchInput = document.getElementById("search-field");

searchInput.addEventListener("keypress", function (event) {
    // event.preventDefault();
    if (event.key == 'Enter') {
        searchBtn.click();
    }

});




// spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// toggle search result 
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}
// Search field setup by arrow function
const loadSearchField = () => {
    const searchText = document.getElementById('search-field').value;
    // display spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    loadSearchData(searchText);
    document.getElementById('search-field').value = '';
}

// loadData function
const loadSearchData = searchText => {

    // console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)))
}
loadSearchData('phone')


const displayPhone = (phones) => {
    // console.log(phones)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones?.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow p-3 mb-5 bg-body rounded">
            <img style="width:200px;" src="${phone.image} "class="card-img-top img-fluid mx-auto p-3" alt="...">
        <div class="card-body">
            <h5 class="card-title"> Name:${phone.phone_name}</h5>
            <p>Brand:${phone.brand}</p>
            <p>Id:${phone.slug} </p>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto py-3">
             <button onclick="moreInformation('${phone.slug}')" class="btn btn-primary" type="button">More Info</button>
  
        </div>
    </div>
        `;
        searchResult.appendChild(div);
    });
    toggleSpinner('none');
    toggleSearchResult('flex')

}

// load more information
const moreInformation = (Id) => {
    console.log(Id)
    const url = `https://openapi.programming-hero.com/api/phone/${Id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMoreInformation(data.data))



}
// display more information with detele
const displayMoreInformation = (phone) => {
    console.log(phone)
    const moreInfo = document.getElementById('more-info');
    moreInfo.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
<img style="width:200px;" src="${phone.image}" class="card-img-top img-fluid mx-auto p-3" alt="...">
<div class="card-body shadow-lg p-3  bg-body rounded">
    <h5 class="card-title">Name: ${phone.name}</h5>
    <p class="card-text">ReliseDate: ${phone.releaseDate ? phone.releaseDate : 'No Data found'}</p>
    <p>MainFeatures:${phone.mainFeatures.storage}</p>
    <p>Display:${phone.mainFeatures.displaySize}</p>
    <p>Sensors:${phone.mainFeatures.sensors}</p> 
    <p>Memory:${phone.mainFeatures.memory}</p>
    
    <a href="#" class="btn btn-primary ">Go To Buy</a>
</div>
`;
    moreInfo.appendChild(div)

}


