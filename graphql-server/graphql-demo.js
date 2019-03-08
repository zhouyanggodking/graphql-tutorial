const { graphql, buildSchema } = require('graphql')

// helper function to build GraphQLSchema from source document
const schema = buildSchema(`
  type Query {
    greeting: String
  }
`)

// the root provides a resolver function for each API endpoint
const root = {
  greeting: () => 'hello, moto'
}


// query data immediately
graphql(schema, '{ greeting }', root).then(res => {
  console.log(res)
})