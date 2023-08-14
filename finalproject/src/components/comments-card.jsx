import { Stack, Heading, Card, CardBody, Text, Avatar } from '@chakra-ui/react';

const Comments = ({ username, text, timestamp }) => {
  return (
    <Card variant={'outline'} w={'100%'}>
      <CardBody>
        <Stack direction={'row'} pb={'5pt'}>
          <Avatar bg="teal.500" size={'xs'} />
          <Heading size={'sm'}>{username}</Heading>
        </Stack>
        <Text>{text}</Text>
        <Text fontSize={'xs'} as={'i'} opacity={'50%'}>
          {timestamp}
        </Text>
      </CardBody>
    </Card>
  );
};

export default Comments;
