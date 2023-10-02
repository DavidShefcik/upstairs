import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";

export class Cognito extends Construct {
  public userPoolId: string;
  public userPoolClientId: string;
  private _cognitoUserPool: cognito.UserPool;
  private _cognitoUserPoolClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this._cognitoUserPool = new cognito.UserPool(this, "cognito-user-pool", {
      userPoolName: "upstairs-users",
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      mfa: cognito.Mfa.OPTIONAL,
      mfaSecondFactor: {
        otp: true,
        sms: false,
      },
      signInCaseSensitive: false,
      selfSignUpEnabled: true,
      deletionProtection: false,
      passwordPolicy: {
        minLength: 8,
        requireSymbols: false,
        requireLowercase: false,
        requireUppercase: false,
        requireDigits: false,
      },
      deviceTracking: {
        challengeRequiredOnNewDevice: true,
        deviceOnlyRememberedOnUserPrompt: false,
      },
      standardAttributes: {
        givenName: {
          required: true,
        },
        familyName: {
          mutable: true,
          required: true,
        },
        email: {
          mutable: true,
          required: true,
        },
      },
      customAttributes: {
        neighborhoodId: new cognito.StringAttribute({
          mutable: true,
        }),
      },
      autoVerify: {
        email: true,
      },
    });
    this._cognitoUserPool.addDomain("cognito-domain", {
      cognitoDomain: {
        domainPrefix: "upstairs",
      },
    });

    const cognitoClientAttributes = new cognito.ClientAttributes()
      .withStandardAttributes({
        email: true,
        givenName: true,
        familyName: true,
      })
      .withCustomAttributes("neighborhoodId");

    this._cognitoUserPoolClient = new cognito.UserPoolClient(
      this,
      "cognito-user-pool-client",
      {
        userPool: this._cognitoUserPool,
        userPoolClientName: "upstairs-web",
        readAttributes: cognitoClientAttributes,
        writeAttributes: cognitoClientAttributes,
      }
    );

    this.userPoolId = this._cognitoUserPool.userPoolId;
    this.userPoolClientId = this._cognitoUserPoolClient.userPoolClientId;
  }
}
