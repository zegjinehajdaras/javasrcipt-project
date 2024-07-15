import { items, itemTypes } from "./documents/items.js";

const header = document.getElementById("artistselectName");
const divContainer = document.querySelector("landing_page-header");
const storedName = localStorage.getItem("selectedArtisstName");
header.textContent = storedName;
// divContainer.appendChild(storedName)
// console.log(items.length)

//
const artistItems = items.filter((item) => item.artist === storedName);
console.log(artistItems);
const soldItems = artistItems.filter((item) => item.dateSold !== null);
function calculateTotalItemsSold(items) {
  return `${soldItems.length}/${items.length}`;
}

function calculateTotalIncome(items) {
  let totalIncome = 0;
  items.forEach((item) => {
    if (item.priceSold) {
      totalIncome += item.priceSold;
    }
  });
  return `$${totalIncome.toFixed(2)}`;
}
document.getElementById("totalItemSold").textContent =
  calculateTotalItemsSold(artistItems);
document.getElementById("totalIncome").textContent =
  calculateTotalIncome(artistItems);

const soldprice = soldItems.map((item) => item.priceSold);
console.log(soldprice);
const labels = soldItems.map((item) => {
  const formatDate = new Date(item.dateSold);
  return formatDate.toDateString();
});
const price = soldItems.map((item) => item.price);

function createChart() {
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Original Price",
          data: price,
          backgroundColor: "#edd5bb",
        },
        {
          label: "Sold Price",
          data: soldprice,
          backgroundColor: "#a16a5e",
        },
      ],
    },
    options: {
      indexAxis: 'y',
      plugins: {
          title: {
              display: true,
              text: 'Display my income for last'
          },
        
      }
  }
  });
}
createChart(artistItems);
