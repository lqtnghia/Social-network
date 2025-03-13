import { Button } from '@mui/material';
import { useGetAuthUserQuery } from '@services/rootApi';
import { Navigate } from 'react-router-dom';

function HomePage() {
  const response = useGetAuthUserQuery();
  console.log(response);

  // if (response?.data?._id) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <p>Home Page</p>
      <Button variant="contained">Input</Button>
    </div>
  );
}

export default HomePage;
