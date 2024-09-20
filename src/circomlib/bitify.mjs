import { constrain_eq } from "../constraints.mjs";
import { shr, add, mul, sub } from "../math.mjs";

// Decompose a field value into a set of bits
// Return an array of `n` elements
//
// From the template, `in` is renamed to `v`
export function Num2Bits(params, inputs) {
  const { n } = params;
  const { v } = inputs;
  let lc1 = 0n;
  let e2 = 1n;
  const out = Array(n).fill(0n);

  for (let i = 0; i < Number(n); i++) {
    out[i] = shr(v, BigInt(i)) & 1n;
    constrain_eq(mul(out[i], sub(out[i], 1n)), 0n);
    lc1 = add(lc1, mul(out[i], e2));
    e2 = add(e2, e2);
  }

  constrain_eq(lc1, v);

  return { out };
}

// This implementation does not include the AliasCheck
// component.
export function Num2Bits_strict(params, inputs) {
  const { v } = inputs;
  return Num2Bits({ n: 254n }, { v });
}
