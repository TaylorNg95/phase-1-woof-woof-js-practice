const baseURL = 'http://localhost:3000/pups/'
let goodStatus = true
let allDogs = []

document.addEventListener('DOMContentLoaded', function(){
    fetchData()
})

function fetchData(){
    fetch(baseURL)
    .then(response => response.json())
    .then(data => {
        data.forEach(dog => {
            renderDogs(dog)
            allDogs.push(dog)
        })
        addFilterFunctionality()
    })
}

function renderDogs(dog){
    const dogBar = document.querySelector('#dog-bar')
    const span = document.createElement('span')
    span.textContent = dog.name
    span.addEventListener('click', function(){
        showDetails(dog)
    })
    dogBar.appendChild(span)
}

function showDetails(dog){
    clearDetails()
    const img = document.createElement('img')
    img.src = dog.image
    const h2 = document.createElement('h2')
    h2.textContent = dog.name
    const btn = document.createElement('button')
    btn.dataset.id = dog.id
    if(dog.isGoodDog === true){
        btn.textContent = 'Good Dog!'
    } else {
        btn.textContent = 'Bad Dog!'
    }
    btn.addEventListener('click', function(e){
        toggleGoodStatus(e)
        updateDog(e)
    })
    document.querySelector('#dog-info').append(img, h2, btn)
}

function clearDogNames(){
    document.querySelector('#dog-bar').innerHTML = ''
}

function clearDetails(){
    document.querySelector('#dog-info').innerHTML = ''
}

function toggleGoodStatus(e){
    if (e.target.textContent === 'Good Dog!'){
        e.target.textContent = 'Bad Dog!'
        goodStatus = false
    } else {
        e.target.textContent = 'Good Dog!'
        goodStatus = true
    }
}

function updateDog(e){
    fetch(`${baseURL}${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: goodStatus
        })
    })
}

function addFilterFunctionality(){
    document.querySelector('#good-dog-filter').addEventListener('click', function(e){
        if(e.target.textContent === 'Filter good dogs: OFF'){
            e.target.textContent = 'Filter good dogs: ON'
            clearDogNames()
            const goodDogs = allDogs.filter(dog => dog.isGoodDog === true)
            goodDogs.forEach(dog => {
                renderDogs(dog)
            })
        } else {
            e.target.textContent = 'Filter good dogs: OFF'
            clearDogNames()
            allDogs.forEach(dog => {
                renderDogs(dog)
            })
        }
    })
}