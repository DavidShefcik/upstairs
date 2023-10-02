import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cdk from "aws-cdk-lib";

export class FrontendS3 extends Construct {
  private _s3Bucket: s3.Bucket;
  private _cloudfrontDistribution: cloudfront.Distribution;
  public CloudfrontDistributionDomain: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this._s3Bucket = new s3.Bucket(this, "frontend-s3-bucket", {
      bucketName: "upstairs-frontend-bucket",
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const s3OriginAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "upstairs-access-identity"
    );

    const s3Origin = new cdk.aws_cloudfront_origins.S3Origin(this._s3Bucket, {
      originPath: "/",
      originAccessIdentity: s3OriginAccessIdentity,
    });

    this._cloudfrontDistribution = new cloudfront.Distribution(
      this,
      "upstairs-frontend",
      {
        defaultBehavior: {
          origin: s3Origin,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: cdk.Duration.seconds(10),
          },
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: cdk.Duration.seconds(10),
          },
        ],
      }
    );

    this._s3Bucket.grantRead(s3OriginAccessIdentity);

    this.CloudfrontDistributionDomain = this._cloudfrontDistribution.domainName;
  }
}
