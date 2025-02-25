import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ModuleRegistry, themeQuartz } from "ag-grid-community";
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
  ValidationModule,
  SideBarModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  PivotModule
} from "ag-grid-enterprise";

// ✅ Register Modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnMenuModule,
  ContextMenuModule,
  MultiFilterModule,
  SetFilterModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ValidationModule,
  SideBarModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  PivotModule
]);

// ✅ Custom Theme
const myTheme = themeQuartz.withParams({
  backgroundColor: "#1f2836",
  foregroundColor: "#FFF",
  headerFontSize: 14,
  scrollbarThumbColor: "#555", // ✅ Fix dark scrollbar
});

// ✅ Custom Saved Views Panel
const SavedViewsPanel = () => (
  <div style={styles.savedViewsPanel}>
    <h3>📁 Saved Views</h3>
    <p>No saved views available.</p>
  </div>
);

const App = () => {
  const [rowData, setRowData] = useState(null);

  const [columnDefs] = useState([
    { field: "athlete" },
    { field: "age", filter: "agNumberColumnFilter", maxWidth: 100 },
    { field: "country", filter: "agSetColumnFilter" },
    { field: "sport", filter: "agMultiColumnFilter" },
    { field: "gold", filter: "agNumberColumnFilter", enableValue: true },
    { field: "silver", filter: "agNumberColumnFilter", enableValue: true },
    { field: "bronze", filter: "agNumberColumnFilter", enableValue: true },
    { field: "total", enableValue: true },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true, // ✅ Prevents duplicate filter icons
      enablePivot:true
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    setTimeout(() => {
      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => setRowData(data));
    }, 2000); // ✅ Add delay to see loading spinner
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Olympic Winners Data</h2>
    
      <div className="ag-theme-quartz-dark" style={styles.gridContainer}>
        <AgGridReact
          theme={myTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
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
              },
            ],
            defaultToolPanel: "columns",
          }}
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
    height: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#00000",
  },
  gridContainer: {
    width: "90%",
    height: "80vh",
    maxWidth: "1200px",
    borderRadius: "10px",
    overflow: "visible",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    scrollbarColor: "#555 #1f2836", // ✅ Light scrollbar for visibility
  },
  button: {
    marginBottom: "10px",
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#008cba",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  savedViewsPanel: {
    padding: "10px",
    color: "#fff",
    backgroundColor: "#1f2836",
    borderRadius: "5px",
    textAlign: "center",
  },
};

export default App;
