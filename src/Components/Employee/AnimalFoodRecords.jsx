import React, { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  useToast,
  Divider,
  Avatar,
  Flex,
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, AddIcon } from '@chakra-ui/icons';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import animalService from '../../Services/animalService.js';
import foodService from '../../Services/foodService.js'; // Importing foodService
import useFetchById from '../recordhook';

const AnimalFoodRecord = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [foodData, setFoodData] = useState({
    food: '',
    quantity: '',
    date: '',
   
  });

  const {
    isOpen: isAddFoodRecordOpen,
    onOpen: onAddFoodRecordOpen,
    onClose: onAddFoodRecordClose,
  } = useDisclosure();
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();

  const toast = useToast();
  const queryClient = useQueryClient();

  // Query for animals
  const { data: animals = [], isLoading, isError } = useQuery({
    queryKey: ['animals'],
    queryFn: () => animalService.getAllAnimals(),
  });

  // Use custom hook to fetch food records by animal
  const { data: foodRecords = [], isLoading: recordsLoading, refetch: refetchFoodRecords } = useFetchById(
    foodService.getFoodRecordsByAnimal,
    selectedAnimal
  );

  const createFoodRecordMutation = useMutation({
    mutationFn: (newRecord) => foodService.createFoodRecord(selectedAnimal, newRecord),
    onSuccess: () => {
      toast({ title: 'Food record created successfully', status: 'success', duration: 3000 });
      refetchFoodRecords();
      onAddFoodRecordClose();
      setFoodData({
        food: '',
        quantity: '',
        date: '',
       
      });
    },
    onError: (error) => {
      toast({ title: 'Error creating food record', description: error.message, status: 'error', duration: 3000 });
    },
  });

  const handleCreateFoodRecord = () => {
    createFoodRecordMutation.mutate(foodData);
  };

  if (isLoading) return <Spinner size="xl" color="teal.500" display="block" mx="auto" my={6} />;
  if (isError) return <Text color="red.500" fontSize="lg" textAlign="center">Error loading animals</Text>;

  return (
    <Box p={8} maxW="8xl" mx="auto" bg="gray.50" >
      <Heading size="xl" color="teal.600" mb={8} textAlign="center" fontWeight="bold">Tableau de bord de gestion des animaux</Heading>

      {/* Animal Data Grid Table */}
      <Table mb={6}>
        <Thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Race</Th>
            <Th>Habitat</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {animals.map((animal) => (
            <Tr key={animal._id}>
              <Td>
                <Flex alignItems="center">
                  <Avatar name={animal.name} src={animal.imagesUrl[0]} size="sm" mr={4} />
                  {animal.name}
                </Flex>
              </Td>
              <Td>{animal.race}</Td>
              <Td>{animal.habitat?.name || 'Unknown'}</Td>
              <Td>
                <Flex gap={2}>
                  <IconButton
                    icon={<AddIcon />}
                    onClick={() => {
                      setSelectedAnimal(animal._id);
                      onAddFoodRecordOpen();
                    }}
                    aria-label="Add Food Record"
                    variant="outline"
                    color="black"
                    borderColor="black"
                    _hover={{ bg: "black", color: "white" }}
                    _active={{ bg: "blackAlpha.800" }}
                    size="sm"
                    mx={1}
                  />
                  <IconButton
                    icon={<ViewIcon />}
                    onClick={() => {
                      setSelectedAnimal(animal._id);
                      refetchFoodRecords();
                      onDetailsOpen();
                    }}
                    aria-label="View Food Records"
                    variant="outline"
                    color="black"
                    borderColor="black"
                    _hover={{ bg: "black", color: "white" }}
                    _active={{ bg: "blackAlpha.800" }}
                    size="sm"
                    mx={1}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add Food Record Modal */}
      <Modal isOpen={isAddFoodRecordOpen} onClose={onAddFoodRecordClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter un dossier alimentaire</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Nourriture</FormLabel>
              <Input
                placeholder="Food"
                value={foodData.food}
                onChange={(e) => setFoodData({ ...foodData, food: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                value={foodData.quantity}
                onChange={(value) => setFoodData({ ...foodData, quantity: value })}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={foodData.date}
                onChange={(e) => setFoodData({ ...foodData, date: e.target.value })}
              />
            </FormControl>
           
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCreateFoodRecord} isLoading={createFoodRecordMutation.isLoading}>
              Soumettre
            </Button>
            <Button variant="outline" onClick={onAddFoodRecordClose} ml={3}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Food Records Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dossiers alimentaires</ModalHeader>
          <ModalBody>
            {recordsLoading ? (
              <Spinner size="xl" color="teal.500" display="block" mx="auto" my={6} />
            ) : (
              foodRecords.map((record, index) => (
                <Box
                  key={index}
                  p={6}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="lg"
                  mb={4}
                  border="1px solid #e2e8f0"
                  _hover={{ boxShadow: 'xl', borderColor: 'teal.500' }}
                  transition="all 0.2s"
                >
                  <Flex direction="column" gap={3}>
                    <Text fontSize="lg" fontWeight="bold" color="teal.600">
                      Record #{index + 1}
                    </Text>
                    <Box borderBottom="1px" borderColor="gray.200" mb={4} />

                    <Text fontSize="md" fontWeight="semibold" color="gray.700">
                      <strong>Nourriture:</strong> {record.food}
                    </Text>
                    <Text fontSize="md" fontWeight="semibold" color="gray.700">
                      <strong>Quantité en kg:</strong> {record.quantity}
                    </Text>
                    <Text fontSize="md" fontWeight="semibold" color="gray.700">
                      <strong>Date:</strong> {new Date(record.date).toLocaleDateString()}
                    </Text>
                   
                  </Flex>
                </Box>
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onDetailsClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AnimalFoodRecord;
