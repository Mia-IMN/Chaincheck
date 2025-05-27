import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import DefaultLayout from './layouts/DefaultLayout';

// Pages
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
