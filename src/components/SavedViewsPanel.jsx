import React from 'react'

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
export default SavedViewsPanel