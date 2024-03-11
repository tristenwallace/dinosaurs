// Dinos Constructor
class Dino {
  constructor({ species, weight, height, diet, where, when, fact }) {
    this.image = `images/${species.toLowerCase()}.png`;
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

let dinos = [];

// Define default human object
let human = new Dino({
  species: 'human',
  weight: 150,
  height: 66,
  diet: 'omnivor',
  where: 'World Wide',
  when: 'The Modern Age',
  fact: 'Humans are the original software that updates itself!',
});

// Async load dinos data
if (typeof document !== 'undefined') {
  fetch('./dino.json')
    .then((response) => response.json())
    .then((data) => {
      dinos = data.Dinos.map((dinoData) => new Dino(dinoData));

      // Add human to middle of Dinos array
      dinos.splice(4, 0, human);
      console.log(dinos);
    })
    .catch((error) => console.error('Error fetching JSON:', error));
}

// Update human object based on form inputs
// check if in browser
if (typeof document !== 'undefined') {
  document.getElementById('btn').addEventListener('click', (e) => {
    console.log('Form submitted');
    e.preventDefault(); // Prevent the default form submission

    // Get form inputs
    const name = document.getElementById('name').value.trim();
    const feet = parseInt(document.getElementById('feet').value);
    const inches = parseInt(document.getElementById('inches').value);
    const weight = parseInt(document.getElementById('weight').value);
    const diet = document.getElementById('diet').value;

    // Validation checks
    const validationResult = validateForm(name, feet, inches, weight, diet);

    if (!validationResult.isValid) {
      // Handle failed validation
      // Display validation messages to the user
      alert(validationResult.errors.join('\n'));
      return; // Stop further execution
    }

    // Update human object properties
    human.name = name;
    human.height = feet * 12 + inches; // Convert height to inches and update
    human.weight = weight; // Update weight
    human.diet = diet.toLowerCase(); // Update diet

    generateGrid(dinos);

    // Hide form
    document.getElementById('dino-compare').style.display = 'none';

    // Make header link to home
    document.getElementById('dinosaursHeader').classList.add('clickable');
    document.getElementById('dinosaursHeader').addEventListener('click', function() {
      window.location.reload();
    });
  });
}


// Generate Grid
export function generateGrid(dinos) {

  const grid = document.getElementById('grid');
  
  // Hide grid (hide/change/show pattern)
  grid.style.display = 'none';

  // Add grid items
  const tiles = dinos.map(generateTile);
  tiles.forEach((tile) => grid.appendChild(tile));

  //Reshow grid
  grid.style.display = 'flex';
}

// Generate Tile for mapping
export function generateTile(dino) {

  const documentFragment = document.createDocumentFragment(); 
  const containerDiv = document.createElement('div');
  
  containerDiv.className = 'grid-item';

  const title = document.createElement('h3');
  const fact = document.createElement('p');
  const img = document.createElement('img');
  img.src = dino.image;

  if (dino.species === 'human') {
    title.innerHTML = human.name;
    fact.innerHTML = dino.fact;
  } else if (dino.species === 'Pigeon') {
    title.innerHTML = dino.species;
    fact.innerHTML = dino.fact;
  } else {
    title.innerHTML = dino.species;
    fact.innerHTML = dino.fact; // Update this after creating comparison methods
  }

  containerDiv.appendChild(title);
  containerDiv.appendChild(img)
  containerDiv.appendChild(fact);
  documentFragment.appendChild(containerDiv);
  
  return documentFragment;
}

// Form Validation Checks
export function validateForm(name, feet, inches, weight, diet) {
  let validationPassed = true;
  let validationMessages = [];

  if (!name) {
    validationPassed = false;
    validationMessages.push('Name is required.');
  }
  if (isNaN(feet) || feet <= 0) {
    validationPassed = false;
    validationMessages.push('Please enter a valid number of feet.');
  }
  if (isNaN(inches) || inches < 0 || inches >= 12) {
    validationPassed = false;
    validationMessages.push('Inches must be between 0 and 11.');
  }
  if (isNaN(weight) || weight <= 0) {
    validationPassed = false;
    validationMessages.push('Please enter a valid weight.');
  }
  if (!diet) {
    validationPassed = false;
    validationMessages.push('Diet selection is required.');
  }

  return {
    isValid: validationPassed,
    errors: validationMessages,
  };
}
