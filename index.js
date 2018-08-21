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
    console.log(tree);
    for(let node of tree)
    {
        console.log(node);
        if(hasArray(node))
        {
            transform(node);
        }
        else
        {

        }
    }
    return tree;
}

function combi(string,...values)
{
    let parsed = partial(string);
    parsed = fill(parsed,values);
    let tree = ast(parsed);
    return tree;
}

let test1 = combi`( K ( I ( I #${true} ) ) ) ( I #${false} ) )`;
console.log(JSON.stringify(test1));
