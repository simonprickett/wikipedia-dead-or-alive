const wikipediaDeadOrAlive = require('../index.js');

// Tests soneone who is alive.
test('Justin Bieber, alive...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Justin_Bieber');

  expect(result.name).toBe('Justin Bieber');
  expect(result.dead).toBe(false);
  expect(result.died).toBeNull();
  expect(result.description.length).toBeGreaterThan(0);
});

// Tests someone who is alive, with pronunciation guidance.
test('Barack Obama, alive...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Barack_Obama');

  expect(result.name).toBe('Barack Obama');
  expect(result.dead).toBe(false);
  expect(result.died).toBeNull();
  expect(result.description.length).toBeGreaterThan(0);
});

// Tests someone who is alive, with a stage name.
test('Meek Mill, alive...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Meek_Mill');

  expect(result.name).toBe('Meek Mill');
  expect(result.dead).toBe(false);
  expect(result.died).toBeNull();
  expect(result.description.length).toBeGreaterThan(0);
});

// Tests someone who is dead.
test('Sean Connery, dead...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Sean_Connery');

  expect(result.name).toBe('Sean Connery');
  expect(result.dead).toBe(true);
  expect(result.died).toBe('2020');
  expect(result.description.length).toBeGreaterThan(0);
});

// Tests someone who is dead.
test('Abraham Lincoln, dead...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Abraham_Lincoln');

  expect(result.name).toBe('Abraham Lincoln');
  expect(result.dead).toBe(true);
  expect(result.died).toBe('1865');
  expect(result.description.length).toBeGreaterThan(0);
});

// Tests someone who is dead.
test('Robin Williams, dead...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Robin_Williams');

  expect(result.name).toBe('Robin Williams');
  expect(result.dead).toBe(true);
  expect(result.died).toBe('2014');
  expect(result.description.length).toBeGreaterThan(0);
});

// Tests someone who doesn't have a Wikipedia page.
test('Simon Prickett, not on wikipedia...', () => {
  try {
    expect(wikipediaDeadOrAlive.getStatus('Simon_Prickett')).rejects;
  } catch (e) {}
});

// Test for no pageName provided.
test('pageName is undefined...', () => {
  try {
    expect(wikipediaDeadOrAlive.getStatus()).rejects;
  } catch (e) {}
});

// Test for zero length pageName.
test('pageName is an empty string...', () => {
  try {
    expect(wikipediaDeadOrAlive.getStatus('')).rejects;
  } catch (e) {}
});