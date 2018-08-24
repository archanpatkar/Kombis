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

function combc(string,...values)
{
    let parsed = partial(string);
    parsed = fill(parsed,values);
    let tree = ast(parsed);
    let transformed = transform(tree);
    return transformed
            .reduce((acc, val) => acc.concat(val), []);
}

module.exports.combi = combi;
module.exports.combc = combc;