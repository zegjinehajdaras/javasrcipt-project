const items = JSON.parse(localStorage.getItem("items"));
const itemTypes = ["painting", "sculpture", "digital", "custom"];
// console.log(items,itemTypes)
function createCradItem(items) {
  const divContainer = document.getElementById("panitingContainer");
  divContainer.innerHTML = "";
  const publishItem = items.filter((item) => item.isPublished === true);
  divContainer.innerHTML = "";
  publishItem.forEach((item, i) => {
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
  option.value = "choose";
  option.textContent = name;
  artistName.appendChild(option);
});

//create filter function

const btn = document.getElementById("filterPictureModal");
btn.addEventListener("click", function () {

    const itemtitle = document.getElementById("itemTitle").value.toLowerCase();
     const artistselection = document.getElementById('artistList').value;
    console.log(artistselection)
    const filterCards = items.filter((item) =>{
     const filterBytitle =item.title.toLowerCase().includes(itemtitle);
    
  return filterBytitle
  
    } )

  

  createCradItem(filterCards);
});
createCradItem(items);
