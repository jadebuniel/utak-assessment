import { Container, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Container
      display='flex'
      justifyContent='space-between'
      margin='unset'
      pt='3rem'
      pb='1rem'
      px='4rem'
      maxW='unset'
    >
      <Container display='flex' flexDir='column' margin='unset'>
        <Text fontWeight='bold' textTransform='uppercase' letterSpacing='3px'>
          scratch
        </Text>
        <Container h='8px' w='7rem' bgColor='black' margin='unset'></Container>
        <Text
          textTransform='uppercase'
          mt='1'
          fontSize='12px'
          fontWeight='semibold'
          letterSpacing='3px'
        >
          since 2012
        </Text>
      </Container>
      <Container
        w='4rem'
        h='4rem'
        m='unset'
        bgColor='black'
        color='white'
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'
      >
        <Text fontWeight='bold' letterSpacing='3px'>
          ME
        </Text>
        <Text fontWeight='bold' letterSpacing='3px'>
          NU
        </Text>
      </Container>
    </Container>
  );
};

export default Header;
