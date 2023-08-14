import {
  Card,
  Image,
  CardFooter,
  Center,
  Link,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';

const Product = ({ url, title, price, pic }) => {
  return (
    <Link href={url} isExternal>
      <Card height={'200px'} width={'200px'} variant={'outline'}>
        <Image
          src={pic}
          borderRadius={'8px 8px 0px 0px'}
          w={'100%'}
          h={'70%'}
          objectFit={'cover'}
        />
        <CardFooter
          backgroundColor={'black'}
          color={'white'}
          borderRadius={'0px 0px 8px 8px'}
          h={'30%'}
          p={2}
        >
          <Center w={'100%'}>
            <Stack justify={'center'} alignItems={'center'}>
              <Heading size={'sm'} noOfLines={1}>
                {title}
              </Heading>
              <Text fontSize={'xs'}>{`Rp. ${price}`}</Text>
            </Stack>
          </Center>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Product;
