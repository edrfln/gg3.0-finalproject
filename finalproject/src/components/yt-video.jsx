import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Video = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/videos/${id}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box>
      <Heading pb={'3px'} size={'lg'}>
        {data.title}
      </Heading>
      <Box rounded={'lg'}>
        <iframe
          width={'100%'}
          height={'350px'}
          src={data.videoUrl}
          frameborder="0"
        ></iframe>
      </Box>
    </Box>
  );
};

export default Video;
