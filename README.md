# grafana-dashboards-action

This action provides the following functionality for GitHub Actions users:
- According to the settings in the folder, all JSON dashboards stored in the K8S folder will generate manifests of the kind: GrafanaDashboards

## Usage
```
- name: Generate directory to k8s manifests
  uses: Cloud-for-You/grafana-dashboards-action@main
  with:
    working-directory: ${{ env.WORKING_DIRECTORY }}
    tmp-directory: ${{ env.TMP_DIRECTORY }}
    config-file-name: config.yaml
```


