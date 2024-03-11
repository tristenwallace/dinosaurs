// Async load dinos data
fetch('./dino.json')
  .then(response => response.json())
  .then(data => {
    const Dinos = data.Dinos;
    console.log(Dinos);
    // You can now use your Dinos array as needed
  })
  .catch(error => console.error('Error fetching JSON:', error));