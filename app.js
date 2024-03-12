// Represents a dinosaur or a human with various attributes
export class Dino {
  constructor({ species, weight, height, diet, where, when, fact }) {
    this.image = `images/${species.toLowerCase()}.png`; // Image path based on species
    this.species = species;
    this.weight = weight; // in lbs
    this.height = height; // in inches
    this.diet = diet;
    this.where = where; // Geographic location
    this.when = when; // Time period
    this.fact = fact; // Interesting fact
  }

  // Compares the weight of a Dino object with a given weight
  compareWeight(yourWeight) {
    const diff = Math.abs(this.weight - yourWeight);
    return this.weight > yourWeight
      ? `${this.species} was ${diff} lbs heavier than you!`
      : `${this.species} was ${diff} lbs lighter than you!`;
  }

  // Compares the height of a Dino object with a given height
  compareHeight(yourHeight) {
    const diff = Math.abs(this.height - yourHeight);
    return this.height > yourHeight
      ? `${this.species} was ${diff} inches taller than you!`
      : `${this.species} was ${diff} inches shorter than you!`;
  }

  // Compares the diet of a Dino object with a given diet
  compareDiet(yourDiet) {
    if (yourDiet.toLowerCase() === this.diet.toLowerCase()) {
      return `${this.species} is a ${this.diet}. You both eat the same things!`;
    } else if (this.diet.toLowerCase() === 'carnivor') {
      return `${this.species} is a ${this.diet}. It could eat you!`;
    } else if (this.diet.toLowerCase() === 'herbavor') {
      return `${this.species} is a ${this.diet}. It only eats leafy things!`;
    } else {
      return `${this.species} is a ${this.diet}. Let's have a feast!`;
    }
  }
}

let dinos = []; // Stores Dino objects

// Default human object, acting as a Dino object for comparison purposes
let human = new Dino({
  species: 'human',
  weight: 150,
  height: 66,
  diet: 'omnivor',
  where: 'World Wide',
  when: 'The Modern Age',
  fact: 'Humans are the original software that updates itself!',
});

// Asynchronously load Dino data from a JSON file and populate the dinos array
if (typeof document !== 'undefined') {
  fetch('./dino.json')
    .then((response) => response.json())
    .then((data) => {
      dinos = data.Dinos.map((dinoData) => new Dino(dinoData));

      // Add human to middle of Dinos array
      dinos.splice(4, 0, human); // Inserts the human object into the middle of the Dinos array
    })
    .catch((error) => console.error('Error fetching JSON:', error));
}

// Updates the human object properties based on form inputs
if (typeof document !== 'undefined') {
  document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Retrieves and validates form inputs
    const name = document.getElementById('name').value.trim();
    const feet = parseInt(document.getElementById('feet').value);
    const inches = parseInt(document.getElementById('inches').value);
    const weight = parseInt(document.getElementById('weight').value);
    const diet = document.getElementById('diet').value;
    const validationResult = validateForm(name, feet, inches, weight, diet);

    if (!validationResult.isValid) {
      alert(validationResult.errors.join('\n')); // Displays validation errors
      return; // Exits the function if validation fails
    }

    // Updates the human object with form data
    human.name = name;
    human.height = feet * 12 + inches;
    human.weight = weight;
    human.diet = diet;

    generateGrid(dinos); // Generates the grid display

    document.getElementById('dino-compare').style.display = 'none'; // Hides the form

    // Enables clicking on the header to reload the page
    document.getElementById('dinosaursHeader').classList.add('clickable');
    document
      .getElementById('dinosaursHeader')
      .addEventListener('click', function () {
        window.location.reload();
      });
  });
}

// Utility function to generate a random integer within a range
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Selects a random fact about a Dino object
function getRandomFact(dino, human) {
  const facts = [
    () => dino.compareHeight(human.height),
    () => dino.compareWeight(human.weight),
    () => dino.compareDiet(human.diet),
    `The ${dino.species} lived in what is now ${dino.where}.`,
    `The ${dino.species} was found in the ${dino.when}.`,
    dino.fact,
  ];

  // Generate a random index
  const randomIndex = getRandomInt(facts.length);

  // If the selected fact is a function, invoke it; otherwise, return the string
  const result =
    typeof facts[randomIndex] === 'function'
      ? facts[randomIndex]()
      : facts[randomIndex];

  return result;
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
    //fact.innerHTML = dino.fact;
  } else if (dino.species === 'Pigeon') {
    title.innerHTML = dino.species;
    fact.innerHTML = dino.fact;
  } else {
    title.innerHTML = dino.species;
    fact.innerHTML = getRandomFact(dino, human);
  }

  containerDiv.appendChild(title);
  containerDiv.appendChild(img);
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
