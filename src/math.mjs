export const F = BigInt(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617",
);

export function add(v0, v1) {
  return (v0 + v1) % F;
}

export function sub(v0, v1) {
  return (v0 + F - v1) % F;
}

export function mul(v0, v1) {
  return (v0 * v1) % F;
}

export function mod(v) {
  while (v < 0n) {
    v += F;
  }
  return v % F;
}

export function shl(v, amount) {
  return mod(v << amount);
}

export function shr(v, amount) {
  return mod(v >> amount);
}

export function inv(d) {
  d = mod(d);
  if (d === 0n) throw new Error("divide by zero");
  let y = 0n;
  let x = 1n;
  let f = this.p;
  while (d > 1n) {
    // q is quotient
    const q = d / f;
    let t = f;
    // f is remainder now,
    // process same as
    // Euclid's algo
    f = d % f;
    d = t;
    t = y;
    // Update y and x
    y = x - q * y;
    x = t;
  }
  return mod(x);
}
