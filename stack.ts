import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class AdotNamespaceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Import your existing EKS cluster
    const cluster = eks.Cluster.fromClusterAttributes(this, 'ExistingCluster', {
      clusterName: 'adot-eks-clusters', // Replace with your cluster name
      kubectlRoleArn: 'arn:aws:iam::131332286832:role/eksctl-adot-eks-clusters-cluster-ServiceRole-H1pnlT7iEYi4', // Replace with your kubectl role ARN
      openIdConnectProvider: eks.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
        this,
        'OIDCProvider',
        `arn:aws:iam::131332286832:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/883752FFF3EFBDB7B44543F17F0C3358` // Replace with your OIDC provider ID
      ),
    });

    // 2. Create the ADOT namespace
    new eks.KubernetesManifest(this, 'AdotNamespace', {
      cluster,
      manifest: [{
        apiVersion: 'v1',
        kind: 'Namespace',
        metadata: {
          name: 'adot-col',
          labels: {
            name: 'adot-col'
          }
        }
      }]
    });
  }
}
