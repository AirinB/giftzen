import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './Containers/App';

const rootElement = document.getElementById('root');

render(
  <BrowserRouter>
    <Routes>
      <Route path="/public/*" element={<App isPrivate={false} />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
