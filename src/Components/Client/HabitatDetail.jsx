import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Text,
  Flex,
  Heading,
  Spinner,
  Avatar,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import habitatService from '../../Services/habitatService';
import AnimalDetailModal from './AnimalDetailModal';

const HabitatDetail = ({ habitatId }) => {
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['habitatById', habitatId],
    queryFn: () => habitatService.getHabitatById(habitatId),
    enabled: !!habitatId,
  });

  const handleAnimalClick = (animalId) => {
    setSelectedAnimalId(animalId);
    onOpen();
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh" bg="gray.800">
        <Spinner size="xl" color="yellow.400" />
      </Flex>
    );
  }

  if (isError || !data) {
    return (
      <Flex justify="center" align="center" height="100vh" bg="gray.800">
        <Text color="red.500" fontSize="xl">
          Error fetching habitat details
        </Text>
      </Flex>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" p={8} bg="gray.900" borderRadius="lg" shadow="lg" color="white">
      <Heading as="h1" size="2xl" color="yellow.400" mb={4} fontFamily="serif">
        {data.name}
      </Heading>
      <Text fontSize="lg" color="gray.300" mb={6}>
        {data.description}
      </Text>

      <Heading as="h2" size="lg" color="yellow.400" mb={4} fontFamily="serif">
        Animals in this Habitat
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(140px, 1fr))" gap={6}>
        {data.animals?.map((animal) => (
          <GridItem
            key={animal._id}
            bg="gray.800"
            borderRadius="lg"
            p={6}
            shadow="md"
            textAlign="center"
            _hover={{ shadow: 'lg', bg: 'gray.700', transform: 'scale(1.05)' }}
            onClick={() => handleAnimalClick(animal._id)}
            transition="all 0.3s ease"
          >
            <Avatar
              src={animal.imagesUrl?.[0] || 'https://via.placeholder.com/180'}
              size="xl"
              mb={4}
              borderColor="yellow.400"
              borderWidth="2px"
            />
            <Text fontWeight="bold" fontSize="lg" color="yellow.300">
              {animal.name}
            </Text>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white" maxW="80%">
          <ModalHeader fontFamily="serif" fontSize="2xl" color="yellow.400">
            Animal Details
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            {selectedAnimalId ? (
              <AnimalDetailModal animalId={selectedAnimalId} />
            ) : (
              <Text>No animal selected.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HabitatDetail;
