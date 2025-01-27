import {
  Container,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Flex,
  VStack,
  Image,
  IconButton,
  useColorModeValue,
   Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel
} from '@chakra-ui/react';
import { GiHealthPotion, GiFarmTractor, GiPawPrint } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import zooImage1 from '../../assets/giraffe.jpg';
import zooImage2 from '../../assets/zoo3.jpg';
import zooImage3 from '../../assets/zoo4.jpg';
import contactImage from '../../assets/giraffe-wild.jpg'

// Animated MotionBox
const MotionBox = motion(Box);

// Feature Component
const Feature = ({ text, icon, iconBg }) => (
  <MotionBox
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    p={6}
    bg="linear-gradient(to right, #2d3748, #4a5568)"
    borderRadius="xl"
    boxShadow="md"
    _hover={{ transform: 'translateY(-8px)', cursor: 'pointer' }}
  >
    <Flex align="center" mb={4} direction="column">
      <Box
        bg={iconBg}
        color="white"
        p={4}
        borderRadius="full"
        mb={3}
        boxShadow="sm"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {icon}
      </Box>
      <Text fontSize="lg" fontWeight="bold" color="yellow.400" mb={2}>
        {text}
      </Text>
    </Flex>
  </MotionBox>
);

// Custom Next Arrow
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      icon={<ArrowForwardIcon boxSize={6} />}
      aria-label="Next"
      position="absolute"
      top="50%"
      right="10px"
      transform="translateY(-50%)"
      zIndex={2}
      bg="yellow.400"
      color="gray.800"
      _hover={{ bg: "yellow.500" }}
      onClick={onClick}
      boxShadow="lg"
    />
  );
};

// Custom Prev Arrow
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      icon={<ArrowBackIcon boxSize={6} />}
      aria-label="Previous"
      position="absolute"
      top="50%"
      left="10px"
      transform="translateY(-50%)"
      zIndex={2}
      bg="yellow.400"
      color="gray.800"
      _hover={{ bg: "yellow.500" }}
      onClick={onClick}
      boxShadow="lg"
    />
  );
};

const About = () => {
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <Box bg={bgColor} py={16}>
      <Container maxW="7xl">
        {/* Hero Section */}
        <Box
          bg="linear-gradient(to right, #2d3748, #4a5568)"
          borderRadius="lg"
          p={10}
          mb={16}
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={10}
            p={6}
            align="center"
            justify="space-between"
          >
            <Box flex="1" color="white" textAlign={{ base: 'center', md: 'left' }}>
              <Heading
                as="h1"
                fontSize={{ base: '3xl', md: '5xl' }}
                mb={4}
                fontWeight="extrabold"
                lineHeight="shorter"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.6)"
              >
                Explorez les Merveilles de la Nature
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="taller" mb={6}>
                Partez à la découverte des habitats les plus uniques du monde, de la
                faune diversifiée et de la beauté du monde naturel.
              </Text>
              <Button
                as={RouterLink}
                to="/services"
                size="lg"
                bg="yellow.400"
                color="gray.800"
                _hover={{
                  bgGradient: 'linear(to-r, yellow.300, yellow.500)',
                  transform: 'scale(1.05)',
                }}
                rounded="full"
                boxShadow="lg"
              >
                Explorez Nos Services
              </Button>
            </Box>
            <Box flex="1" maxW="3xl" overflow="hidden" boxShadow="lg">
              <Slider {...sliderSettings}>
                {[zooImage1, zooImage2, zooImage3].map((image, idx) => (
                  <Image
                    key={idx}
                    src={image}
                    alt={`Habitat ${idx}`}
                    objectFit="cover"
                    h={{ base: '300px', md: '400px' }}
                  />
                ))}
              </Slider>
            </Box>
          </Stack>
        </Box>

        {/* Key Features */}
        <VStack spacing={8} mb={16}>
          <Heading as="h2" fontSize="3xl" color="gray.100">
            Ce Qui Nous Rend Uniques
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature icon={<GiHealthPotion size={30} />} iconBg="green.500" text="Santé et Bien-être des Animaux" />
            <Feature icon={<GiFarmTractor size={30} />} iconBg="blue.500" text="Pratiques Écologiques" />
            <Feature icon={<GiPawPrint size={30} />} iconBg="orange.500" text="Conservation des Espèces" />
          </SimpleGrid>
        </VStack>

        {/* New Section: Habitats */}
        
         
        <VStack spacing={16} mb={24}>

{/* Section 1: Nos Habitats */}

<Heading as="h2" fontSize="3xl" color="gray.100">
            Nos Habitats
          </Heading>
          <Text color="gray.300" textAlign="center" maxW="3xl">
            Découvrez des habitats variés recréant l’environnement naturel des animaux, notamment la savane africaine,
            la jungle tropicale, et les montagnes enneigées.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box p={6} bg="gray.700" borderRadius="lg" boxShadow="lg">
              <Heading fontSize="xl" color="yellow.400">Savane Africaine</Heading>
              <Text mt={2} color="gray.300">Une étendue herbeuse où vivent lions, éléphants, et girafes.</Text>
            </Box>
            <Box p={6} bg="gray.700" borderRadius="lg" boxShadow="lg">
              <Heading fontSize="xl" color="yellow.400">Jungle Tropicale</Heading>
              <Text mt={2} color="gray.300">Un paradis vert abritant singes, perroquets, et serpents exotiques.</Text>
            </Box>
          </SimpleGrid>
       

        {/* New Section: Animals */}
       <Box/>

