{
  "name": "XDX Supplier Core",
  "internalName": "XDX Supplier Core",
  "code": "XDX_SUPPLIER_CORE",
  "internalDescription": "Query and create suppliers and their addresses, sites and contacts with exact payload approval, parent-scoped child operations and independent persisted verification.",
  "status": "DRAFT",
  "version": 1,
  "specification": {
    "applicationMetadata": {
      "title": "XDX Supplier Core",
      "enableFileUpload": false,
      "pagePattern": "swimlanesPattern",
      "pageConfig": {
        "layout": "1",
        "agentContainers": [
          {
            "id": "supplier_core_panel",
            "title": "Supplier Core",
            "agents": [
              "supplier_core"
            ]
          }
        ],
        "firstLane": [
          "supplier_core_panel"
        ],
        "secondLane": []
      },
      "agents": {
        "supplier_core": {
          "agent": "XDX_SUPPLIER_CORE",
          "includeInSummary": false,
          "includeInActions": false,
          "includeInCommunications": false,
          "name": "Supplier Core",
          "displayPrompt": "Display exactly one introduction card: This app helps you manage suppliers. Do not fetch or list records at startup.",
          "useDraftWorkflowWhileDeveloping": true,
          "displayWidgetList": [
            "ORA_LAYOUT_CARD"
          ]
        }
      },
      "communications": [],
      "subTitle": "Find and create suppliers, addresses, sites and contacts",
      "initiallyHideActions": "all"
    }
  }
}
