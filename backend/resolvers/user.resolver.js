import { users } from "./../dummyData/data.js";

const userResolver = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, { userId }) => {
      return users.find((u) => u._id === userId);
    },
  },
  Mutation: {},
};

export default userResolver;
