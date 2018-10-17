let M = "M";
let U = "U";
let I = "I";
let EMPTY = "";

var rule3patt = /III/gi;
var rule4patt = /UU/gi;

let rules =  {
    1: str => {
        if(str.endsWith(I)) return true
    },
    2: str => {
        if(str[0] == M) return true;
    },
    3: str => {
        if(str.match(rule3patt) != undefined) return true;
    },
    4: str => {
        if(str.match(rule4patt) != undefined) return true;
    }
}

function canApply(str,rule) {
    if(rule in rules) return rules[rule](str)?true:false;
}

function canAppyHowMany(str)
{
    let out = [];
    for(let rule in rules){
        if(canApply(str,rule))
        {
            out.push(rule);
        }
    } 
    return out;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function selectRandomRule(str)
{
    let rules = canAppyHowMany(str);
    return rules[getRandomInt(rules.length)];
}

let apply =  {
    1: str => {
        return str+=U;
    },
    2: str => {
        let x = str.slice(1);
        str += x;
        return str;
    },
    3: str => {
        return str.replace(rule3patt,U);
    },
    4: str => {
        return str.replace(rule4patt,EMPTY);
    }
}

function applyRule(str,rule)
{
    if(rule in apply) return apply[rule](str);
}

function findold(start,end,iterations)
{
    console.log("Randomized Bruteforce Solution for MU Puzzle");
    console.log("Starting String: " + start);
    console.log("To Find: " + end);
    let main = start;
    let i = 0;
    while(i < iterations)
    {
        console.log("Iteration: " + (i+1));
        let rule = getRandomInt(4)+1;   
        if(rule != undefined)
        {
            console.log("Before Rule Application: " + main);
            console.log("Applying Rule: " + rule);
            main = applyRule(main,rule);
            console.log("After Rule Application: " + main);
        }
        i++;
    }
}

function possibliltyTree(start,iterations)
{
    console.log("Starting String: " + start);
    let main = [start];
    let temp = [];
    let i = 0;
    while(i < iterations) {
        console.log("Iteration: " + (i+1));
        console.log(main);
        for(let m of main) {
            let rules = canAppyHowMany(m);   
            if(rules != undefined) {
                for(let rule of rules) {
                    temp.push(applyRule(m,rule));
                }
            }
        }
        if(temp.length > 0) {
            main = temp;
            temp = [];
        }
        i++;
    }
}

function find(start,end,iterations)
{
    console.log("Randomized Bruteforce Solution for MU Puzzle");
    console.log("Starting String: " + start);
    console.log("To Find: " + end);
    let order = [];
    let output = [start];
    let main = start;
    let i = 0;
    while(i < iterations && main != end)
    {
        console.log("Iteration: " + (i+1));
        let rule = selectRandomRule(main);   
        if(rule != undefined)
        {
            console.log("Before Rule Application: " + main);
            console.log("Applying Rule: " + rule);
            order.push(rule);
            main = applyRule(main,rule);
            console.log("After Rule Application: " + main);
        }
        output.push(main);
        i++;
    }
    return [order,output];
}


function find2(start,end,iterations)
{
    console.log("Randomized Bruteforce Solution for MU Puzzle");
    console.log("Starting String: " + start);
    console.log("To Find: " + end);
    let order = [];
    let output = [start];
    let main = start;
    let i = 0;
    while(i < iterations && main != end)
    {
        console.log("Iteration: " + (i+1));
        let rules = canAppyHowMany(main);   
        if(rules != undefined)
        {
            for(let rule of rules) {
                console.log("Before Rule Application: " + main);
                console.log("Applying Rule: " + rule);
                order.push(rule);
                main = applyRule(main,rule);
                console.log("After Rule Application: " + main);
            }
        }
        output.push(main);
        i++;
    }
    return [order,output];
}

let problem = "MI";
let tofind = "MUI";

// possibliltyTree(problem,12);
console.log(find2(problem,tofind,6));