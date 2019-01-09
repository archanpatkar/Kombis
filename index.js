const symbols = ["(",")","*","I","K","S","Y","@"];

function empty(str)
{
    if(
        str == "" || str == " " || 
        str == "\n" || str == "\b" || 
        str == "\t"
    ) return true;
    return false;
}

function parse(string,values)
{
    let parsed = [];
    for(let s in string)
    {
        let i = 0;
        while(i < string[s].length) 
        {
            let str = string[s][i++];
            if(!symbols.includes(str) && !empty(str))
            {
                let temp = "";
                while(!empty(str) && !symbols.includes(str) && i < string[s].length)
                {
                    temp += str;
                    str = string[s][i++];
                }
                parsed.push(temp);
            }
            if(!empty(str)) parsed.push(str);
        }
        if(values[s] != undefined) parsed.push(values[s]);
    }
    return parsed;
}

let macros = {};

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

function macrodeftransform(ast)
{
    for(let n of ast)
    {
        if(n[0] instanceof Array) macrodeftransform(n);
        if(n[0] == "@")
        {
            let name = "";
            n.shift();
            let char = "";
            while(char != "@")
            {
                name += char;
                char = n[0];
                n.shift();
            }
            macros[name] = n.join("");
            ast.shift();
        }
    }
    console.log("Here!");
    console.log(ast);
    return ast;
}

function astToCode(ast)
{
    let str = "";
    str += "("
    for(let n of ast)
    {
        if(Array.isArray(n))
        {
            str += "("
            for(let c of n)
            {
                if(Array.isArray(c))
                {
                    c = macrotransform(c);
                }
                str += c
            }
            str += ")"
        }
        else str += n
    }
    str += ")"
    return str;
}

function macrotransform(ast)
{
    let code = astToCode(ast);
    for(let m in macros)
    {
        console.log(m);
        code = code.replace(new RegExp(`${m}`),macros[m]);
    }
    return code;
}

function deftransform(ast)
{
    for(let n of ast)
    {
        if(n[0] instanceof Array) deftransform(n);
        if(n[0] == "*")
        {
            let name = "";
            n.shift();
            let char = "";
            while(char != "*")
            {
                name += char;
                char = n[0];
                n.shift();
            }
            combinators[name] = { c: n[0] , params:n.length };
            n.shift();
            ast.shift();
        }
       
    }
    return ast;
} 


const I = x => x;
const K = x => y => x;
const S = x => y => z => x(z)(y(z));
const Y = a => (x => y => z => x(z)(y(z)))((x => y => x)((x => y => z => x(z)(y(z)))(x => x)(x => x)))((x => y => z => x(z)(y(z)))((x => y => z => x(z)(y(z)))((x => y => x)(x => y => z => x(z)(y(z))))(x => y => x))((x =>y => x)((x => y => z => x(z)(y(z)))(x => x)(x => x))))(a);

let combinators = {
    "I":{ c:I , params:1 },
    "K":{ c:K , params:2 },
    "S":{ c:S , params:3 },
    "Y":{ c:Y , params:1 }
};

function transform(tree)
{
    console.log(tree);
    tree = Array.from(tree);
    let transformed = [];
    for(let n in tree)
    {  
        let node = tree[n];
        let c = node[0];
        node.shift();
        if(Array.isArray(c)) 
        {
            let o = transform([c])
            if(o != undefined) transformed.push(o);
        }
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
        for(let c of node)
        {
            if(Array.isArray(c)) 
            {
                let o = transform([c])
                if(o != undefined) transformed.push(o);
            }
        } 
    }
    if(!(transformed.length == 0)) return transformed;
}

function combi(string,...values)
{
    let parsed = parse(string,values);
    let tree = ast(parsed);
    let mtree = deftransform(tree);
    let transformed = transform(mtree);
    if(transformed)
    {
        return transformed
            .reduce((acc, val) => acc.concat(val), [])
            .map(tfc => eval(tfc));
    }
}

function combc(string,...values)
{
    let parsed = parse(string,values);
    let tree = ast(parsed);
    let mcode = macrotransform(macrodeftransform(tree));
    console.log(mcode);
    tree = ast(parse(mcode,values));
    console.log(tree);
    let mtree = deftransform(tree);
    console.log(mtree);
    let transformed = transform(mtree);
    if(transformed)
    {
        return transformed
            .reduce((acc, val) => acc.concat(val), []);
    }
}

module.exports.combi = combi;
module.exports.combc = combc;

console.log(combc`(@Jag@ KI)`);
console.log(combc`((IJagIKI)(KI))`);

// console.log("Original");
// console.log(macrotransform(macrodeftransform(ast(parse("((@Jag@ KI)(IJagIKI)(KI))",[])))));
// console.log(macros);