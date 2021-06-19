import { User } from "../../interfaces/user";

const setUserReducer = (
  state: { user: User | null } = { user: null },
  action: { type: string; payload: User }
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default setUserReducer;
