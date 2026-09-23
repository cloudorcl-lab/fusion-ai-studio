{
  "id": "300000333951268",
  "name": "XDX Supplier Lifecycle",
  "internalName": "XDX Supplier Lifecycle",
  "code": "XDX_SUPPLIER_LIFECYCLE",
  "internalDescription": "Ask Oracle supplier lifecycle experience.",
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
            "id": "supplierLifecyclePanel",
            "title": "Supplier Lifecycle Advisor",
            "agents": [
              "supplierLifecycleAdvisor"
            ],
            "panelId": "supplier_lifecycle",
            "initDisplayPromptOverride": "Render the supplier lifecycle orientation using one messageListWidget with exactly two items: Query suppliers, and Create with confirmation. Do not add actions or claim a write occurred.",
            "initDisplayWidgetListOverride": [
              "ORA_LAYOUT_MESSAGES_LIST"
            ]
          }
        ],
        "firstLane": [
          "supplierLifecyclePanel"
        ],
        "secondLane": []
      },
      "agents": {
        "supplierLifecycleAdvisor": {
          "agent": "XDX_SUPPLIER_LIFECYCLE_AGENT",
          "includeInSummary": true,
          "includeInActions": true,
          "includeInCommunications": false,
          "name": "XDX Supplier Lifecycle Advisor",
          "activeExpression": "true",
          "displayPrompt": "Render a messageListWidget that explains the supplier query and required-field create-confirm lifecycle. Do not invent supplier data or imply that a write occurred.",
          "summaryPrompt": "Summarize the supplier lifecycle capability without claiming any record was created.",
          "actionsPrompt": "Suggest using Ask Oracle to query suppliers or begin a required-field create and confirmation flow.",
          "useDraftWorkflowWhileDeveloping": true,
          "displayWidgetList": [
            "ORA_LAYOUT_MESSAGES_LIST"
          ]
        }
      },
      "communications": [],
      "autoTranslate": true,
      "queryAgent": "XDX_SUPPLIER_LIFECYCLE_AGENT"
    }
  }
}
