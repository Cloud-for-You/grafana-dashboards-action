# grafana-dashboards-action

Use
```
- name: Generate directory to k8s manifests
  uses: Cloud-for-You/grafana-dashboards-action@main
  with:
    working-directory: ${{ env.WORKING_DIRECTORY }}
    tmp-directory: ${{ env.TMP_DIRECTORY }}
    config-file-name: config.yaml
```
