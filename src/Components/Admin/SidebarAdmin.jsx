import React, { useContext } from 'react';
import {
  Box,
  VStack,
  IconButton,
  Icon,
  Tooltip,
  Avatar,
  Text,
  Divider,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineHome } from 'react-icons/ai';
import { RiServiceLine } from 'react-icons/ri';
import { FaPaw } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import Logout from '../Logout';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useContext(AuthContext);

  // Define colors based on the current color mode
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const activeBgColor = useColorModeValue('green.500', 'green.300');
  const activeIconColor = useColorModeValue('white', 'gray.900');
  const hoverBgColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.100');

  // Navigation Links
  const TabLinks = [
    { label: 'Vet Register', icon: AiOutlineUser },
    { label: 'Employee Register', icon: AiOutlineUser },
    { label: 'Services', icon: RiServiceLine },
    { label: 'Animals', icon: FaPaw },
    { label: 'Habitat', icon: AiOutlineHome },
  ];

  // Determine the layout for smaller screens
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg={bgColor}
      w={isMobile ? 'full' : '80px'}
      minH={isMobile ? 'auto' : '100vh'}
      p={isMobile ? 2 : 4}
      display="flex"
      flexDirection={isMobile ? 'row' : 'column'}
      alignItems="center"
      justifyContent={isMobile ? 'space-between' : 'space-between'}
      boxShadow="lg"
    >
      {/* Top Section: User Info */}
      {!isMobile && (
        <VStack spacing={6} align="center" w="full">
          <Avatar
            size="lg"
            src="https://bit.ly/broken-link"
            borderColor={activeBgColor}
            borderWidth={2}
          />
          <Text
            color={textColor}
            fontWeight="bold"
            fontSize="sm"
            textAlign="center"
            noOfLines={1}
          >
            {user.name || 'Admin'}
          </Text>
        </VStack>
      )}

      {/* Middle Section: Navigation */}
      <VStack
        spacing={4}
        mt={isMobile ? 0 : 8}
        align="center"
        w="full"
        flex={isMobile ? '1' : 'none'}
      >
        {TabLinks.map((tab, index) => (
          <Tooltip label={tab.label} placement={isMobile ? 'top' : 'right'} key={tab.label}>
            <IconButton
              aria-label={tab.label}
              icon={<Icon as={tab.icon} boxSize={5} />}
              size="lg"
              variant="ghost"
              bg={activeTab === index ? activeBgColor : 'transparent'}
              color={activeTab === index ? activeIconColor : 'gray.500'}
              _hover={{ bg: hoverBgColor }}
              onClick={() => setActiveTab(index)}
              isActive={activeTab === index}
              _active={{
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                bg: 'none',
                color: 'inherit',
              }}
              borderRadius="md"
            />
          </Tooltip>
        ))}
      </VStack>

      {/* Footer Section */}
      {!isMobile && (
        <Box mt={8} w="full">
          <Logout />
          <Divider mb={4} />
          <Text fontSize="0.7rem" color="gray.500" textAlign="center">
            Arcadia © 2025
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
