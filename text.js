const numbers = [1, 2, 3, 4, 5];
const array = [];
numbers.some(num => num >= 3) ? array.push('num') : null;

console.log(array);
