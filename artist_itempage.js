const header = document.getElementById("artistselectName");
const divContainer = document.querySelector("landing_page-header");
const storedName = localStorage.getItem("selectedArtisstName");
header.textContent = storedName;

//create card for selected artist

const cardcont = document.getElementById("cardContainer");
let items = JSON.parse(localStorage.getItem("items")) || [];
const artistItems = items.filter((item) => item.artist === storedName);
const sotredartistItems = localStorage.setItem(
  "artistItems",
  JSON.stringify(artistItems)
);

function createCards() {
  cardcont.innerHTML = "";
  artistItems.forEach((item, i) => {
    const date = new Date(item.dateCreated); // Convert to Date object
    const formattedDate = date.toLocaleDateString("en-US");

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
      <h4class="card-title">${formattedDate}</h4>
<br>
      <h4class="card-title">${item.title}</h4>
      <p class="card-text">${item.description}.</p>
    </div>
     <div class="card-body ${textColor}">
                   <button class="btn edit-button" data-bs-toggle="modal" data-bs-target="#cardModal">Edit</button>
                    <button class=" btn remove-button">Remove</button>
                    <button class="btn  toggle-button">${
                      item.isPublished ? "Unpublish" : "Publish"
                    }</button>
                </div>
  </div>`;
    cardcont.appendChild(cardContainer);
    //pubish ,unpublish picture by artist
    const toggleButton = cardContainer.querySelector(".toggle-button");
    toggleButton.addEventListener("click", () => {
      item.isPublished = !item.isPublished;
      localStorage.setItem("items", JSON.stringify(items));
      toggleButton.textContent = item.isPublished ? "Unpublish" : "Publish";
    });

    //remove card
    const removeButton = cardContainer.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
      if (confirm("Do you want to remove this card")) {
        items = items.filter((element) => element.id !== item.id);
        localStorage.setItem("items", JSON.stringify(items));
        cardContainer.remove();
      }
    });
//edit card
    const editButton = cardContainer.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
      currentMode = "edit";
      currentItemId = item.id;
      // console.log(currentItemId)
      openModal("edit", item);
    });
  });

  // Handle add new item
  const addNewButton = document.getElementById("add_NewItemBtn");
  addNewButton.addEventListener("click", () => {
    currentMode = "add";
    currentItemId = null;
    openModal("add");
  });
}
//delcare a function to open edit or add modal
let currentMode = "add"; 
let currentItemId = null;
function openModal(mode, item) {
  const modaltittle = document.getElementById("itemModalLabel");
  const btnadd = document.getElementById("addNewItemBtn");
  if (mode === "edit") {
    modaltittle.textContent = "Edit Card";
    btnadd.textContent = "Save Edit";
    document.getElementById("picture-title").value = item.title;
    document.getElementById("picture-description").value = item.description;
    document.getElementById("picture-type").value = item.type;
    document.getElementById("picture-image").value = item.image;
    document.getElementById("picture-price").value = item.price;
    document.getElementById("isPublished").checked = item.isPublished;
  } else {
    modaltittle.textContent = "Add new Item";
    btnadd.textContent = "Add new Item";
    document.getElementById("addeditForm").reset();
  }
}

document.getElementById("addNewItemBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const titleinput = document.getElementById('picture-title').value;
  const descinput = document.getElementById('picture-description').value;
  //kete type beje select dhe perdor itemTypes array qe e ke tek documents folder => items.js, mos e ler text input
  const type = document.getElementById('picture-type').value;
  const imageinput = document.getElementById('picture-image').value;
  const priceinput = document.getElementById('picture-price').value;
  const isPublishedCheckbox = document.getElementById('isPublished').checked;

  if (currentMode === 'edit') {
    const item = items.find((item) => item.id === currentItemId);
    item.title = titleinput;
    item.description = descinput;
    item.type = type;
    item.image = imageinput;
    item.price = priceinput;
    item.isPublished = isPublishedCheckbox;
  } else {
    const newItem = {
      id: items.length + 1,
      title: titleinput,
      description: descinput,
      image: imageinput,
      price: priceinput,
      artist: storedName,
      dateCreated: new Date().toISOString(),
      isPublished: isPublishedCheckbox,
      dateSold: null,
      priceSold: null,
      type: type,
    };
    items.push(newItem);
  }

  localStorage.setItem('items', JSON.stringify(items));
  createCards();
  //pervecse ben reset form, bej dhe mbylljen automatikisht te modalit edit dhe add pasi kryen keto veprimet per ux me te mire
  document.getElementById('addeditForm').reset();
});
createCards();

