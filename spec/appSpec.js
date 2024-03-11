import { validateForm } from '../app.js';

// Test form validation
describe('Form Validation', () => {
  it('passes with valid input', () => {
    // valid input
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
    // invalid input
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
