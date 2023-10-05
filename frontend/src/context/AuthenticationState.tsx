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
  const [user, setUser] = useState<ExposedUserFields | null>(null);
  const [hasInitializedSession, setHasInitializedSession] = useState(false);

  const login = (user: ExposedUserFields) => {
    setUser(user);
  };
  const logout = async () => {
    try {
      await CognitoInstance.logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }

    setUser(null);
  };
  const initializeSession = async (): Promise<boolean> => {
    let userFields: ExposedUserFields;

    try {
      userFields = await CognitoInstance.hydrateSession();
      setUser(userFields);
      setHasInitializedSession(true);
    } catch (err) {
      setUser(null);
      setHasInitializedSession(true);
    }

    return userFields !== undefined;
  };

  return (
    <AuthenticationStateContext.Provider
      value={{
        login,
        logout,
        session: {
          isLoggedIn: user !== null,
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
