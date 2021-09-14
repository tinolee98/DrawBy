export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (id == loggedInUser.id) {
        return true;
      }
      return false;
    },
  },
};
