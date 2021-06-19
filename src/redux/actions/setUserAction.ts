import { User } from "../../interfaces/user";

const setUser = (user: User) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export default setUser;
