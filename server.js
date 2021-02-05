const express = require('express');
const session = require('express-session')
const cookieP = require('cookie-parser')
var { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql')
const {importSchema} = require('graphql-import')
const cors = require('cors') 
const {rollDice} = require('./resolvers/resolverDie')
const resolveM = require('./resolvers/resolverMsg')
const resolveDT = require('./resolvers/scalarDateTime')

const SCHEMA_PATH = './schemas/schema.graphql'
// Construct a schema, using GraphQL schema language
const schema = buildSchema(importSchema(SCHEMA_PATH))

// The root provides a resolver function for each API endpoint
const root = {
  rollDice,
  ...resolveM,
  DateTime: resolveDT.DateTimeScalar,
  getDateTime: resolveDT.getDateTime,

}
 
var app = express();
app.use(cors());
app.use(cookieP());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get("/",(req,res) => {
  if (!req.cookies.hasVisited){
    res.cookie("hasVisited",parseInt(1,10))
    res.send("First time")
  }
  else{
    let val = parseInt(req.cookies.hasVisited,10)
    res.cookie("hasVisited",val+1)
    res.send(`${val+1} time`)
  }
})

app.delete("/",(req,res) => {
  if (req.cookies.hasVisited) {
    res.clearCookie("hasVisited")
    res.send("Cookies cleared")
  }
})

app.listen(4000,'localhost',() => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});

/*
fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ hello }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data)).catch(err => console.log(err));


 mutation CreateMessage($input: String) {
  setMessage(message: $input)
}

query check{
  getMessage
}

{
  "input" : "Gday"
}
---
body: JSON.stringify({
    query,
    variables: {
      input: {
        author,
        content,
      }
    }
  })

curl -X POST -H "Content-Type: application/json" -d '{"query": "{ hello }"}' http://localhost:4000/graphql
*/