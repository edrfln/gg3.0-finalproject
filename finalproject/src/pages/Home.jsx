import { ChakraProvider, theme, Grid, Box } from '@chakra-ui/react';
import Videos from '../components/vids-cards';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/videos')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box pt={'10px'}>
        <Grid templateColumns="repeat(6,1fr)" gap={5} justifyItems={'center'}>
          {data.map(item => (
            <Link key={'item._id'} to={`/detail/${item._id}`}>
              <Videos
                id={item._id}
                thumbnailUrl={item.thumbnailUrl}
                title={item.title}
                videoUrl={item.videoUrl}
              />
            </Link>
          ))}
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
