import { ReactNode, createContext, useContext, useState } from "react";
import { CognitoInstance, ExposedUserFields } from "../utils/Cognito";

type AuthenticatedState = {
  isLoggedIn: true;
  user: ExposedUserFields;
};
type UnauthenticatedState = {
  isLoggedIn: false;
  user: null;
};
type Session = AuthenticatedState | UnauthenticatedState;
export interface IAuthenticationStateContext {
  login(user: ExposedUserFields): void;
  logout(): Promise<void>;
  initializeSession(): Promise<boolean>;
  hasInitializedSession: boolean;
  session: Session;
}

export const AuthenticationStateContext =
  createContext<IAuthenticationStateContext>({
    login: () => {},
    logout: async () => {},
    initializeSession: async () => false,
    hasInitializedSession: false,
    session: {
      isLoggedIn: false,
      user: null,
    },
  });

export function AuthenticationStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<ExposedUserFields | null>(null);
  const [hasInitializedSession, setHasInitializedSession] = useState(false);

  const login = (user: ExposedUserFields) => {
    setIsLoggedIn(true);
    setUser(user);
  };
  const logout = async () => {
    try {
      await CognitoInstance.logout();
    } catch (error) {
      console.error(error);
    }

    setIsLoggedIn(false);
    setUser(null);
  };
  const initializeSession = async (): Promise<boolean> => {
    let userFields: ExposedUserFields;

    try {
      userFields = await CognitoInstance.hydrateSession();

      console.log(userFields);
    } catch (error) {
      console.error(error);
    }

    setHasInitializedSession(true);

    return userFields !== undefined;
  };

  return (
    <AuthenticationStateContext.Provider
      value={{
        login,
        logout,
        session: {
          isLoggedIn,
          user,
        } as Session,
        hasInitializedSession,
        initializeSession,
      }}
    >
      {children}
    </AuthenticationStateContext.Provider>
  );
}

export const useSession = () => useContext(AuthenticationStateContext);
