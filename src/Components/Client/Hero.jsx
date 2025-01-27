import { Stack, Button, Text, VStack, useBreakpointValue, Box, Flex } from '@chakra-ui/react';
import background from '../../assets/giraffe-wild.jpg';
import { Link as RouterLink } from 'react-router-dom';

// Composant Hero pour afficher une section d'accueil immersive avec une image de fond
const Hero = () => {
  return (
    <Flex
      w={'full'} // Largeur complète
      h={'100vh'} // Hauteur égale à la hauteur de la fenêtre
      backgroundImage={`url(${background})`} // Définition de l'image de fond
      backgroundSize={'cover'} // L'image couvre toute la zone
      backgroundPosition={'center center'} // Positionnement centré de l'image
      alignItems={'center'} // Centre le contenu verticalement
      justifyContent={'center'} // Centre le contenu horizontalement
    >
      <VStack
        w={'full'} // Largeur complète pour la pile verticale
        justify={'center'} // Centre le contenu de la pile verticalement
        px={useBreakpointValue({ base: 4, md: 8 })} // Gestion des marges selon la taille de l'écran
        spacing={6} // Espacement entre les éléments de la pile
        textAlign={'center'} // Alignement du texte au centre
      >
        <Box
          borderRadius="xl" // Coins arrondis
          p={8} // Espacement intérieur
          bg="rgba(255, 255, 255, 0.2)" // Fond semi-transparent
          backdropFilter="blur(12px)" // Flou d'arrière-plan pour un effet moderne
          boxShadow="0 8px 20px rgba(0, 0, 0, 0.3)" // Ombre portée
          border="1px solid rgba(255, 255, 255, 0.3)" // Bordure semi-transparente
          transition="all 0.3s ease-in-out" // Transition fluide pour les interactions
          _hover={{
            transform: 'scale(1.05)', // Agrandissement au survol
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)', // Ombre renforcée au survol
          }}
        >
          <Text
            fontWeight={600} // Poids du texte
            lineHeight={1.4} // Hauteur de ligne
            fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })} // Taille du texte adaptative
            letterSpacing="wide" // Espacement entre les lettres
            color={'white'} // Couleur du texte
          >
            Bienvenue au Zoo d'Arcadia – Un sanctuaire pour la faune et la nature. 
            Explorez un monde d'espèces rares et protégées.
          </Text>
        </Box>

        {/* Bouton centré */}
        <Stack direction={'row'} spacing={4} justify={'center'}>
          <Button
            as={RouterLink}
                          to="/habitat"
            bg={'teal.400'} // Couleur de fond
            rounded={'full'} // Forme arrondie
            color={'black'} // Couleur du texte
            _hover={{ bg: 'teal.500' }} // Changement de couleur au survol
            px={8} // Largeur intérieure
            py={6} // Hauteur intérieure
            fontSize={'lg'} // Taille du texte
            transition="all 0.3s ease-in-out" // Transition fluide
            _focus={{ boxShadow: 'none' }} // Suppression de l'ombre au focus
          >
            Explorez nos animaux
          </Button>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Hero;
