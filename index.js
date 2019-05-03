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

function value(v)
{
    this.value = v;
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
        if(values[s] != undefined) parsed.push(new value(values[s]));
    }
    return parsed;
}

let macros = {};

function ast(parsed,first=true)
{
    let char = parsed[0];
    parsed.shift();
    let node = [];
    if(first && char != "(") throw new SyntaxError("Start with `(`");
    while(char != ")")
    {
        if(parsed.length == 0) throw new SyntaxError("Missing `)`");
        if(char == "(") node.push(ast(parsed,false));
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
                if(n.length == 0) throw new SyntaxError("Missing `@`");
                name += char;
                char = n[0];
                n.shift();
            }
            macros[name] = n.join("");
            ast.shift();
        }
    }
    return ast;
}

function astToCode(ast)
{
    let str = "";
    for(let n of ast)
    {
        if(Array.isArray(n))
        {
            str += "("
            for(let c of n)
            {
                if(Array.isArray(c))
                {
                    str += "(";
                    c = macrotransform(c);
                    str += c;
                    str += ")";
                }
                else if(c instanceof value) str += "_"
                else str += c
            }
            str += ")"
        }
        else if(n instanceof value) str += "_"
        else str += n
    }
    if(ast.length == 0)
    {
        str = "()";
    }
    return str;
}

function macrotransform(ast)
{
    let code = astToCode(ast);
    for(let m in macros)
    {
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
            combinators[name] = n[0].value;
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
    "I":I,
    "K":K,
    "S":S,
    "Y":Y
};

function transform(tree)
{
    tree = Array.from(tree);
    let main = [];
    for(let node of tree)
    {
        let str = "";
        for(let sub of node)
        {
            if(Array.isArray(sub)) 
                str += `(${transform([sub])})`;
            else if(sub in combinators)
                str += `(${combinators[sub]})`;
            else if(sub != undefined) 
                str += `(${sub.value})`;
        }
        main.push(str);
    }
    return main;
}

function combi(string,...values)
{
    let parsed = parse(string,values);
    let tree = ast(parsed);
    let mcode = macrotransform(macrodeftransform(tree));
    tree = ast(parse(mcode.split("_"),values));
    let mtree = deftransform(tree);
    let transformed = transform(mtree);
    return transformed.map(code=>eval(code));
}

function combc(string,...values)
{
    let parsed = parse(string,values);
    let tree = ast(parsed);
    let mcode = macrotransform(macrodeftransform(tree));
    tree = ast(parse(mcode.split("_"),values));
    let mtree = deftransform(tree);
    let transformed = transform(mtree);
    return transformed;
}

// Implementation
module.exports.empty = empty;
module.exports.value = value;
module.exports.parse = parse;
module.exports.ast = ast;
module.exports.macrodeftransform = macrodeftransform;
module.exports.astToCode = astToCode;
module.exports.macrotransform = macrotransform;
module.exports.deftransform = deftransform;
module.exports.transform = transform;
module.exports.macros = macros;
module.exports.combinators = combinators;

// Interface
module.exports.combi = combi;
module.exports.combc = combc;