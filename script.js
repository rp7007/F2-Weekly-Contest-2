// Function to fetch the data from the API
function fetchData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    
    // Using .then
    fetch(url)
      .then(response => response.json())
      .then(data => renderTable(data))
      .catch(error => console.log(error));
  
    // Using async/await
    /*async function getData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        renderTable(data);
      } catch (error) {
        console.log(error);
      }
    }
    
    getData();*/
  }
  
  // Function to render the table with data
  function renderTable(data) {
    const tableBody = document.getElementById('coinTableBody');
    tableBody.innerHTML = '';
  
    data.forEach(coin => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${coin.name}</td>
        <td>${coin.id}</td>
        <td><img src="${coin.image}" alt="${coin.name}" width="30" height="30"></td>
        <td>${coin.symbol}</td>
        <td>$${coin.current_price}</td>
        <td>$${coin.total_volume}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to filter the data based on user input
  function filterData() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('coinTable');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 0; i < rows.length; i++) {
        const nameColumn = rows[i].getElementsByTagName('td')[0];
        const idColumn = rows[i].getElementsByTagName('td')[1];
        const symbolColumn = rows[i].getElementsByTagName('td')[3];
    
        if (nameColumn || idColumn || symbolColumn) {
          const nameValue = nameColumn.textContent || nameColumn.innerText;
          const idValue = idColumn.textContent || idColumn.innerText;
          const symbolValue = symbolColumn.textContent || symbolColumn.innerText;
    
          if (
            nameValue.toLowerCase().indexOf(filter) > -1 ||
            idValue.toLowerCase().indexOf(filter) > -1 ||
            symbolValue.toLowerCase().indexOf(filter) > -1
          ) {
            rows[i].style.display = '';
          } else {
            rows[i].style.display = 'none';
          }
        }
      }
    }
    
    // Function to sort the data based on market cap or percentage change
    function sortData(sortBy) {
      const table = document.getElementById('coinTable');
      const rows = Array.from(table.rows).slice(1); // Exclude table header row
      let sortingFunction;
    
      switch (sortBy) {
        case 'marketCap':
          sortingFunction = (a, b) => parseFloat(a.cells[4].textContent) - parseFloat(b.cells[4].textContent);
          break;
        case 'percentageChange':
          sortingFunction = (a, b) => parseFloat(a.cells[5].textContent) - parseFloat(b.cells[5].textContent);
          break;
        default:
          return;
      }
    
      rows.sort(sortingFunction);
    
      // Remove existing table rows
      for (let i = rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
      }
    
      // Append sorted rows to the table
      rows.forEach(row => {
        table.appendChild(row);
      });
    }
    
    // Fetch data and render the table
    fetchData();
    
  
