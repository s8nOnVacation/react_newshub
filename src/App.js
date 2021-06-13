import React from 'react';
import { NewsContextProvider } from "./NewsContext";
import News from "./News";
import './App1.css';

function App() {
  return (
    <NewsContextProvider>
      <News />
    </NewsContextProvider>
  );
}

export default App;
