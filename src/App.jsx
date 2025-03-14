import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise"; // ✅ Ensure AG Grid Enterprise is loaded

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
  PivotModule,
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
  PivotModule,
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

  const rowData = [
    {
      year: 2023,
      financial_activity_description: "Investment Advisory",
      financial_product_description: "Mutual Funds",
      life_cycle_stage: "Growth",
      ofg: "Yes",
      siglum: "A1"
    },
    {
      year: 2022,
      financial_activity_description: "Loan Processing",
      financial_product_description: "Home Loan",
      life_cycle_stage: "Maturity",
      ofg: "No",
      siglum: "B2"
    },
    {
      year: 2021,
      financial_activity_description: "Insurance Underwriting",
      financial_product_description: "Life Insurance",
      life_cycle_stage: "Introduction",
      ofg: "Yes",
      siglum: "C3"
    },
    {
      year: 2020,
      financial_activity_description: "Wealth Management",
      financial_product_description: "Equity Funds",
      life_cycle_stage: "Expansion",
      ofg: "No",
      siglum: "D4"
    },
    {
      year: 2019,
      financial_activity_description: "Financial Planning",
      financial_product_description: "Retirement Plans",
      life_cycle_stage: "Decline",
      ofg: "Yes",
      siglum: "E5"
    }
  ];
  

  const columnDefs = [
    { field: "siglum", headerName: "Siglum", filter: true },
    { field: "year", headerName: "Year", filter: true, enableRowGroup: true, minWidth: 150 },
    { field: "life_cycle_stage", headerName: "Life Cycle Stage", filter: true, enableRowGroup: true, width: 250, minWidth: 200 },
    { field: "ofg", headerName: "OFG", filter: true, enableRowGroup: true, minWidth: 150 },
    { field: "financial_activity_description", headerName: "Financial Activity", filter: true, enableRowGroup: true, width: 250, minWidth: 200 },
    { field: "financial_product_description", headerName: "Financial Product", filter: true, enableRowGroup: true, minWidth: 200 },
   
 // Assuming siglum should also have a filter
  ];

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true, // ✅ Prevents duplicate filter icons
      enablePivot: true,
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
  const gridOptions = {
    groupIncludeTotalFooter: true, // ✅ Shows total row at the bottom
    groupIncludeFooter: true, // ✅ Shows subtotal for each group
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Olympic Winners Data</h2>

      <div className="ag-theme-quartz" style={styles.gridContainer}>
        <AgGridReact
          gridOptions={gridOptions}
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
                toolPanel: SavedViewsPanel,
              },
            ],
            defaultToolPanel: "columns",
          }}
          enableRangeSelection={true} // ✅ Allows row selection for aggregation
          statusBar={{
            statusPanels: [
              { statusPanel: "agTotalRowCountComponent", align: "left" }, // ✅ Shows total row count
              { statusPanel: "agAggregationComponent", align: "right" }, // ✅ Shows sum, avg, min, max
            ],
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
   
    overflow: "hidden",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#00000",
  },
  gridContainer: {
    width: "90%",
    height: "100vh",
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
