import { Dino, validateForm } from '../app.js';

// Test form validation
describe('Form Validation', () => {
  it('passes with valid input', () => {
    // Test: valid form input
    const name = 'John Doe';
    const feet = 5; // Assume an average height
    const inches = 10; // Additional height in inches
    const weight = 150; // An average weight
    const diet = 'omnivor'; // A common dietary preference

    const result = validateForm(name, feet, inches, weight, diet);

    expect(result.isValid).toBeTrue();
    expect(result.errors.length).toEqual(0);
  });

  it('fails with invalid input', () => {
    // Test: invalid form input
    const name = ''; // Missing name
    const feet = -1; // Invalid feet
    const inches = 12; // Inches should be less than 12
    const weight = 0; // Invalid weight
    const diet = ''; // Missing diet

    const result = validateForm(name, feet, inches, weight, diet);

    expect(result.isValid).toBeFalse();
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors).toContain('Name is required.');
    expect(result.errors).toContain('Please enter a valid number of feet.');
    expect(result.errors).toContain('Inches must be between 0 and 11.');
    expect(result.errors).toContain('Please enter a valid weight.');
    expect(result.errors).toContain('Diet selection is required.');
  });
});


// Test Dino comparison methods
describe('Dino Class', () => {
  // Create a Dino instance
  const dino = new Dino({
    "species": "Triceratops",
    "weight": 13000,
    "height": 114,
    "diet": "herbavor",
    "where": "North America",
    "when": "Late Cretaceous",
    "fact": "First discovered in 1889 by Othniel Charles Marsh"
  });
  
  it('should correctly compare the dinosaur weight with the human weight', () => {
    // Test: Human weighs less
    let result = dino.compareWeight(150);
    expect(result).toBe('Triceratops was 12850 lbs heavier than you!');

    // Test: Human weighs more
    result = dino.compareWeight(14000);
    expect(result).toBe('Triceratops was 1000 lbs lighter than you!');
  });

  it('should correctly compare the dinosaur height with the human height', () => {
    // Test: Human is shorter
    let result = dino.compareHeight(66); // Assuming 66 inches is the human height
    expect(result).toBe('Triceratops was 48 inches taller than you!');

    // Test: Human is taller
    result = dino.compareHeight(400);
    expect(result).toBe('Triceratops was 286 inches shorter than you!');
  });

  it('should correctly compare the dinosaur diet with the human diet', () => {
    // Test: Same diet
    let result = dino.compareDiet('herbavor');
    expect(result).toBe('Triceratops is a herbavor. You both eat the same things!');

    // Test: Different diet
    result = dino.compareDiet('carnivor');
    expect(result).toBe('Triceratops is a herbavor. It only eats leafy things!');
});
});