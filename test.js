const { combi , combc , combinators } = require("./index");

// Random
console.log("RANDOM");
let test1 = combi`( ( K (I ${false}) (I(I ${10})) ) )`;
console.log(test1);


let test2 = combi`(SII ${(x)=>10})`;
console.log(test2);

// Testing
console.log("Testing")
let mp = combc`(SKISKI)`;
console.log(mp[0].toString());

// Self Application a.k.a. Mockingbird
console.log("SELF APPLICATION");
let sa = combi`(SII ${(x) => 10})`;
console.log(sa[0].toString());

console.log("IRREDUCIBLE PROPERTY");
// SII(SII) = I(SII)(I(SII)) = I(SII)(SII) = SII(SII) ...[Infinite Recursion 💣]
// Uncomment the lines below to see the effect
// let limitsa = combi`(SII(SII))`;
// console.log(limitsa);

// Recursion
// β = S(Kα)(SII)
// SIIβ = ββ ...[Infinite Recursion 💣]
// Uncomment the lines below to see the effect
// console.log("RECURSION");
// let limitsa = combi`(S(K ${(x)=>10})(SII)(S(K ${(x)=>10})(SII)))`;
// console.log(limitsa);

// console.log("RECURSION");
// let limitsa = combi`(Y ${x => log(10)})`;
// console.log(limitsa[0]);

console.log("REVERSAL");
let limitsa = combi`(S(K(SI))K ${x=>20} ${y=>10})`;
console.log(limitsa[0]);


// Truth Values
console.log("TRUTH VALUES");
const TRUE = combi`(K)`;
console.log(TRUE[0].toString());

const FALSE = combi`(SK)`;
console.log(FALSE[0].toString());

// Not
console.log("NOT");
const not_of_false = combi`((SK(SK)(K)))`;
console.log(not_of_false[0].toString());

const not_of_true = combi`((K(SK)(K)))`;
console.log(not_of_true[0].toString());

// OR
console.log("OR");
const or_t_t = combi`(K(K)(K))`
console.log(or_t_t[0].toString());

const or_t_f = combi`(K(K)(SK))`
console.log(or_t_f[0].toString());

const or_f_t = combi`(SK(SK)(K))`
console.log(or_f_t[0].toString());

const or_f_f = combi`(SK(SK)(SK))`
console.log(or_f_f[0].toString());


console.log(combc`(
    (*Jag* ${(x)=>(y)=>(z)=>z}) 
    (IJagIKI)
    (KI)
)`);

console.log(combinators);

combc`(@Jag@ KI)`;
out = combi`((((IJagIKI)(KI)(IK))(JagI)))  (KKI ${10})`;
console.log(out[1]());