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
    return node;
}

let I = (x) => x;
let K = (x) => (y) => x;

let combinators = {
    "I":I,
    "K":K
}

function transform(tree)
{
    for(let node in tree)
    {
        console.log(node);
        if(node)
    }
    return tree;
}

function combi(string,...values)
{
    let parsed = partial(string);
    parsed = fill(parsed,values);
    let tree = ast(parsed);
    return transform(tree);
}

let test1 = combi`( K ( I ( I #${true} ) ) ) ( I #${false} ) )`;
console.log(JSON.stringify(test1));
