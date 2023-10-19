import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserSession,
  ICognitoUserAttributeData,
} from "amazon-cognito-identity-js";
import { UnauthenticatedException } from "../exceptions/auth/UnauthenticatedException";

export interface ExposedUserFields {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  neighborhoodId: string | null;
  mfaEnabled: boolean;
}
type MutableUserFields = Partial<
  Pick<ExposedUserFields, "firstName" | "lastName" | "email" | "neighborhoodId">
>;

export enum UserAttributes {
  ID = "sub",
  Email = "email",
  FirstName = "given_name",
  LastName = "family_name",
  NeighborhoodID = "custom:neighborhoodId",
}

type LoginResult = {
  needToVerify: boolean;
  user: ExposedUserFields | null;
};

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

class CognitoService {
  private _userPoolId: string;
  private _clientId: string;
  private _userPool: CognitoUserPool;
  private _userInstance: CognitoUser;

  constructor({
    userPoolId,
    clientId,
  }: {
    userPoolId: string;
    clientId: string;
  }) {
    this._userPoolId = userPoolId;
    this._clientId = clientId;

    this._userPool = new CognitoUserPool({
      ClientId: this._clientId,
      UserPoolId: this._userPoolId,
    });
  }

  private async getUserData(
    user: CognitoUser = this._userInstance
  ): Promise<ExposedUserFields> {
    return new Promise<ExposedUserFields>((resolve, reject) => {
      user.getUserData((error, result) => {
        if (error) {
          reject(error);
        }

        // TODO: MFA options once users can configure 2fa
        const userFields: ExposedUserFields = {
          firstName: "",
          lastName: "",
          email: "",
          mfaEnabled: false,
          neighborhoodId: null,
          userId: "",
        };
        result.UserAttributes.forEach(({ Name, Value }) => {
          if (Name === UserAttributes.Email) {
            userFields.email = Value;
          }
          if (Name === UserAttributes.FirstName) {
            userFields.firstName = Value;
          }
          if (Name === UserAttributes.LastName) {
            userFields.lastName = Value;
          }
          if (Name === UserAttributes.NeighborhoodID) {
            userFields.neighborhoodId = Value;
          }
          if (Name === UserAttributes.ID) {
            userFields.userId = Value;
          }
        });

        if (
          [
            userFields.firstName,
            userFields.lastName,
            userFields.email,
            userFields.userId,
          ].every((val) => !val.trim().length)
        ) {
          reject("invalid-user");
        }

        resolve({
          ...userFields,
          // FIXME: Remove this
          neighborhoodId: "test",
        });
      });
    });
  }

  public async hydrateSession(): Promise<ExposedUserFields> {
    const userData = this._userPool.getCurrentUser();

    if (!userData) {
      throw new UnauthenticatedException();
    }

    await this.getSession(userData);

    // Behaves just like logging in
    this._userInstance = userData;

    return this.getUserData();
  }

  private async getSession(user: CognitoUser): Promise<CognitoUserSession> {
    return new Promise<CognitoUserSession>((resolve, reject) => {
      user.getSession((error, session) => {
        if (error) {
          reject(error);
        }

        resolve(session);
      });
    });
  }

  public async logout(): Promise<void> {
    return new Promise<void>((resolve) => {
      this._userInstance.signOut(() => {
        resolve();
      });
    });
  }

  public async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResult> {
    const user = new CognitoUser({
      Pool: this._userPool,
      Username: email,
    });

    return new Promise<LoginResult>((resolve, reject) => {
      user.authenticateUser(
        new AuthenticationDetails({
          Username: email,
          Password: password,
        }),
        {
          onSuccess: async () => {
            const userData = await this.getUserData(user);
            // TODO: Come back to verify once settings page is done

            // let needToVerify = false;

            // try {
            //   console.log
            //   needToVerify = userData.mfaEnabled;
            // } catch (error) {
            //   console.error(error);

            //   reject("invalid-user");
            // }

            // if (needToVerify) {
            //   await this.sendLoginVerification();

            //   resolve({
            //     user: null,
            //     needToVerify: true,
            //   });
            // }

            this._userInstance = user;

            resolve({
              user: userData,
              needToVerify: false,
            });
          },
          onFailure: (error) => {
            reject(error);
          },
        }
      );
    });
  }

  /*
  private async sendLoginVerification() {}

  public async verifyLogin({
    loginCode,
    mfaCode,
  }: {
    loginCode: string;
    mfaCode: string;
  }): Promise<boolean> {}
  */

  public async register({
    firstName,
    lastName,
    email,
    password,
  }: RegisterPayload) {
    return new Promise<void>((resolve, reject) => {
      this._userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: UserAttributes.FirstName,
            Value: firstName,
          }),
          new CognitoUserAttribute({
            Name: UserAttributes.LastName,
            Value: lastName,
          }),
          new CognitoUserAttribute({
            Name: UserAttributes.NeighborhoodID,
            Value: "",
          }),
          new CognitoUserAttribute({
            Name: UserAttributes.Email,
            Value: email,
          }),
        ],
        [],
        (error) => {
          if (error) {
            reject(error);
          }

          resolve();
        }
      );
    });
  }

  public async requestForgotPasswordEmail(email: string): Promise<void> {
    const user = new CognitoUser({
      Pool: this._userPool,
      Username: email,
    });

    return new Promise<void>((resolve, reject) => {
      user.forgotPassword({
        onSuccess: () => {
          resolve();
        },
        onFailure: (error) => {
          reject(error);
        },
      });
    });
  }

  public async resetPassword({
    code,
    newPassword,
    email,
  }: {
    code: string;
    newPassword: string;
    email: string;
  }) {
    let user = this._userInstance;

    if (!user) {
      user = new CognitoUser({
        Pool: this._userPool,
        Username: email,
      });
    }

    return new Promise<void>((resolve, reject) => {
      user.confirmPassword(code, newPassword, {
        onSuccess: () => {
          resolve();
        },
        onFailure: (error) => {
          reject(error);
        },
      });
    });
  }

  public async changePassword({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._userInstance.changePassword(
        currentPassword,
        newPassword,
        (error) => {
          if (error) {
            reject(error);
          }

          resolve();
        }
      );
    });
  }

  public async updateAttributes(
    values: MutableUserFields
  ): Promise<MutableUserFields> {
    const updatedUserFields: ICognitoUserAttributeData[] = [];

    if (values.email) {
      updatedUserFields.push({
        Name: UserAttributes.Email,
        Value: values.email,
      });
    }
    if (values.firstName) {
      updatedUserFields.push({
        Name: UserAttributes.FirstName,
        Value: values.firstName,
      });
    }
    if (values.lastName) {
      updatedUserFields.push({
        Name: UserAttributes.LastName,
        Value: values.lastName,
      });
    }
    if (values.neighborhoodId) {
      updatedUserFields.push({
        Name: UserAttributes.NeighborhoodID,
        Value: values.neighborhoodId,
      });
    }

    return new Promise<MutableUserFields>((resolve, reject) => {
      this._userInstance.updateAttributes(
        updatedUserFields,
        (error, result) => {
          if (error) {
            reject(error);
          }

          console.log("update", { result });

          resolve(values);
        }
      );
    });
  }
}

export const CognitoInstance = new CognitoService({
  clientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
  userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID,
});
