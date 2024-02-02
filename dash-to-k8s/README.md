# dash-to-k8s

This action provides the following functionality for GitHub Actions users:
- Recursively search all folders and if it contains a configuration file, process all dashboards and prepare them for deployment to the K8S cluster

*K8S cluster must contain grafana-operator and its API*

## Usage
```yaml
- name: Generate directory to k8s manifests
  uses: Cloud-for-You/grafana-dashboards-action@main
  with:
    working-directory: ${{ env.WORKING_DIRECTORY }}
    tmp-directory: ${{ env.TMP_DIRECTORY }}
    config-file-name: config.yaml
```