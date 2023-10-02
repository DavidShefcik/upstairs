import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { FrontendS3 } from "./constructs/FrontendS3";
import { Cognito } from "./constructs/Cognito";
import { DeploymentPipeline } from "./constructs/DeploymentPipeline";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const frontend = new FrontendS3(this, "upstairs-frontend");
    const {
      userPoolId: cognitoUserPoolId,
      userPoolClientId: cognitoUserPoolClientId,
    } = new Cognito(this, "upstairs-cognito");
    const pipelineRoleARN = new DeploymentPipeline(
      this,
      "upstairs-deployment-pipeline",
      {
        frontendS3Bucket: frontend.S3Bucket,
        frontendCloudfrontDistribution: frontend.CloudfrontDistribution,
      }
    ).PipelineRoleARN;

    new cdk.CfnOutput(this, "FrontendURL", {
      value: frontend.CloudfrontDistributionDomain,
    });
    new cdk.CfnOutput(this, "CognitoUserPoolId", {
      value: cognitoUserPoolId,
    });
    new cdk.CfnOutput(this, "CognitoUserPoolClientId", {
      value: cognitoUserPoolClientId,
    });
    new cdk.CfnOutput(this, "PipelineRoleARN", {
      value: pipelineRoleARN,
    });
  }
}
