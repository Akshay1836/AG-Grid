describe("AG Grid UI Tests", () => {
        beforeEach(() => {
          cy.visit("http://localhost:5173"); // Ensure correct URL
        });
      
        it("should display the AG Grid", () => {
          cy.get(".ag-root").should("be.visible"); // Check grid is visible
        });
      
        it("should display the correct column headers", () => {
          const expectedHeaders = ["Name", "Year", "Life Cycle Stage"]; // Adjust based on your grid
      
          cy.get(".ag-header-cell-text").then(($headers) => {
            const actualHeaders = [...$headers].map((header) => header.innerText);
            expect(actualHeaders).to.include.members(expectedHeaders);
          });
        });
      
        it("should have a tool panel and open it", () => {
          cy.get(".ag-side-bar").should("exist"); // Check if sidebar exists
          cy.get(".ag-side-button[aria-label='Columns']").click(); // Open tool panel
          cy.get(".ag-column-select-panel").should("be.visible"); // Ensure it's visible
        });
      });
      