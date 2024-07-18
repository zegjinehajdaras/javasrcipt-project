//get rtist name from API

const api = 'https://jsonplaceholder.typicode.com/users.';

function getArtistName() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => createList(data))
    .catch((error) => console.log(`error`, error));
}

function createList(response) {
  const select = document.getElementById('artistList');
  const artistName = []; // emrin e kesaj beje const allArtistsNames = []
  select.innerHTML = '<option>Choose</option>';

  for (let i = 0; i < response.length; i++) {
    const option = document.createElement('option');

    // kete variablin ketu e ke te padeklaruar, shkruaj :
    // let artistName = response[i].name - beji emrat e variablave me te dallueshme qe mos ngaterrohesh
    artistNames = response[i].name;
    artistName.push(artistNames); // dhe ketu behet allArtistsNames.push(artistName)
    option.value = artistNames;
    option.textContent = artistNames;
    select.appendChild(option);
    // option.appendChild(listitem)
  }
  localStorage.setItem('artistNames', JSON.stringify(artistName));
}

const select = document.getElementById('artistList');
select.addEventListener('click', function () {
  getArtistName();
  const selectArtist = this.value; //ketu mund te perdoresh event.target.value
  if (selectArtist !== 'Choose') {
    localStorage.setItem('selectedArtisstName', selectArtist);
    redirectToPage(selectArtist);
  }
});
function redirectToPage(artistName) {
  window.location.href = `artist_home.html?artist=${encodeURIComponent(
    artistName
  )}`;
}
