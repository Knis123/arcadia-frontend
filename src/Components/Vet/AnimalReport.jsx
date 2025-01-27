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
import {  ViewIcon, AddIcon } from '@chakra-ui/icons';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import animalService from '../../Services/animalService.js';
import reportService from '../../Services/reportService.js';
import useFetchById from '../hook';

const AnimalReport = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [reportData, setReportData] = useState({
    state: '',
    food: '',
    quantity: '',
    date: '',
    details: '',
  });

  const {
    isOpen: isAddReportOpen,
    onOpen: onAddReportOpen,
    onClose: onAddReportClose,
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

  // Use custom hook to fetch reports by animal
  const { data: vetReports = [], isLoading: reportsLoading, refetch: refetchReports } = useFetchById(
    reportService.getVetReportsByAnimal,
    selectedAnimal
  );

  const createVetReportMutation = useMutation({
    mutationFn: (newReport) => reportService.createVetReport(selectedAnimal, newReport),
    onSuccess: () => {
      toast({ title: 'Vet report created successfully', status: 'success', duration: 3000 });
      refetchReports();
      onAddReportClose();
      setReportData({
        state: '',
        food: '',
        quantity: '',
        date: '',
        details: '',
      });
    },
    onError: (error) => {
      toast({ title: 'Error creating vet report', description: error.message, status: 'error', duration: 3000 });
    },
  });

  const handleCreateReport = () => {
    createVetReportMutation.mutate(reportData);
  };

  if (isLoading) return <Spinner size="xl" color="teal.500" display="block" mx="auto" my={6} />;
  if (isError) return <Text color="red.500" fontSize="lg" textAlign="center">Error loading animals</Text>;

  return (
    <Box p={8} maxW="8xl" mx="auto" bg="gray.50" >
      <Heading size="xl" color="teal.600" mb={8} textAlign="center" fontWeight="bold">Animal Management Dashboard</Heading>

      {/* Animal Data Grid Table */}
      <Table mb={6}>
        <Thead>
          <Tr>
            <Th>Name</Th>
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
  icon={<AddIcon />} // Replace this with the appropriate icon for "Add Report"
  onClick={() => {
    setSelectedAnimal(animal._id);
    onAddReportOpen();
  }}
  aria-label="Add Report"
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
    refetchReports();
    onDetailsOpen();
  }}
  aria-label="View animal details"
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

      {/* Add Vet Report Modal */}
      <Modal isOpen={isAddReportOpen} onClose={onAddReportClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Vet Report</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>State</FormLabel>
              <Input
                placeholder="State"
                value={reportData.state}
                onChange={(e) => setReportData({ ...reportData, state: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Food</FormLabel>
              <Input
                placeholder="Food"
                value={reportData.food}
                onChange={(e) => setReportData({ ...reportData, food: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                value={reportData.quantity}
                onChange={(value) => setReportData({ ...reportData, quantity: value })}
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
                value={reportData.date}
                onChange={(e) => setReportData({ ...reportData, date: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Details</FormLabel>
              <Textarea
                placeholder="Enter details"
                value={reportData.details}
                onChange={(e) => setReportData({ ...reportData, details: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCreateReport} isLoading={createVetReportMutation.isLoading}>
              Submit
            </Button>
            <Button variant="outline" onClick={onAddReportClose} ml={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Vet Report Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="xl">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Vet Reports</ModalHeader>
    <ModalBody>
      {reportsLoading ? (
        <Spinner size="xl" color="teal.500" display="block" mx="auto" my={6} />
      ) : (
        vetReports.map((report, index) => (
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
                Report #{index + 1}
              </Text>
              <Box borderBottom="1px" borderColor="gray.200" mb={4} />

              <Text fontSize="md" fontWeight="semibold" color="gray.700">
                <strong>State:</strong> {report.state}
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="gray.700">
                <strong>Food:</strong> {report.food}
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="gray.700">
                <strong>Quantity:</strong> {report.quantity}
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="gray.700">
                <strong>Date:</strong> {new Date(report.date).toLocaleDateString()}
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="gray.700">
                <strong>Details:</strong> {report.details}
              </Text>
            </Flex>
          </Box>
        ))
      )}
    </ModalBody>
    <ModalFooter>
      <Button variant="outline" onClick={onDetailsClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </Box>
  );
};

export default AnimalReport;
