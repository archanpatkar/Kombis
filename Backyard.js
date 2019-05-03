// function partial(string,values)
// {
//     string = string.map(element => element.split(""));
//     let partial = "";
//     for(let s in string)
//     {
//         if(Array.isArray(s))
//         {
//             for(let i of s) partial += i;
//         }
//         else
//         {
//             partial += s;
//         }

//     }
//     return partial;
// }

// function fill(partial,values)
// {
//     let complete = [];
//     let value = "";
//     let counter = 0;
//     for(let i in partial)
//     {
//         value = partial[i];
//         if(value == " ");
//         else if(value == "#") complete.push(values[counter++]);
//         else complete.push(value);
        
//     }
//     return complete;
// }
// let parsed = partial(string);
// parsed = fill(parsed,values);


// function transform(tree)
// {
//     tree = Array.from(tree);
//     let main = [];
//     console.log(tree)
//     for(let n in tree)
//     {  
//         let node = tree[n]
//         let transformed = "";
//         for(let i = 0;i < node.length;i++)
//         {
//             let c = node[0];
//             node.shift();
//             if(Array.isArray(c)) 
//             {
//                 let o = transform([c])
//                 if(o != undefined) transformed += o;
//             }
//             else if(c in combinators)
//             {
//                 let comb = combinators[c];
//                 let values = [];
//                 let len = node.length
//                 for(let v = 0; v < len; v++)
//                 {
//                     const val = node[0];
//                     node.shift();
//                     if(Array.isArray(val)) values.push(transform([val]));
//                     else if(val in combinators) values.push(`${combinators[val].c}`);
//                     else if(val != undefined) values.push(val);
//                 }
//                 // let len = node.length;
//                 // for(let w = 0; w < len; w++) node.shift();
//                 if(values.length > 0)
//                 {
//                     let params = "";
//                     for(let v of values) params += `(${v})`
//                     transformed += `(${comb.c})${params}`;
//                 }
//                 else
//                 {
//                     transformed += `(${comb.c})`;
//                 }
//             }
//             main.push(transformed);
//         }
        // let node = tree[n];
        // let c = node[0];
        // node.shift();
        // if(Array.isArray(c)) 
        // {
        //     let o = transform([c])
        //     if(o != undefined) transformed.push(o);
        // }
        // if(c in combinators)
        // {
        //     let comb = combinators[c];
        //     let values = [];
        //     for(let v = 0; v < node.length; v++)
        //     {
        //         const val = node[v];
        //         if(Array.isArray(val)) values.push(transform([val]));
        //         else if(val in combinators) values.push(`${combinators[val].c}`);
        //         else if(val != undefined) values.push(val);
        //     }
        //     if(values.length > 0)
        //     {
        //         let params = "";
        //         for(let v of values) params += `(${v})`
        //         transformed.push(`(${comb.c})${params}`);
        //     }
        //     else
        //     {
        //         transformed.push(`(${comb.c})`);
        //     }
        // }
        // for(let c of node)
        // {
        //     console.log(c)
        //     if(Array.isArray(c)) 
        //     {
        //         let o = transform([c])
        //         console.log(o)
        //         if(o != undefined) transformed.push(o);
        //     }
        // } 
//     }
//     if(!(main.length == 0)) return main;
// }

// function flatten(arr1) {
//     return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
// }