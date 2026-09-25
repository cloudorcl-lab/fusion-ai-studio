{
  "name": "XDX Supplier Core 20260924",
  "internalName": "XDX Supplier Core 20260924",
  "code": "XDX_SUPPLIER_CORE_APP_20260924",
  "internalDescription": "Query and approved create for suppliers, addresses, sites and contacts only.",
  "status": "DRAFT",
  "version": 1,
  "specification": {
    "applicationMetadata": {
      "title": "XDX Supplier Core 20260924",
      "enableFileUpload": false,
      "pagePattern": "swimlanesPattern",
      "pageConfig": {
        "layout": "1",
        "agentContainers": [
          {
            "id": "supplierCorePanel",
            "title": "Supplier Core",
            "agents": [
              "supplierCore"
            ]
          }
        ],
        "firstLane": [
          "supplierCorePanel"
        ],
        "secondLane": []
      },
      "agents": {
        "supplierCore": {
          "agent": "XDX_SUPPLIER_CORE_20260924",
          "includeInSummary": false,
          "includeInActions": false,
          "includeInCommunications": false,
          "name": "Supplier Core",
          "displayPrompt": "Display the first supplier page with all supplied business fields and paging, using multiRecordWidget. Distinguish errors from no matches.",
          "useDraftWorkflowWhileDeveloping": true,
          "displayWidgetList": [
            "ORA_LAYOUT_MULTIRECORD",
            "ORA_LAYOUT_CARD"
          ]
        }
      },
      "communications": [],
      "initiallyHideActions": "all"
    }
  }
}
