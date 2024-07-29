<!-- const metadata = { title: "Generate an Array with n elements", tags: ["snipcode", "javascript"] } -->


My way of making a "dummy" array of `n` elements. Define the value of `n`, the length of the array will have the same number as the value of `n`

`explanation.js`
```js
const n = 10;
const generatedArray = Array.from(Array(n).keys()).map((value) => value);
console.log(generatedArray); // Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```


copy the code below to use

`snipcode.js`
```js
Array.from(Array(n).keys()).map((value) => value)
```
