import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class TypeScriptLambdaFunction extends NodejsFunction {
  constructor(scope: Construct, id: string, props: NodejsFunctionProps) {
    super(scope, id, {
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        sourceMap: true,
        minify: true,
      },
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
      },
      ...props,
    });
  }
}
