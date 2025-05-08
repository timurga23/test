import { Flex, Loader } from '@mantine/core';

export const CenteredLoader = () => {
  return (
    <Flex justify="center" align="center" h="100vh" w="100%">
      <Loader />
    </Flex>
  );
};
