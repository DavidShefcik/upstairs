import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { FrontendS3 } from "./constructs/FrontendS3";
import { Cognito } from "./constructs/Cognito";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudfrontUrl = new FrontendS3(this, "upstairs-frontend")
      .CloudfrontDistributionDomain;
    const {
      userPoolId: cognitoUserPoolId,
      userPoolClientId: cognitoUserPoolClientId,
    } = new Cognito(this, "upstairs-cognito");

    new cdk.CfnOutput(this, "FrontendURL", {
      value: cloudfrontUrl,
    });
    new cdk.CfnOutput(this, "CognitoUserPoolId", {
      value: cognitoUserPoolId,
    });
    new cdk.CfnOutput(this, "CognitoUserPoolClientId", {
      value: cognitoUserPoolClientId,
    });
  }
}
