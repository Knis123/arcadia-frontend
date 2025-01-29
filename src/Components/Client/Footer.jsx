import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  IconButton,
  HStack,
  useColorModeValue,
  Divider
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaInfoCircle, FaLink, FaPhone, FaHome, FaTag, FaInfo, FaEnvelope } from 'react-icons/fa';
import Logo from '../../assets/logo.jpg';
import { Link as RouterLink } from 'react-router-dom';

// Composant ListHeader pour afficher un en-tête de section avec une icône
const ListHeader = ({ icon, children, color }) => (
  <HStack spacing={2} mb={4}>
    {icon && <Box as={icon} color={color} />} 
    <Text fontWeight="bold" fontSize="lg" color={color}>
      {children}
    </Text>
  </HStack>
);

// Composant Footer pour créer un pied de page structuré et interactif
const Footer = () => {
  // Détermine les couleurs en fonction du mode (clair ou sombre)
 const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('white', 'gray.200');
  const linkColor = useColorModeValue('white', 'gray.400');

  return (
    <Box bg={bgColor} color={textColor} py={10}>
      {/* Ligne de séparation */}
     
      <Container as={Stack} maxW="6xl">
        {/* Grille pour organiser les différentes sections du pied de page */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {/* Logo et adresse */}
          <Stack spacing={6}>
            <Box>
              <img src={Logo} alt="arcadia" style={{ height: '90px' }} />
            </Box>
            <Text fontSize="sm" color={linkColor}>
              Arcadia:  la forêt de Brocéliande France
            </Text>
          </Stack>

          {/* Section des liens */}
          <Stack align="flex-start">
            <ListHeader icon={FaLink} color="yellow.300">Liens</ListHeader>
            <HStack spacing={2}>
              <FaHome />
              <RouterLink to="/">Acceuil</RouterLink>
            </HStack>
            <HStack spacing={2}>
              <FaTag />
              <RouterLink to="/services">Services</RouterLink>
            </HStack>
            <HStack spacing={2}>
              <FaEnvelope />
              <RouterLink to="/habitat">Habitats</RouterLink>
            </HStack>
          </Stack>

          {/* Section des informations */}
          <Stack align="flex-start">
            <ListHeader icon={FaInfoCircle} color="yellow.300">Informations</ListHeader>
            <HStack spacing={2}>
              <FaInfo />
              <Link href="#">Conditions générales</Link>
            </HStack>
            <HStack spacing={2}>
              <FaInfo />
              <Link href="#">Confidentialité</Link>
            </HStack>
          </Stack>

          {/* Section des contacts */}
          <Stack align="flex-start">
            <ListHeader icon={FaPhone} color="yellow.300">Contact</ListHeader>
            <HStack spacing={2}>
              <FaPhone />
              <Link href="tel:+213676438918">05 54 88 555</Link>
            </HStack>
            <HStack spacing={2}>
              <FaEnvelope />
              <Link href="mailto:support@arcdia.com">support@arcdia.com</Link>
            </HStack>
          </Stack>
        </SimpleGrid>

        {/* Réseaux sociaux et droits d'auteur */}
        <Box
          mt={10}
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="sm" color="yellow.300">
            © 2024. Tous droits réservés.
          </Text>
          {/* Icônes des réseaux sociaux */}
          <HStack spacing={6}>
            <IconButton
              as="a"
              href="https://facebook.com" // Lien vers Facebook
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
            color="yellow.300"
              _hover={{ bg: 'orange.500', color: 'white' }}
            />
            <IconButton
              as="a"
              href="https://twitter.com" // Lien vers Twitter
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              color="yellow.300"
              _hover={{ bg: 'orange.500', color: 'white' }}
            />
            <IconButton
              as="a"
              href="https://instagram.com" // Lien vers Instagram
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
               color="yellow.300"
              _hover={{ bg: 'orange.500', color: 'white' }}
            />
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
