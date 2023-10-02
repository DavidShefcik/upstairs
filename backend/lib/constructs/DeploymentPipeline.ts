import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";

type DeploymentPipelineProps = cdk.StackProps & {
  frontendS3Bucket: s3.Bucket;
  frontendCloudfrontDistribution: cloudfront.Distribution;
};

export class DeploymentPipeline extends Construct {
  public PipelineRoleARN: string;
  private _githubOpenIDConnectProvider: iam.OpenIdConnectProvider;
  private _githubOpenIDConnectPrincipal: iam.OpenIdConnectPrincipal;
  private _pipelineRole: iam.Role;
  private _frontendDeploymentPipelinePolicy: iam.PolicyStatement;
  private _backendDeploymentPipelinePolicy: iam.PolicyStatement;

  constructor(scope: Construct, id: string, props: DeploymentPipelineProps) {
    super(scope, id);

    this._githubOpenIDConnectProvider = new iam.OpenIdConnectProvider(
      this,
      "github-openid-connect-provider",
      {
        url: "https://token.actions.githubusercontent.com",
        thumbprints: [
          "6938fd4d98bab03faadb97b34396831e3780aea1",
          "1c58a3a8518e8759bf075b76b750d4f2df264fcd",
        ],
        clientIds: ["sts.amazonaws.com"],
      }
    );
    this._githubOpenIDConnectPrincipal = new iam.OpenIdConnectPrincipal(
      this._githubOpenIDConnectProvider,
      {
        StringEquals: {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub":
            "repo:DavidShefcik/upstairs:ref:refs/heads/ci-config",
        },
      }
    );

    this._pipelineRole = new iam.Role(this, "pipeline-role", {
      roleName: "upstairs-deployment-pipeline",
      assumedBy: this._githubOpenIDConnectPrincipal,
    });

    this._frontendDeploymentPipelinePolicy = new iam.PolicyStatement({
      sid: "AllowFrontendDeployment",
      resources: [props.frontendS3Bucket.arnForObjects("*")],
      actions: ["s3:PutObject"],
    });
    // this._backendDeploymentPipelinePolicy = new iam.PolicyStatement({
    //   sid: "AllowBackendDeployment",
    // });

    this._pipelineRole.addToPolicy(this._frontendDeploymentPipelinePolicy);
    // this._pipelineRole.addToPolicy(this._backendDeploymentPipelinePolicy);

    this.PipelineRoleARN = this._pipelineRole.roleArn;
  }
}
