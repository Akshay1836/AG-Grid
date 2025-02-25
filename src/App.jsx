import React, { useCallback, useMemo, useState } from "react";
import { ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColumnMenuModule,
  ContextMenuModule,
  MultiFilterModule,
  SetFilterModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  SideBarModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  MenuModule,
  RowGroupingModule,
  PivotModule, // ✅ Added Pivot Module
} from "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// ✅ Custom styles for better UI

// ✅ Register all necessary modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnMenuModule,
  ContextMenuModule,
  MultiFilterModule,
  SetFilterModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  SideBarModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  MenuModule,
  RowGroupingModule,
  PivotModule, // ✅ Register Pivot Module
]);

// ✅ Custom "Saved Views" Panel
const SavedViewsPanel = () => {
  const [views, setViews] = useState([]);

  const saveCurrentView = () => {
    const viewName = prompt("Enter a name for this view:");
    if (viewName) {
      setViews([...views, viewName]);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Saved Views</h3>
      <button onClick={saveCurrentView} style={styles.button}>
        ➕ Save Current View
      </button>
      <ul>
        {views.length > 0 ? views.map((view, index) => (
          <li key={index}>{view}</li>
        )) : <p>No saved views</p>}
      </ul>
    </div>
  );
};


const App = () => {
  const [rowData, setRowData] = useState([]);
  console.log(rowData);
  
  const [columnDefs] = useState([
    { field: "athlete", filter: "agTextColumnFilter", sortable: true, enableRowGroup: true, enablePivot: true },
    { field: "age", filter: "agNumberColumnFilter", maxWidth: 100, sortable: true },
    { field: "date", filter: "agDateColumnFilter", sortable: true },
    { field: "country", filter: "agSetColumnFilter", sortable: true, enableRowGroup: true, enablePivot: true },
    { field: "sport", filter: "agMultiColumnFilter", sortable: true, enableRowGroup: true, enablePivot: true },
    { field: "gold", filter: "agNumberColumnFilter", sortable: true, enableValue: true },
    { field: "silver", filter: "agNumberColumnFilter", sortable: true, enableValue: true },
    { field: "bronze", filter: "agNumberColumnFilter", sortable: true, enableValue: true },
    { field: "total", sortable: false, enableValue: true,aggFunc:"sum"},
  ]);
  const pivotPanelShow = 'onlyWhenPivoting';
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    floatingFilter: false,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"], // ✅ Added column menu
  }), []);

  const onGridReady = useCallback((params) => {
    params.api.showLoadingOverlay(); // ✅ Show built-in loading overlay
    setTimeout(() => {
      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => {
          setRowData(data);
          params.api.hideOverlay(); // ✅ Hide overlay after data loads
        })
        .catch(() => {
          params.api.showNoRowsOverlay(); // ✅ Show error message if data fails
        });
    }, 2000); 
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Olympic Winners Data</h2>
      <div className="ag-theme-alpine" style={styles.gridContainer}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pivotPanelShow={"always"}
          overlayLoadingTemplate={
            '<span class="ag-overlay-loading-center">⏳ Loading Data...</span>'
          }
          overlayNoRowsTemplate={
            '<span class="ag-overlay-no-rows-center">🚫 No data available</span>'
          }
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
                toolPanelParams: {
                  suppressRowGroups: false,
                  suppressValues: false,
                  suppressPivots: false,
                  suppressPivotMode: false, // ✅ Allows toggling Pivot Mode
                },
              },
              {
                id: "filters",
                labelDefault: "Filters",
                iconKey: "filter",
                toolPanel: "agFiltersToolPanel",
              },
              {
                id: "savedViews",
                labelDefault: "Saved Views",
                toolPanel: SavedViewsPanel, // ✅ Registering custom panel
              }
            ],
            defaultToolPanel: "columns", // ✅ Default to column panel for easy pivoting
          }}
          pivotMode={false} // ✅ Enables Pivot Mode
        />
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
     // ✅ Full width of the viewport
    height: "100vh", // ✅ Full height of the viewport
    maxHeight: "100vh", // ✅ Ensures it doesn't exceed screen height
    
    overflow: "hidden", // ✅ Prevents extra scrolling
  },
  title: {
    
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  gridContainer: {
    width: "90%",
    height: "80vh", // ✅ Adjusted to take most of the screen height
    maxWidth: "1200px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
};

export default App;
