fetch('http://localhost:3000/shopping-list')
    .then(response => response.json())
    .then(data => console.log(data));