type Sum = (a: number, b: number) => number;

const sum: Sum = (a, b) => a + b;

describe('Check summator', () => {
  it('get sum', () => {
    const result = sum(40, 2);

    expect(result).toEqual(42);
  });
});
