document.addEventListener('DOMContentLoaded', () => {
    getTable()
    updateDog()
})


    
function editHandler(dog) {
    let nameInput = document.querySelector('#name');
    let breedInput = document.querySelector('#breed');
    let sexInput = document.querySelector('#sex');
    document.querySelector('#dog-form').setAttribute('data-id', `${dog.id}`);
    nameInput.value = dog.name;
    breedInput.value = dog.breed;
    sexInput.value = dog.sex;   

}

function updateDog() {
    let dogForm = document.querySelector('#dog-form');
    let dogTable = document.querySelector("tbody");
   
    dogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let updNameInput = document.querySelector('#name').value;
        let updBreedInput = document.querySelector('#breed').value;
        let updSexInput = document.querySelector('#sex').value;
    
        fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`,{
            method: "PATCH",
            headers: {
            'Content-Type':"application/json"
            },
            body: JSON.stringify(
            {   name: updNameInput,
                breed: updBreedInput,
                sex: updSexInput
            })
        })
        dogForm.reset();
        dogTable.innerHTML = "";
        getTable(); 
    })

}

function getTable() {

    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then((dogs) => {
            dogs.forEach(dog => {
            renderTable(dog)
            document.querySelector(`#edit${dog.id}`).addEventListener('click', () => { 
                editHandler(dog)
            })
        });        
    })
};

function renderTable(dog) {
    let dogName = dog.name;
    let dogBreed = dog.breed;
    let dogSex = dog.sex;
    let editTxt = 'Edit Dog';
    let btnId = "edit"+`${dog.id}`
    

    let row = document.createElement('tr') 
    row.innerHTML = `
            <td>${dogName}</td>
            <td>${dogBreed}</td>
            <td>${dogSex}</td>
            <td>
            <button id = ${btnId} data-id = ${dog.id}> ${editTxt} </button>
            </td>
    `
    document.querySelector('#table-body').append(row);
}