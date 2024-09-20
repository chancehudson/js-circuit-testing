import { Num2Bits } from "./circomlib/bitify.mjs";
import { SafeLessThan } from "./zk-kit/safe-comparators.mjs";

// console.log(Num2Bits({ n: 8n }, { v: 100n }));

// find a counter example for the SafeLessThan component
{
  const n = 8n;
  const expected = 0n;
  const in1 = 2n ** 9n;
  // Here we're fixing the second input value as 512 and
  // checking input values that are greater than the second input
  //
  // We're looking for an example that returns the incorrect value
  for (let x = 1000; x < 10000; x++) {
    const actual = SafeLessThan({ n }, { v: [BigInt(x), in1] }).out;
    if (actual !== expected) {
      console.log("Found SafeLessThan counter example:");
      console.log(`n: ${n}`);
      console.log(`in: [${BigInt(x)}, ${in1}]`);
      console.log(`Expected: ${expected} Got: ${actual}`);
      break;
    }
  }
}

// Check the safety of values in the range of n
{
  const n = 8n;
  // Here we're fixing the second input value as 512 and
  // checking input values that are greater than the second input
  //
  // We're looking for an example that returns the incorrect value
  for (let x = 0n; x < 2n ** n; x++) {
    for (let y = 0n; y < 2n ** n; y++) {
      let expected = x < y ? 1n : 0n;
      if (expected !== SafeLessThan({ n }, { v: [x, y] }).out) {
        console.log("Found SafeLessThan counter example:");
        console.log(`n: ${n}`);
        console.log(`in: [${x}, ${y}]`);
        console.log(`Expected: ${expected} Got: ${actual}`);
      }
      expected = x > y ? 1n : 0n;
      if (expected !== SafeLessThan({ n }, { v: [y, x] }).out) {
        console.log("Found SafeLessThan counter example:");
        console.log(`n: ${n}`);
        console.log(`in: [${x}, ${y}]`);
        console.log(`Expected: ${expected} Got: ${actual}`);
      }
    }
  }
}
