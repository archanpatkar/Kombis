function predicate(string,...values)
{
    console.log(string);
    let main = [];
    for(let s in string)
    {
        let cut = string[s].split(" ").filter(v => v != " " && v != "");
        main = main.concat(cut);
        if(values.length > s) main.push(values[s]);
    }
    console.log(main);
    console.log(parse(main));
    return string;
}

function tokenize(input)
{
    const tokens = [];
    for(let token of input)
    {
        if(token == " " || token == "") continue;
        if(token == "E")
        {
            tokens.push({ type:"Keyword" , value:"" })
        }
    }
}

function next(input)
{
    let c = input.tokens[input.counter++];
    if(c != undefined)
    {
        return c.toLowerCase();
    }
}

let pred = /\w+\(.+\)/;

function parse(tokens)
{
    let input = { counter:0 , tokens };
    let proposition = { variables:[] , predicate:[] };
    let counter = 0;
    let token = next(input);
    while(token != undefined)
    {
        if(token == "for")
        {
            let all = next(input);
            if(all == "all")
            {
                let varn = next(input);
                if(varn){ 
                    proposition.variables.push({ operation:all , identifier:varn });
                }
                else throw Error("Incomplete Proposition: Define the Variable after For All ...");
            }
            else
            {
                throw Error("Incomplete Proposition: Should write All after For");
            }
        }
        else if(token == "there")
        {
            let exists = next(input);
            if(exists == "exists")
            {
                let varn = next(input);
                if(varn){ 
                    proposition.variables.push({ operation:exists , identifier:varn });
                }
                else throw Error("Incomplete Proposition: Define the Variable after There Exists ...");
            }
            else
            {
                throw Error("Incomplete Proposition: Should write Exists after There");
            }
        }
        else if(token.match(pred) != undefined)
        {
            proposition.predicate.push(token);
        }
        else if(token == "^")
        {
            proposition.predicate.push("and");
        }
        else if(token == "~")
        {
            proposition.predicate.push("not");
        }
        else{
            console.log(token);
        }
        token = next(input);
    }
    return proposition;
}

let prop1 = predicate`E y A x P(x) && Q(x)`;
// console.log(prop1);