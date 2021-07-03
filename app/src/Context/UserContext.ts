import { createContext } from "react";

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType>({
  user: {},
  setUser: ({}) => {},
});

export default UserContext;
