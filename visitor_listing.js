if (!localStorage.getItem("artistNames")) {
    localStorage.setItem("artistNames", JSON.stringify(["Leanne Graham","Ervin Howell","Clementine Bauch","Patricia Lebsack","Chelsey Dietrich","Mrs. Dennis Schulist","Kurtis Weissnat","Nicholas Runolfsdottir V","Glenna Reichert","Clementina DuBuque"]));
}
const items = JSON.parse(localStorage.getItem("items"))||[];
const itemTypes = ["painting", "sculpture", "digital", "custom"];
function createCradItem(items) {
  const divContainer = document.getElementById("panitingContainer");
  divContainer.innerHTML = "";

  divContainer.innerHTML = "";
  items.forEach((item, i) => {
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "col col-lg-4");
    let bgClass = "";
    let textColor = "";
    let pricebg = "";
    let pricetext = "";
    if (i % 2 === 0) {
      bgClass = "bg_even";
      textColor = "text_even";
      pricebg = "priceeven";
      pricetext = "pricetexteven";
    } else {
      bgClass = "bg_odd";
      textColor = "text_odd";
      pricebg = "priceodd";
      pricetext = "pricetextodd";
    }
    cardContainer.innerHTML = `<div class="card mb-3 ${bgClass}">
    <img src="${item.image}" class="card-img-top" alt="cardimage">
    <div class="card-body d-flex   justify-content-between">
      <h5 class="card-title artistName ${textColor}">${item.artist}</h5>
      <h5 class="card-text p-3 ${pricebg} ${pricetext}"> $ ${item.price}</h5>
      </div>
       <div class="card-body ${textColor}">
      <h4class="card-title">${item.title}</h4>
      <p class="card-text">${item.description}</p>
    </div>
  </div>`;
    divContainer.appendChild(cardContainer);
  });
}



//get value from html
const itemTitle = document.getElementById("itemTitle").value.toLowerCase();
const artistName = document.getElementById("artistList");
const minPrice = document.getElementById("minprice").value;
const maxPrice = document.getElementById("minprice").value;
const typeOfPicture = document.getElementById("typeofpicture");

//populate choose option with name of artist and other with type of picture
typeOfPicture.innerHTML = "<option>Choose</option>";
itemTypes.forEach((type) => {
  const option = document.createElement("option");
  option.textContent = type;
  typeOfPicture.appendChild(option);
});
//get name of artist from localstorage and populate option
artistName.innerHTML = "<option>Choose</option>";
const nameofArtist = JSON.parse(localStorage.getItem("artistNames"));
nameofArtist.forEach((name) => {
  const option = document.createElement("option");
  option.textContent = name;
  artistName.appendChild(option);
});

//create filter function

const btn = document.getElementById("filterPictureModal");
btn.addEventListener("click", function () {
  const itemTitle = document.getElementById("itemTitle").value.trim().toLowerCase();
    const artistSelection = document.getElementById("artistList").value;
    const minPrice = parseFloat(document.getElementById("minprice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxprice").value) || Infinity;
    const typeSelection = document.getElementById("typeofpicture").value;

    const publishItem = items.filter((item) => item.isPublished === true );
    const filterCards = publishItem.filter((item) => {
      const filterByTitle = item.title.trim().toLowerCase().includes(itemTitle);
      const filterByArtist = artistSelection === "Choose" || item.artist === artistSelection;
      const filterByPrice = item.price >= minPrice && item.price <= maxPrice;
      const filterByType = typeSelection === "Choose" || item.type === typeSelection;
      return filterByTitle && filterByArtist && filterByPrice && filterByType;
 
  })
 

  createCradItem(filterCards);
});
createCradItem(items.filter((item) => item.isPublished === true ));
