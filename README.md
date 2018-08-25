# Combino
### A DSL Compiler for Combinatory Logic based on the universal formal system SKI Combinator Calculus

## Background
Combinatory logic is a notation to eliminate the need for quantified variables in **mathematical logic**. It was introduced by **Moses Schönfinkel** and **Haskell Curry**, and has more recently been used in computer science as a **theoretical model of computation** and also as a basis for the design of **functional programming languages**.

SKI Combinator Calculus is a **combinatory logic**, a **Computational System** or **Model of Computation** which may be perceived as reduced version of **untyped lambda calculus**. It can be thought of as a computer programming language, though it is not convenient for writing software. Instead, it is important in the mathematical theory of algorithms because it is an extremely simple Turing complete language.

## Implementation
Combino can be used as a **Embedded DSL** inside of Javascript using **Tagged String Templates**(*Macros*). The DSL completly supports **SKI Combinator Calculus Grammer** which is then **transformed** or **compiled** into **Javascript - ES6** this transformation is applied using a, **Tag** on **String Template** which will contain the Combino/SKI **Code**. Combino allows to write very complicated functional hybird **SKI** compositions which allows **infusion** of Javascript with **SKI Combinator Calculus** in a **concise** manner. Complex **Compositions** and **Representations** are easier to write in Combino rather than native Javascript

## Examples
**Encoding TRUE**
```javascript
combi`(K)`
```

**Encoding FALSE**
```javascript
combi`(SK)`
```

**Using Custom Primitive Values in conjunction with Combino**
```javascript
combi`((K(I #${false})(I(I #${10}))))`
```
**Recursion** (Y Combinator Fixed point combinator encoded in SKI Calculus)
> This will result in Infinite Recursion 💣
```javascript
combi`(S(K#${(x)=>10})(SII(S(K#${(x)=>10})(SII)))`
```
