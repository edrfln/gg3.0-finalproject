import { Card, Heading, CardFooter, Image, Stack } from '@chakra-ui/react';

const Videos = ({ title, thumbnailUrl }) => {
  return (
    <Card height={'300px'} width={'200px'} variant={'elevated'}>
      <Image
        src={thumbnailUrl}
        borderRadius={'8px 8px 0px 0px'}
        w={'100%'}
        h={'100%'}
        objectFit={'cover'}
      />
      <CardFooter
        backgroundColor={'black'}
        color={'white'}
        borderRadius={'0px 0px 8px 8px'}
        h={'70px'}
        p={2}
      >
        <Stack spacing={'0'} justify={'center'} pl={2} pr={2}>
          <Heading size={'sm'} noOfLines={2}>
            {title}
          </Heading>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default Videos;
