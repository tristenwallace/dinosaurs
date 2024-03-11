// Dinos Constructor
class Dino {
  constructor({ species, weight, height, diet, where, when, fact }) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

// Async load dinos data
fetch('./dino.json')
  .then((response) => response.json())
  .then((data) => {
    const Dinos = data.Dinos.map((dinoData) => new Dino(dinoData));
    console.log(Dinos);
  })
  .catch((error) => console.error('Error fetching JSON:', error));

// Define default human object
let human = new Dino({
  species: 'Homo Sapien',
  weight: 150,
  height: 66,
  diet: 'omnivor',
  where: 'World Wide',
  when: 'The Modern Age',
  fact: 'Humans: the original software that can update itself, proving you can teach an old brain new tricks!',
});

// Update human object based on form inputs
document.getElementById('btn').addEventListener('click', (e) => {
  console.log('Form submitted');
  e.preventDefault(); // Prevent the default form submission

  // Get form inputs
  const name = document.getElementById('name').value;
  const feet = parseInt(document.getElementById('feet').value);
  const inches = parseInt(document.getElementById('inches').value);
  const weight = parseInt(document.getElementById('weight').value);
  const diet = document.getElementById('diet').value;

  // Update human object properties
  human.name = name;
  human.height = feet * 12 + inches; // Convert height to inches and update
  human.weight = weight; // Update weight
  human.diet = diet.toLowerCase(); // Update diet

  console.log(human);
});
