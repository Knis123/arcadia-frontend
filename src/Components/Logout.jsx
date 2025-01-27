import React, { useContext } from 'react';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Box, Text, Icon, HStack } from '@chakra-ui/react';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/login"); 
    } catch (err) {
      console.error("Logout error:", err); 
    }
  };

  return (
    <HStack
      className="logout"
      as="button"
      onClick={handleLogout}
      spacing={2}
      p={2}
      rounded="md"
     
    >
      <Icon as={CiLogout} boxSize={5} />
      
    </HStack>
  );
}

export default Logout;