import { users } from "./../dummyData/data.js";

const userResolver = {
  Query: {
    users: (_, _, { req, res }) => {
      return users;
    },
    user: (_, { userId }, { req, res }) => {
      return users.find((u) => u._id === userId);
    },
  },
  Mutation: {},
};

export default userResolver;
