import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Logo from "../../assets/logo.jpg";

// Navigation links
const Links = [
  { name: 'Accueil', path: '/' },
  { name: 'Service', path: '/services' },
  { name: 'Habitats', path: '/habitat' },
  { name: 'Contact', path: '/contact' },
];

// NavLink component
const NavLink = ({ path, children }) => (
  <Box
    as={RouterLink}
    to={path}
    px={3}
    py={2}
    rounded={'md'}
    fontWeight="bold"
    transition="all 0.2s ease-in-out"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
      transform: 'translateY(-2px)',
    }}
  >
    {children}
  </Box>
);

// Main Navbar component
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={6} boxShadow="md">
      {/* Main navigation bar */}
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        {/* Mobile menu toggle button */}
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Toggle Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
        />

        <HStack spacing={8} alignItems={'center'} w="full" justify="space-between">
          {/* Logo */}
          <Box>
            <RouterLink to="/">
              <img src={Logo} alt="logo" style={{ height: '50px' }} />
            </RouterLink>
          </Box>

          {/* Central navigation links */}
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
            w="full"
            justify="center"
          >
            {Links.map((link) => (
              <NavLink key={link.name} path={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>

          {/* Profile/Menu section */}
          <HStack spacing={4} alignItems={'center'}>
            {/* Login Button */}
            <Button
              as={RouterLink}
              to="/login"
              color="black"
              bgColor="yellow.400"
              size="sm"
              _hover={{ bg: 'teal.600' }}
            >
              Login
            </Button>
          </HStack>
        </HStack>
      </Flex>

      {/* Mobile menu */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} path={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
