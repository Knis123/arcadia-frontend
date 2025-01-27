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
  TableContainer,
  useToast,
  Spinner,
  Flex,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  HStack,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import {  EditIcon, InfoIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import zooService from '../../Services/zooServices.js';


const ZooService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [updatedServiceData, setUpdatedServiceData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ['services'],
    queryFn: zooService.getAllServices,
    onError: (error) => {
      toast({
        title: 'Error fetching services',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  

  const updateServiceMutation = useMutation({
    mutationFn: ({ id, updatedData }) => zooService.updateService(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: 'Service updated',
        description: 'The service was successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error updating service',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });



  const handleEdit = (service) => {
    setSelectedService(service);
    setUpdatedServiceData(service);
    onOpen();
  };

  const handleUpdate = () => {
    updateServiceMutation.mutate({ id: selectedService._id, updatedData: updatedServiceData });
  };

  const handleDetails = (service) => {
    setSelectedService(service);
    onDetailOpen();
  };

  if (isLoading) return <Spinner size="xl" color="green.500" display="block" mx="auto" my={6} />;
  if (isError) return <Text color="red.500" fontSize="lg" textAlign="center">Error loading services</Text>;

  return (
    <Box p={6} maxW="6xl" mx="auto">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="gray.800" fontWeight="bold">
          Manage Zoo Services
        </Heading>
       
      </Flex>

      <TableContainer bg="white" borderRadius="lg" boxShadow="lg">
        <Table variant="simple" size="md" colorScheme="gray">
          <Thead bg="gray.100">
            <Tr>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {services.map((service) => (
              <Tr key={service._id} _hover={{ bg: 'gray.50' }}>
                <Td>
                  <Text fontWeight="medium" color="green.800">
                    {service.name}
                  </Text>
                </Td>
                <Td>
                  <HStack spacing={3}>
                    <Tooltip label="Edit Service" placement="top">
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        aria-label="Edit Service"
                        onClick={() => handleEdit(service)}
                        size="sm"
                      />
                    </Tooltip>
                   
                    <Tooltip label="Service Details" placement="top">
                      <IconButton
                        icon={<InfoIcon />}
                        colorScheme="purple"
                        aria-label="Service Details"
                        onClick={() => handleDetails(service)}
                        size="sm"
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Update Service Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Service</ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={updatedServiceData.name || ''}
                  onChange={(e) => setUpdatedServiceData({ ...updatedServiceData, name: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={updatedServiceData.description || ''}
                  onChange={(e) => setUpdatedServiceData({ ...updatedServiceData, description: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleUpdate}>Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Service Details Modal */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Service Details</ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold">Name: {selectedService?.name}</Text>
              <Text>Description: {selectedService?.description}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onDetailClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ZooService;
