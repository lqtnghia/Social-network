import { Button } from '@mui/material';
import { useState } from 'react';

function HomePage() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Home Page</p>
      <p>Count: {count}</p>
      <Button
        variant="contained"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        SUBMIT
      </Button>
    </div>
  );
}

export default HomePage;
