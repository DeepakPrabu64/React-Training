import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function Timer() {
  const [count, setCount] = useState(0);

useEffect(() => { //Runs only on the first render 
}, []);

  return <h1>I've rendered {count} times!</h1>;
}

createRoot(document.getElementById('root')).render(
  <Timer />
);