{/* Section 2: Nos Animaux */}
<Box bg="gray.700" p={16} borderRadius="xl" boxShadow="xl">
  <Heading as="h2" fontSize="4xl" color="gray.100" textAlign="center" mb={8}>
    Nos Animaux
  </Heading>
  <Text color="gray.300" textAlign="center" maxW="4xl" mb={8}>
    Rencontrez nos résidents fascinants : des majestueux tigres aux paisibles pandas.
  </Text>
  <Accordion allowMultiple>
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading fontSize="xl" color="teal.300">Tigres du Bengale</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Text color="gray.300">Ces prédateurs puissants rôdent dans un habitat dédié.</Text>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading fontSize="xl" color="orange.300">Pandas Géants</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Text color="gray.300">Un enclos paisible recréant les forêts de bambou.</Text>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
</Box>

{/* Section 3: Nos Services */}
<Box bg="gray.800" p={16} borderRadius="xl" boxShadow="xl">
  <Heading as="h2" fontSize="4xl" color="gray.100" textAlign="center" mb={8}>
    Nos Services
  </Heading>
  <Text color="gray.300" textAlign="center" maxW="4xl" mb={8}>
    Explorez les services exceptionnels que nous offrons pour enrichir votre expérience dans notre zoo.
  </Text>
  <VStack spacing={16}>
    <Box display="flex" flexDirection={{ base: 'column', md: 'row-reverse' }} alignItems="center" justify="center" spacing={8}>
      <Image 
        src={zooImage1}
        alt="Visite Guidée"
        borderRadius="lg"
        maxW={{ base: '100%', md: '50%' }}
        objectFit="cover"
        mb={{ base: 4, md: 0 }} 
        maxHeight={{ base: '300px', md: '250px' }}
      />
      <Box flex="1" p={8} bg="teal.400" borderRadius="lg" boxShadow="lg">
        <Heading fontSize="2xl" color="gray.800" mb={4}>Visite Guidée</Heading>
        <Text color="gray.800" mb={4}>Découvrez le zoo avec nos guides experts, qui vous emmèneront à travers des habitats fascinants.</Text>
      
      </Box>
    </Box>

    <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems="center" justify="center" spacing={8}>
      <Image 
        src={zooImage1}
        alt="Experience Interactive"
        borderRadius="lg"
        maxW={{ base: '100%', md: '50%' }}
        objectFit="cover"
        mb={{ base: 4, md: 0 }} 
        maxHeight={{ base: '300px', md: '250px' }} 
      />
      <Box flex="1" p={8} bg="orange.300" borderRadius="lg" boxShadow="lg">
        <Heading fontSize="2xl" color="gray.800" mb={4}>Expérience Interactives</Heading>
        <Text color="gray.800" mb={4}>Participez à des activités interactives pour toute la famille, comme nourrir les animaux.</Text>
      
      </Box>
    </Box>

    <Box display="flex" flexDirection={{ base: 'column', md: 'row-reverse' }} alignItems="center" justify="center" spacing={8}>
      <Image 
        src={zooImage1}
        alt="Événements Spéciaux"
        borderRadius="lg"
        maxW={{ base: '100%', md: '50%' }}
        objectFit="cover"
        mb={{ base: 4, md: 0 }} 
        maxHeight={{ base: '300px', md: '250px' }} 
      />
      <Box flex="1" p={8} bg="yellow.300" borderRadius="lg" boxShadow="lg">
        <Heading fontSize="2xl" color="gray.800" mb={4}>Événements Spéciaux</Heading>
        <Text color="gray.800" mb={4}>Assistez à nos événements exclusifs, comme les soirées à thème et les festivals d'animaux.</Text>
        
      </Box>
    </Box>
  </VStack>
</Box>



</VStack>
        {/* Footer Stats */}
        <Box textAlign="center" color="gray.300">
          <Text fontSize={{ base: 'lg', md: 'xl' }} mb={4}>
            Depuis 1960, le Zoo Arcadia invite les amoureux de la nature à explorer des habitats immersifs et une faune fascinante. Découvrez plus de <b>300 espèces</b> et plongez dans une aventure éducative unique au cœur de la forêt enchantée de Brocéliande.
          </Text>
          <Stack direction="row" spacing={6} justify="center" mb={6}>
            <Box textAlign="center">
              <Text fontSize="3xl" color="teal.300" fontWeight="bold">
                300+
              </Text>
              <Text fontSize="sm">Espèces</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="3xl" color="orange.300" fontWeight="bold">
                60+
              </Text>
              <Text fontSize="sm">Années d'Histoire</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="3xl" color="yellow.300" fontWeight="bold">
                50+
              </Text>
              <Text fontSize="sm">Hectares d'Aventures</Text>
            </Box>
          </Stack>
          <Button
            as={RouterLink}
            to="/habitat"
            size="lg"
            colorScheme="teal"
            bg="yellow.400"
            color="black"
            _hover={{ bg: 'teal.500' }}
            fontWeight="bold"
          >
            Découvrez Nos Animaux
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
