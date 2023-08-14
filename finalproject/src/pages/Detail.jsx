import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  GridItem,
  Stack,
  Heading,
  ChakraProvider,
  theme,
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  Text,
  Center,
  useToast,
} from '@chakra-ui/react';

import Comments from '../components/comments-card';
import Product from '../components/products-card';
import Video from '../components/yt-video';

const Detail = () => {
  const { id } = useParams();
  const [products, setData] = useState([]);
  const [comments, setComments] = useState([]);

  //GET
  useEffect(() => {
    fetch(`/videos/${id}/products`)
      .then(response => response.json())
      .then(products => {
        setData(products);
        console.log('Products ', products);
      })
      .catch(error => console.error('Error fetching products:', error));

    fetch(`/videos/${id}/comments`)
      .then(response => response.json())
      .then(comments => setComments(comments))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    text: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const successToast = useToast({
    status: 'success',
    title: 'Success',
    description: 'Success submitted your comment!',
    position: 'top',
  });

  const errorToast = useToast({
    status: 'error',
    title: 'Failed',
    position: 'top',
    description: 'Failed to add comment, try again later',
    duration: 5000,
    isClosable: true,
  });

  //POST
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`/videos/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        successToast({});
        console.log('Comment posted successfully');
        setTimeout(() => window.location.reload(), 500);

        setFormData({
          username: '',
          commentText: '',
        });
      } else {
        console.log('Error posting comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const usnBlank = formData.username === '';
  const commentBlank = formData.text === '';

  return (
    <ChakraProvider theme={theme}>
      <Box m={'24px'}>
        <Grid
          h="650px"
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem colSpan={4} rowSpan={2}>
            <Video />
          </GridItem>
          <GridItem rowSpan={3} colSpan={1}>
            <Heading pb={'3px'} size={'lg'}>
              Comments
            </Heading>
            <Box
              borderRadius={'lg'}
              bg={'blackAlpha.50'}
              height={'65%'}
              mb="20pt"
              overflow={'auto'}
            >
              {comments.length === 0 ? (
                <Center h={'100%'}>There's no comment yet</Center>
              ) : (
                <Box m={'4pt'}>
                  <VStack spacing="4pt" w={'100%'}>
                    {comments.map(item => (
                      <Comments
                        username={item.username}
                        text={item.text}
                        timestamp={item.timestamp}
                      />
                    ))}
                  </VStack>
                </Box>
              )}
            </Box>
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={usnBlank && commentBlank}>
                {!usnBlank && !commentBlank ? (
                  <Stack direction={'column'} spacing={'5pt'}>
                    <Input
                      name="username"
                      placeholder="Your Name"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <Textarea
                      name="text"
                      value={formData.text}
                      placeholder="Let the seller know what are you thinking"
                      onChange={handleChange}
                    ></Textarea>
                    <Button colorScheme="teal" variant="solid" type="submit">
                      Submit
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction={'column'} spacing={'5pt'}>
                    <Input
                      name="username"
                      placeholder="Your Name"
                      value={formData.username}
                      onChange={handleChange}
                      isInvalid
                    />
                    <Textarea
                      name="text"
                      value={formData.text}
                      placeholder="Let the seller know what are you thinking"
                      onChange={handleChange}
                      isInvalid
                    ></Textarea>
                    <Button colorScheme="teal" variant="solid" isDisabled>
                      Submit
                    </Button>
                  </Stack>
                )}
              </FormControl>
            </form>
            {/* <Text mb="8px">Name:</Text> */}
          </GridItem>
          <GridItem colSpan={4}>
            {products.length === 0 ? (
              <Box
                w={'100%'}
                h={'100%'}
                borderRadius={'lg'}
                bg={'blackAlpha.50'}
              >
                <Center w={'100%'} h={'100%'}>
                  <Text>There's no product yet</Text>
                </Center>
              </Box>
            ) : (
              <Stack direction={'row'} spacing="24px" overflow={'auto'}>
                {products.map(product => (
                  <Product
                    url={product.url}
                    title={product.title}
                    price={product.price}
                    pic={product.pic}
                  />
                ))}
              </Stack>
            )}
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
export default Detail;
