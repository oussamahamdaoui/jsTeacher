const Responce = require('../src/Responce');

test('test simple values', () => {
  const responce = {
    a: 'hello',
    b: 1,
    d: [1, 2, 3],
  };

  const toBe = {
    a: 'hello',
    b: 1,
    d: [1, 2, 3],
  };

  const resp = new Responce(responce);
  expect(resp.equqls(toBe)).toBe(true);
});

test('test empty object', () => {
  const responce = {
  };

  const toBe = {
    x: 5,
  };

  const resp = new Responce(toBe);
  expect(resp.equqls(responce)).toBe(false);
});


test('test object', () => {
  const responce = {
    d: {
      a: 1,
    },
  };

  const toBe = {
    d: {
      a: 1,
    },
  };

  const resp = new Responce(responce);
  expect(resp.equqls(toBe)).toBe(true);
});


test('test function', () => {
  const responce = {
    d: (a, b) => a + b,
  };

  const toBe = {
    d: f => [f(1, 2), 3],
  };

  const resp = new Responce(toBe);
  expect(resp.equqls(responce)).toBe(true);
});

test('test function complexe', () => {
  const responce = {
    d: (a, b) => ({ a, b }),
  };

  const toBe = {
    d: f => [[f(1, 2), {
      a: 1,
      b: 2,
    }]],
  };

  const resp = new Responce(toBe);
  expect(resp.equqls(responce)).toBe(true);
});

test('test class', () => {
  const responce = {
    animal: class animal {
      constructor(name, type) {
        this.name = name;
        this.type = type;
      }

      toString() {
        return `My name is ${this.name} and I am a ${this.type}`;
      }
    },
  };

  const toBe = {
    animal: F => [
      [new F('oussama', 'chien').toString(), 'My name is oussama and I am a chien'],
    ],
  };

  const resp = new Responce(toBe);
  expect(resp.equqls(responce)).toBe(true);
});
