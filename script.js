//get artist name from API

const api = "https://jsonplaceholder.typicode.com/users.";

function getArtistName() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => createList(data))
    .catch((error) => console.log(`error`, error));
   
}

function createList(response) {
  const select= document.getElementById("artistList");
 const allArtistName = []
  select.innerHTML = '<option>Choose</option>';
  
  for (let i = 0; i < response.length; i++) {
    const option = document.createElement('option')

   let artistNames = response[i].name
    allArtistName.push(artistNames)
    option.value = artistNames
  option.textContent = artistNames
    select.appendChild(option)
   
    
  }
  localStorage.setItem('artistNames', JSON.stringify(artistName));
}

const select = document.getElementById("artistList");
select.addEventListener("click", function () {
  getArtistName();
  const selectArtist = this.value
  if(selectArtist !== 'Choose'){
     localStorage.setItem('selectedArtisstName',selectArtist)
     redirectToPage(selectArtist);
  }
 


});
function redirectToPage(artistName) {
  window.location.href = `artist_home.html?artist=${encodeURIComponent(artistName)}`;
}