const { combi , combc } = require("./index");

// Random
console.log("RANDOM");
let test1 = combi`((K(I#${false})(I(I#${10}))))`;
console.log(test1);

let test2 = combi`(SII#${(x)=>10})`;
console.log(test2);

// Testing
console.log("Testing")
let mp = combc`(SKISKI)`;
console.log(mp);

// Self Application a.k.a. Mockingbird
console.log("SELF APPLICATION");
let sa = combi`(SII#${(x) => 10})`;
console.log(sa);

// console.log("IRREDUCIBLE PROPERTY");
// SII(SII) = I(SII)(I(SII)) = I(SII)(SII) = SII(SII) ...[Infinite Recursion 💣]
// Uncomment the lines below to see the effect
// let limitsa = combi`(SII(SII))`;
// console.log(limitsa);

// Recursion
// β = S(Kα)(SII)
// SIIβ = ββ ...[Infinite Recursion 💣]
// Uncomment the lines below to see the effect
// console.log("RECURSION");
// let limitsa = combi`(S(K#${(x)=>10})(SII(S(K#${(x)=>10})(SII)))`;
// console.log(limitsa);

// Truth Values
console.log("TRUTH VALUES");
const TRUE = combi`(K)`;
console.log(TRUE);

const FALSE = combi`(SK)`;
console.log(FALSE);

// Not
console.log("NOT");
const not_of_false = combi`((SK(SK)(K)))`;
console.log(not_of_false);

const not_of_true = combi`((K(SK)(K)))`;
console.log(not_of_true);

// OR
console.log("OR");
const or_t_t = combi`(K(K)(K))`
console.log(or_t_t);

const or_t_f = combi`(K(K)(SK))`
console.log(or_t_f);

const or_f_t = combi`(SK(SK)(K))`
console.log(or_f_t);

const or_f_f = combi`(SK(SK)(SK))`
console.log(or_f_f);