import {
  createContext,
  ReactElement,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  useContext,
} from 'react';
import { CognitoUser } from '@aws-amplify/auth';
import { Hub, Auth } from 'aws-amplify';

interface Props {
  children: React.ReactElement;
}

interface UserContextType {
  user: CognitoUser | null;
  setUser: Dispatch<SetStateAction<CognitoUser>>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export default function AuthContext({ children }: Props): ReactElement {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen('auth', () => {
      checkUser();
    });
  }, []);

  async function checkUser() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      setUser(null);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => useContext(UserContext);
