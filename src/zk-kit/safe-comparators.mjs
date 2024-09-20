import { constrain_eq } from "../constraints.mjs";
import { Num2Bits, Num2Bits_strict } from "../circomlib/bitify.mjs";
import { shr, shl, add, mul, sub } from "../math.mjs";

// Do a constrained less than comparison between
// two values
//
// From the template, `in` is renamed to `v`
export function SafeLessThan(params, inputs) {
  const { n } = params;
  const { v } = inputs;

  if (n > 252n) {
    throw new Error("assertion failed");
  }

  const { out } = Num2Bits_strict(
    {},
    {
      v: sub(add(v[0], shl(1n, BigInt(n))), v[1]),
    },
  );

  return {
    out: sub(1n, out[Number(n)]),
  };
}
