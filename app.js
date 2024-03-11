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
