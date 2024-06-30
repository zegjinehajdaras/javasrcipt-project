//get rtist name from API

const api = "https://jsonplaceholder.typicode.com/users.";

function getArtistName() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => createList(data))
    .catch((error) => console.log(`error`, error));
}

function createList(response) {
  const select= document.getElementById("artistList");
 
  select.innerHTML = '<option>Choose</option>';
  
  for (let i = 0; i < response.length; i++) {
    const option = document.createElement('option')
    option.value = response[i].name;
    option.textContent = response[i].name;
  //  option.classList.add('dropdown-item',)
    select.appendChild(option)
    
  }
//  select.innerHTML = "";
}

const select = document.getElementById("artistList");
select.addEventListener("click", function () {
  getArtistName();
  console.log('clikc')
});
