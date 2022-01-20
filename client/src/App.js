import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hello" element={<div>hello</div>} />
      </Routes>
    </Router>
  );
}

export default App;
