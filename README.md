# Bracko
Bracko is a simple data format. This NPM package has a `parse`, `stringify`, `jsonToBracko`, and a `brackoToJson` method.

## Syntax
### General syntax
```
[Key]: Value

anything that's not in this format will be treated as a comment
```

### Overriding
```
[Key]: Value
[Key]: Overriding the value

this will override [Key] to "Overriding the value"
in other words, this will return { Key: "Overriding the value" }
```

### Allowed characters in keys
```
[You can use spaces in keys]: and it'll work!
[You can also use numbers and special characters!11_.]: and it'll still work
[Everything except new lines]: will work.
```

### Keys within values
```
[Person]: -
    [Name]: John
    [Surname]: Doe
    [Birthday]: -
        [Day]: 1
        [Month]: 1
        [Year]: 2000
    [Birthday]: -
[Person]: -

parsing this returns:
{
    Person: {
        Name: "John",
        Surname: "Doe",
        Birthday: {
            Day: "1",
            Month: "1",
            Year: "2000"
        }
    }
}
```

## Library Usage
### Importing
```js
const Bracko = require("bracko");
```

### Parsing
```js
Bracko.parse(`
[Name]: John
[Surname]: Doe
[Birthday]: Jan 1st 2000
`);

/*
    {
        Name: "John",
        Surname: "Doe",
        Birthday: "Jan 1st 2000"
    }
*/
```

### Stringifying
```js
Bracko.stringify({
    name: "John",
    surname: "Doe",
    birthday: "Jan 1st 2000"
});

/*
[name]:John
[surname]:Doe
[birthday]:Jan 1st 2000
*/
```

### Converting to JSON
```js
Bracko.brackoToJson(`
[Name]: John
[Surname]: Doe
[Birthday]: Jan 1st 2000
`);
/*
    {"Name":"John","Surname":"Doe","Birthday":"Jan 1st 2000"}
*/

Bracko.brackoToJson(`
[Person]: -
    [Name]: John
    [Surname]: Doe
    [Birthday]: Jan 1st 2000
[Person]: -
`);

/*
    {"Person":{"Name":"John","Surname":"Doe","Birthday":"Jan 1st 2000"}}
*/
```

### Converting JSON data to Bracko data
```js
Bracko.jsonToBracko(`{
    "Person": {
        "Name": "John",
        "Surname": "Doe"
    }
}`);
/*
[Person]:-
[Name]:John
[Surname]:Doe
[Person]:-
*/
```
