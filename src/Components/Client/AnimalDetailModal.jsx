import React from 'react';
import {
  Box,
  Heading,
  Text,
  Avatar,
  Badge,
  Flex,
  Stack,
  Divider,
  Spinner,
  SimpleGrid,
  Image,
  Icon,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaPaw, FaLeaf } from 'react-icons/fa'; // Icons for animal and nature
import animalService from '../../Services/animalService.js';

const AnimalDetailModal = ({ animalId }) => {
  const { data: animal, isLoading, isError } = useQuery({
    queryKey: ['animalById', animalId],
    queryFn: () => animalService.getAnimalById(animalId),
    enabled: !!animalId,
  });

  const bg = 'gray.900';
  const sectionBg = 'gray.800';
  const headingColor = 'yellow.400';
  const textColor = 'gray.300';
  const badgeBg = 'yellow.600';

  if (isLoading) {
    return <Spinner size="lg" color="yellow.400" />;
  }

  if (isError || !animal) {
    return <Text color="red.500">Erreur récupérant les détails des animaux.</Text>;
  }

  return (
    <Box
      maxW="900px"
      mx="auto"
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={bg}
      overflow="hidden"
      position="relative"
      color="white"
    >
      {/* Background Banner */}
      <Image
        src={animal.habitat?.image || 'https://via.placeholder.com/900x300'}
        alt="Habitat Banner"
        width="100%"
        height="200px"
        objectFit="cover"
        borderRadius="lg"
      />
      <Box position="absolute" top={4} right={4}>
        <Badge bg={badgeBg} color="gray.200" fontSize="lg" px={4} py={1}>
          {animal.habitat?.name || 'Unknown Habitat'}
        </Badge>
      </Box>

      {/* Profile Section */}
      <Flex mt={-20} align="center" direction={{ base: 'column', md: 'row' }}>
        <Avatar
          src={animal.imagesUrl?.[0] || 'https://via.placeholder.com/180'}
          size="2xl"
          borderWidth={3}
          borderColor="yellow.400"
          boxShadow="xl"
        />
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} textAlign={{ base: 'center', md: 'left' }}>
          <Heading size="2xl" color={headingColor} mb={2}>
            {animal.name}
          </Heading>
          <Text fontSize="lg" color={textColor} mb={1}>
            <Icon as={FaPaw} mr={2} />
            <strong>Espèces:</strong> {animal.race || 'Unknown'}
          </Text>
          
         
        </Box>
      </Flex>

      <Divider my={6} borderColor="gray.700" />

      {/* Veterinary Reports Section */}
      <Box>
        <Heading size="lg" color={headingColor} mb={4}>
         Rapports vétérinaires
        </Heading>
        {animal.vetReports?.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {animal.vetReports.map((report, index) => (
              <Box
                key={index}
                p={6}
                borderWidth={1}
                borderRadius="lg"
                bg={sectionBg}
                boxShadow="sm"
               
              >
                <Text fontSize="lg" fontWeight="bold" mb={2} color="white">
                  <strong>État de santé:</strong> {report.state || 'N/A'}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  <strong>Date:</strong> {new Date(report.date).toLocaleDateString() || 'N/A'}
                </Text>
                <Badge colorScheme={report.isCritical ? 'red' : 'green'}>
                  {report.isCritical ? 'Critical' : 'Healthy'}
                </Badge>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text color={textColor}>Aucun rapport vétérinaire disponible.</Text>
        )}
      </Box>
    </Box>
  );
};

export default AnimalDetailModal;
