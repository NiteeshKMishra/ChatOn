class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = { id, name, room }
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
    }
    return user;
  }

  getUser(id) {
    var getUser = this.users.filter((user) => {
      return user.id === id;
    })
    return getUser[0];
  }

  getUserList(room) {
    var usersList = this.users.filter((user) => {
      return user.room === room
    });
    var nameList = usersList.map((user) => {
      return user.name
    });
    return nameList;
  }
}

module.exports.Users = Users;