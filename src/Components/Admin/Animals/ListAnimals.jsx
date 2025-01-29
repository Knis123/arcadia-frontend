import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Spinner,
  HStack,
  Flex,
  Avatar,
  Grid,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import animalService from '../../../Services/animalService';
import CreateAnimal from './CreateAnimal';

const AnimalComponent = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [updatedAnimalData, setUpdatedAnimalData] = useState({});
  const { isOpen: isEditModalOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailsModalOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: animals = [], isLoading, isError } = useQuery({
    queryKey: ['animals'],
    queryFn: animalService.getAllAnimals,
    onError: (error) => {
      toast({
        title: 'Error fetching animals',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const deleteAnimalMutation = useMutation({
    mutationFn: animalService.deleteAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      toast({
        title: 'Animal deleted',
        description: 'The animal was successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error deleting animal',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const updateAnimalMutation = useMutation({
    mutationFn: ({ id, updatedData }) => animalService.updateAnimal(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      toast({
        title: 'Animal updated',
        description: 'The animal was successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onEditClose();
    },
    onError: (error) => {
      toast({
        title: 'Error updating animal',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      deleteAnimalMutation.mutate(id);
    }
  };

  const handleEdit = (animal) => {
    setSelectedAnimal(animal);
    setUpdatedAnimalData(animal);
    onEditOpen();
  };

  const handleUpdate = () => {
    updateAnimalMutation.mutate({ id: selectedAnimal._id, updatedData: updatedAnimalData });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAnimalData({ ...updatedAnimalData, [name]: value });
  };

  const handleViewDetails = async (animalId) => {
    try {
      const fetchedAnimal = await animalService.getAnimalById(animalId);
      setSelectedAnimal(fetchedAnimal);
      onDetailsOpen();
    } catch (error) {
      toast({
        title: 'Error fetching animal details',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) return <Spinner size="xl" color="green.500" display="block" mx="auto" my={6} />;
  if (isError) return <Text color="red.500" fontSize="lg" textAlign="center">Error loading animals</Text>;

  return (
    <Box p={6} maxW="7xl" mx="auto" bg="gray.50" borderRadius="lg" boxShadow="xl">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="green.600">Gérer les animaux</Heading>
        <CreateAnimal isOpen={isEditModalOpen} onClose={onEditClose} />
      </Flex>

      <Box>
        {animals.map((animal) => (
          <Box
            key={animal._id}
            bg="white"
            borderRadius="md"
            p={4}
            mb={4}
            boxShadow="md"
            _hover={{
              boxShadow: 'xl',
              transform: 'scale(1.02)',
              transition: 'all 0.3s ease-in-out',
            }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex alignItems="center">
              <Avatar name={animal.name} src={animal.imagesUrl[0]} size="lg" mr={4} />
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="green.600">{animal.name}</Text>
                <Text fontSize="sm" color="gray.500">Race: {animal.race}</Text>
                <Text fontSize="sm" color="gray.500">Habitat: {animal.habitat ? animal.habitat.name : 'Unknown'}</Text>
              </Box>
            </Flex>

            <HStack spacing={4}>
              <IconButton
                icon={<EditIcon />}
                onClick={() => handleEdit(animal)}
                aria-label="Edit animal"
                colorScheme="blue"
                size="sm"
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => handleDelete(animal._id)}
                aria-label="Delete animal"
                colorScheme="red"
                size="sm"
              />
              <IconButton
                icon={<InfoIcon />}
                onClick={() => handleViewDetails(animal._id)}
                aria-label="View animal details"
                colorScheme="purple"
                size="sm"
              />
            </HStack>
          </Box>
        ))}
      </Box>
      <Modal isOpen={isDetailsModalOpen} onClose={onDetailsClose} isCentered size="6xl">
  <ModalOverlay />
  <ModalContent borderRadius="lg" maxW="6xl" p={0} bg="white" boxShadow="2xl">
    <ModalHeader borderBottomWidth="1px" p={6}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          Détails des animaux
        </Text>
        <Button variant="ghost" onClick={onDetailsClose} colorScheme="gray">
          Fermer
        </Button>
      </Flex>
    </ModalHeader>

    <ModalBody p={6} maxH="70vh" overflowY="auto">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Basic Information Section */}
        <Box  p={6} >
          <Flex alignItems="center" mb={4}>
           
          </Flex>
          <Flex alignItems="center" mb={4}>
          <Avatar  src={selectedAnimal?.imagesUrl[0]} size="lg" mr={4} />
          </Flex>
          <Text fontSize="lg" color="gray.700">
            <strong>Nom:</strong> {selectedAnimal?.name || 'Unknown'}
          </Text>
          <Text fontSize="lg" color="gray.700">
            <strong>Race:</strong> {selectedAnimal?.race || 'Unknown'}
          </Text>
          <Text fontSize="lg" color="gray.700">
            <strong>Habitat:</strong> {selectedAnimal?.habitat?.name || 'Unknown'}
          </Text>
          <Text fontSize="lg" color="gray.700">
            <strong>Nom des vues:</strong> {selectedAnimal?.stats?.views || 0}
          </Text>
        </Box>
        {/* <Text color="red">Views: {animal.stats?.views || 0}</Text> */}
      

        {/* Vet Reports Section */}
        <Box gridColumn="span 2" bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Flex alignItems="center" mb={4}>
            <Box as="span" color="purple.600" fontSize="xl" mr={2}>
              🩺
            </Box>
            <Heading size="md" color="purple.700">
               rapports vétérinaire 
            </Heading>
          </Flex>
          {selectedAnimal?.vetReports?.length > 0 ? (
            <Table variant="simple" size="sm">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Date</Th>
                  <Th>Details</Th>
                  <Th>Nourriture</Th>
                  <Th>Quantité</Th>
                  <Th>État</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedAnimal.vetReports.map((report, index) => (
                  <Tr key={index}>
                    <Td>{new Date(report.date).toLocaleDateString() || 'N/A'}</Td>
                    <Td>{report.details || 'No details'}</Td>
                    <Td>{report.food || 'Not specified'}</Td>
                    <Td>{report.quantity || 'Not specified'}</Td>
                    <Td>{report.state || 'Not specified'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text fontSize="lg" color="gray.600">
              Aucun rapport de vétérinaire disponible.
            </Text>
          )}
        </Box>

        {/* Food Records Section */}
        <Box gridColumn="span 2" bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Flex alignItems="center" mb={4}>
            <Box as="span" color="orange.600" fontSize="xl" mr={2}>
              🍽️
            </Box>
            <Heading size="md" color="orange.700">
              alimentations
            </Heading>
          </Flex>
          {selectedAnimal?.foodRecords?.length > 0 ? (
            <Table variant="simple" size="sm">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Date</Th>
                  <Th>Nourriture</Th>
                  <Th>Quantité</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedAnimal.foodRecords.map((record, index) => (
                  <Tr key={index}>
                    <Td>{new Date(record.date).toLocaleDateString() || 'N/A'}</Td>
                    <Td>{record.food || 'Not specified'}</Td>
                    <Td>{record.quantity || 'Not specified'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text fontSize="lg" color="gray.600">
              Pas de dossiers alimentaires disponibles.
            </Text>
          )}
        </Box>
      </Grid>
    </ModalBody>

    <ModalFooter borderTopWidth="1px" p={6}>
      <Button variant="outline" onClick={onDetailsClose} colorScheme="gray" mr={3}>
        Annuler
      </Button>
     
    </ModalFooter>
  </ModalContent>
</Modal>


      {/* Modal for Editing Animal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader>{selectedAnimal ? 'Edit Animal' : 'Add Animal'}</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input name="name" value={updatedAnimalData.name || ''} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Race</FormLabel>
              <Input name="race" value={updatedAnimalData.race || ''} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Habitat</FormLabel>
              <Input name="habitat" value={updatedAnimalData.habitat || ''} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleUpdate}>Sauvegarder</Button>
            <Button variant="ghost" onClick={onEditClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AnimalComponent;
