const wikipediaDeadOrAlive = require('../index.js');

// Tests someone who is alive.
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

// Tests someone with Jr. in their name.
test('Nile Rodgers, alive...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Nile_Rodgers');

  expect(result.name).toBe('Nile Rodgers');
  expect(result.dead).toBe(false);
  expect(result.died).toBeNull();
  expect(result.description.length).toBeGreaterThan(0);
});

// Tests someone with Sr. in their name.
test('Robert Downey Sr., alive...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Robert_Downey_Sr.');

  expect(result.name).toBe('Robert Downey Sr.');
  expect(result.dead).toBe(false);
  expect(result.died).toBeNull();
  expect(result.description.length).toBeGreaterThan(0);
});

// Tests someone who doesn't have a Wikipedia page.
test('Simon Prickett, not on wikipedia...', async () => {
  expect.assertions(1);
  await expect(wikipediaDeadOrAlive.getStatus('Simon_Prickett')).rejects.toThrow('No extract: Page doesn\'t exist, or wrong type of page!');
});

// Tests for trailing space after name in description.
test('Lisa Lopes, for for trailing space after name in description...', async () => {
  const result = await wikipediaDeadOrAlive.getStatus('Lisa_Lopes');

  expect(result.name).toBe('Lisa Lopes');
  expect(result.dead).toBe(true);
  expect(result.died).toBe('2002');
  expect(result.description.length).toBeGreaterThan(0);
  expect(result.description.startsWith('Lisa Nicole Lopes,')).toBe(true);
});
// Test for no pageName provided.
test('pageName is undefined...', async () => {
  expect.assertions(1);
  await expect(wikipediaDeadOrAlive.getStatus()).rejects.toThrow('pageName not provided!');
});

// Test for zero length pageName.
test('pageName is an empty string...', async () => {
  expect.assertions(1);
  await expect(wikipediaDeadOrAlive.getStatus('')).rejects.toThrow('pageName not provided!');
});
