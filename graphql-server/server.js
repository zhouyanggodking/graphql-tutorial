const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const userDal = require('./user_dal');

// build schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    age: Int
    sex: SexType
  }

  enum SexType {
    MALE
    FEMALE
  }

  type Query {
    user(id: Int!): User
    users(pageNum: Int = 1, pageSize: Int): [User]
  }

  type Mutation {    
    createUser(user: InputUser) : User!
  }

  input InputUser {
    name: String!
    age: Int
    sex: SexType
  }
`);

const getUserList = (pageNum, pageSize) => {
  const userList = userDal.getUserList();
  if (!pageSize) {
    return userList;
  }

  return userList.slice((pageNum - 1) * pageSize, pageNum * pageSize);
};

// map resolver to endpoint
const rootValue = {
  user: ({id}) => userDal.getUserById(id),
  users: ({pageNum, pageSize}) => getUserList(pageNum, pageSize),
  createUser: ({user}) => userDal.createUser(user)
}

// setup express
const app = express();

app.use('/graphql', express_graphql({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(4000, () => console.log('running on :4000/graphql'));
