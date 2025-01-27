import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { MdEmail, MdPhone } from 'react-icons/md'; // Icônes pour l'email et le téléphone
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Icônes pour les réseaux sociaux
import { HiLocationMarker } from 'react-icons/hi'; // Icône pour la localisation
import contactImage from '../../assets/giraffe-wild.jpg'; // Image d'arrière-plan pour la section de contact

const Contact = () => {
  // Définition des couleurs dynamiques basées sur le mode clair ou sombre
  const bgColor = useColorModeValue('black', 'gray.800'); // Couleur de fond
  const textColor = useColorModeValue('gray.800', 'gray.200'); // Couleur du texte
  const accentColor = useColorModeValue('geen.800', 'orange.300'); // Couleur d'accentuation

  return (
    <Box
      width="100%"
      bg={bgColor}
      color={textColor}
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      position="relative"
      overflow="hidden"
    >
      {/* Image d'arrière-plan */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        backgroundImage={`url(${contactImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
        opacity={0.3}
      />
      
      <VStack position="relative" zIndex={1} spacing={8} align="center">
        {/* Titre "Contactez-nous" */}
        

        <Text fontSize="lg" textAlign="center" maxW="600px" margin="auto" color={'white'}>
          Nous sommes là pour vous aider ! Contactez-nous par les canaux suivants.
        </Text>

        {/* Section d'informations de contact */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} width="full">
          {/* Première carte de contact */}
          <Box 
            borderWidth={1} 
            borderRadius="md" 
            p={5} 
            bg="white" 
            boxShadow="md"
            background="rgba(255, 255, 255, 0.13)"
          
            
            backdropFilter="blur(7.5px)"
            WebkitBackdropFilter="blur(7.5px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            color="white"
          >
            <VStack spacing={4} align="start">
              {/* Adresse email */}
              <HStack spacing={3}>
                <Icon as={MdEmail} w={6} h={6} color={accentColor} />
                <Text fontSize="lg">support@arcdia.com</Text>
              </HStack>
              {/* Numéro de téléphone */}
              <HStack spacing={3}>
                <Icon as={MdPhone} w={6} h={6} color={accentColor} />
                <Text fontSize="lg"> 05 54 88 555</Text>
              </HStack>
              {/* Contact WhatsApp */}
              <HStack spacing={3}>
                <Icon as={FaWhatsapp} w={6} h={6} color={accentColor} />
                <Text fontSize="lg">WhatsApp: 05 54 88 555</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Deuxième carte de contact */}
          <Box 
            borderWidth={1} 
            borderRadius="md" 
            p={5} 
            bg="white" 
            boxShadow="md" 
            background="rgba(255, 255, 255, 0.13)"
           
           
            backdropFilter="blur(7.5px)"
            WebkitBackdropFilter="blur(7.5px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            color="white"
          >
            <VStack spacing={4} align="start">
              {/* Facebook */}
              <HStack spacing={3}>
                <Icon as={FaFacebook} w={6} h={6} color={accentColor} />
                <Text fontSize="lg">/arcadia</Text>
              </HStack>
              {/* Instagram */}
              <HStack spacing={3}>
                <Icon as={FaInstagram} w={6} h={6} color={accentColor} />
                <Text fontSize="lg">@arcadia</Text>
              </HStack>
              {/* Localisation */}
              <HStack spacing={3}>
                <Icon as={HiLocationMarker} w={6} h={6} color={accentColor} />
                <Text fontSize="lg">Address: la forêt de Brocéliande France</Text>
              </HStack>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Liens vers les réseaux sociaux */}
        <HStack spacing={6} justify="center" mt={8}>
          <Button
            as="a"
            href="https://facebook.com/arcadia"
            target="_blank"
            variant="link"
            color="yellow.400"
            fontSize="2xl"
            _hover={{ color: 'orange.400' }}
          >
            <Icon as={FaFacebook} />
          </Button>
          <Button
            as="a"
            href="https://twitter.com/arcadia"
            target="_blank"
            variant="link"
            color="yellow.400"
            fontSize="2xl"
            _hover={{ color: 'orange.400' }}
          >
            <Icon as={FaTwitter} />
          </Button>
          <Button
            as="a"
            href="https://instagram.com/arcadia"
            target="_blank"
            variant="link"
            color="yellow.400"
            fontSize="2xl"
            _hover={{ color: 'orange.400' }}
          >
            <Icon as={FaInstagram} />
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Contact;