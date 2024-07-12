import { items,itemTypes } from "./documents/items.js";

const header = document.getElementById('artistselectName')
const divContainer = document.querySelector('landing_page-header')
const storedName = localStorage.getItem('selectedArtisstName')
header.textContent = storedName;
// divContainer.appendChild(storedName)
// console.log(items.length)

//
const artistItems = items.filter(item => item.artist === storedName);
console.log(artistItems)
function calculateTotalItemsSold(items) {
    const soldItems = items.filter(item => item.dateSold !== null);
    return `${soldItems.length}/${items.length}`;
   
}


function calculateTotalIncome(items) {
    let totalIncome = 0;
    items.forEach(item => {
        if (item.priceSold) {
            totalIncome += item.priceSold;
        }
    });
    return `$${totalIncome.toFixed(2)}`;
}
document.getElementById('totalItemSold').textContent = calculateTotalItemsSold(artistItems);
document.getElementById('totalIncome').textContent = calculateTotalIncome(artistItems);



function createChart(){
    const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],//income
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
}
createChart(artistItems)