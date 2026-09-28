{
  "id": "300000334070492",
  "name": "XDX Supplier Core App 20260926",
  "internalName": "XDX Supplier Core App 20260926",
  "code": "XDX_SUPPLIER_CORE_APP_20260926",
  "internalDescription": "Query and create suppliers, addresses, sites and contacts with exact approval and persisted verification.",
  "status": "DRAFT",
  "version": 1,
  "specification": {
    "applicationMetadata": {
      "title": "XDX Supplier Core App 20260926",
      "enableFileUpload": false,
      "pagePattern": "swimlanesPattern",
      "pageConfig": {
        "layout": "1",
        "agentContainers": [
          {
            "id": "supplier_core_container",
            "title": "XDX Supplier Core Advisor",
            "agents": [
              "supplier_core"
            ]
          }
        ],
        "firstLane": [
          "supplier_core_container"
        ],
        "secondLane": []
      },
      "agents": {
        "supplier_core": {
          "agent": "XDX_SUPPLIER_CORE_20260926",
          "includeInSummary": false,
          "includeInActions": false,
          "includeInCommunications": false,
          "name": "XDX Supplier Core Advisor",
          "useDraftWorkflowWhileDeveloping": true
        }
      },
      "communications": [],
      "initiallyHideActions": "all"
    }
  }
}
