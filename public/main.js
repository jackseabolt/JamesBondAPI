'use strict'; 

function handleFormSubmit(){ 
    $('#js-form').on('submit', (event) => {
        event.preventDefault()
        const userInput = $('#js-input').val()
        $('js-input').val(''); 
        getDataFromDatabase(userInput, displayData); 
    })
}

function getDataFromDatabase(userInput, callback){
    $.getJSON('http://localhost:8080/james-bond-api/characters/', {}, callback)
}

function displayData(data){
    console.log(data)
    const dataArray = []; 
    data.forEach(character => {
        dataArray.push(
            `<div class="character-container">
                <h5>${character.firstName} ${character.lastName}</h5>
            </div>`
        ); 
    }); 
    console.log(displayData); 
    const displayString = dataArray.join(''); 
    $('#js-results').html(displayString); 

}

// -------------------------------------- 

function main(){
    handleFormSubmit(); 
}

$(main)