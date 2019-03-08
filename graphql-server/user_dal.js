// mimic database storage
const userList = [
  {
    'id': 1,
    'name': 'godking',
    'age': 30,
    'sex': 'MALE'
  },
  {
    'id': 2,
    'name': 'oceansky',
    'age': 25,
    'sex': 'FEMALE'
  },
  {
    'id': 3,
    'name': 'shannon',
    'age': 17,
    'sex': 'FEMALE'
  },
  {
    'id': 4,
    'name': 'baidu',
    'age': 11,
    'sex': 'MALE'
  },
  {
    'id': 5,
    'name': 'google',
    'age': 20,
    'sex': 'MALE'
  }
];

//CRUD for user
function createUser(user) {
  if (!user) {
    return
  }
  user.id = userList.length + 1;
  userList.push(user);
  return user;
}

function getUserById(id) {
  return userList.filter(u => u.id === id)[0];
}

function updateUser(id, user) {
  const orgUser = getUserById(id);
  if (orgUser) {
    return;
  }

  if (user.hasOwnProperty('name')) {
    orgUser.name = user.name;
  }
  if (user.hasOwnProperty('age')) {
    orgUser.age = user.age;
  }

  if (user.hasOwnProperty('sex')) {
    orgUser.sex = user.sex;
  }

  return orgUser;
}

function deleteUserById(id) {
  userList = userList.filter(u => u.id !== id);
}

function getUserList() {
  return userList;
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUserById,
  getUserList
}