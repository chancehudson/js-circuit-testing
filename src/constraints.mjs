export function constrain_eq(v0, v1, msg) {
  if (v0 !== v1) {
    console.log(v0, v1);
    console.log(`Expected equality between:
${v0}
${v1}`);

    if (msg) {
      console.log(msg);
    }

    throw new Error("constraint failure");
  }
}
