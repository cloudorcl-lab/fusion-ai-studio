{
  "id": "300000333988549",
  "name": "XDX Supplier Lifecycle",
  "internalName": "XDX Supplier Lifecycle",
  "code": "XDX_SUPPLIER_LIFECYCLE",
  "internalDescription": "Find and manage required-field supplier lifecycle transactions with explicit review and confirmation.",
  "status": "DRAFT",
  "version": 1,
  "specification": {
    "applicationMetadata": {
      "title": "XDX Supplier Lifecycle",
      "enableFileUpload": false,
      "pagePattern": "swimlanesPattern",
      "pageConfig": {
        "layout": "1",
        "agentContainers": [
          {
            "id": "xdx_supplier_panel",
            "title": "XDX Supplier Advisor",
            "agents": [
              "xdx_supplier_advisor"
            ],
            "panelId": "xdx_supplier_panel"
          }
        ],
        "firstLane": [
          "xdx_supplier_panel"
        ],
        "secondLane": []
      },
      "agents": {
        "xdx_supplier_advisor": {
          "agent": "XDX_SUPPLIER_LIFECYCLE_AGENT",
          "includeInSummary": false,
          "includeInActions": false,
          "includeInCommunications": false,
          "name": "XDX Supplier Advisor",
          "displayPrompt": "Welcome the user and explain how to search suppliers by name.",
          "useDraftWorkflowWhileDeveloping": true,
          "displayWidgetList": [
            "ORA_LAYOUT_CARD"
          ]
        }
      },
      "communications": [],
      "subTitle": "Search suppliers and review their business details.",
      "initiallyHideActions": "all",
      "queryAgent": "XDX_SUPPLIER_LIFECYCLE_AGENT"
    }
  }
}
