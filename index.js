function partial(string)
{
    string = string.map(element => element.split(""));
    let partial = "";
    for(let s of string)
    {
        if(Array.isArray(s))
        {
            for(let i of s) partial += i;
        }
        else
        {
            partial += s;
        }
    }
    return partial;
}

function fill(partial,values)
{
    let complete = [];
    let value = "";
    let counter = 0;
    for(let i in partial)
    {
        value = partial[i];
        if(value == " ");
        else if(value == "#") complete.push(values[counter++]);
        else complete.push(value);
        
    }
    return complete;
}

function ast(parsed)
{
    let char = parsed[0];
    parsed.shift();
    let node = [];
    while(char != ")")
    {
        if(char == "(") node.push(ast(parsed));
        else node.push(char);
        char = parsed[0];
        parsed.shift();
    }
    if(char == ")")
    {
        parsed.push(")");
    }
    return node;
}

let I = (x) => x;
let K = (x) => (y) => x;
let S = (x) => (y) => (z) => (x(z))(y(z));

let combinators = {
    "I":{ c:I , params:1 },
    "K":{ c:K , params:2 },
    "S":{ c:S , params:3 }
}

function hasArray(node)
{
    for(let i of node) 
    {
        if(Array.isArray(i)) return true;
    }
    return false;
}

function transform(tree)
{
    tree = Array.from(tree);
    let transformed = [];
    for(let n in tree)
    {    
        let node = tree[n];
        let c = node[0];
        node.shift();
        if(Array.isArray(c)) transformed.push(transform([c]));
        if(c in combinators)
        {
            let comb = combinators[c];
            let values = [];
            for(let v = 0; v < node.length; v++)
            {
                const val = node[v];
                if(Array.isArray(val)) values.push(transform([val]));
                else if(val in combinators) values.push(`${combinators[val].c}`);
                else if(val != undefined) values.push(val);
            }
            if(values.length > 0)
            {
                let params = "";
                for(let v of values) params += `(${v})`
                transformed.push(`(${comb.c})${params}`);
            }
            else
            {
                transformed.push(`(${comb.c})`);
            }
        }   
    }
    return transformed;
}

function combi(string,...values)
{
    let parsed = partial(string);
    parsed = fill(parsed,values);
    let tree = ast(parsed);
    let transformed = transform(tree);
    return transformed
            .reduce((acc, val) => acc.concat(val), [])
            .map(tfc => eval(tfc))
            .map( eval => {
                if(eval instanceof Function) return eval.toString()
                else return eval;
            });
}

// Random
console.log("RANDOM");
let test1 = combi`((K(I#${false})(I(I#${10}))))`;
console.log(test1);

let test2 = combi`(SII#${(x)=>10})`;
console.log(test2);

// Testing
console.log("Testing")
let mp = combi`(SKISKI)`;
console.log(mp);

// Self Application a.k.a Mockingbird
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