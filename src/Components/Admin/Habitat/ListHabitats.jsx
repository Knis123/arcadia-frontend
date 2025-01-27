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
  IconButton,
  Text,
  useToast,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  HStack,
  Badge,
  Flex,
  Image,
  VStack,
  Divider,
  Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import habitatService from '../../../Services/habitatService';
import CreateHabitat from './CreateHabitat';
import HabitatDetails from './HabitatDetailModal';

const ListHabitat = () => {
  const [selectedHabitat, setSelectedHabitat] = useState(null);
  const [updatedHabitatData, setUpdatedHabitatData] = useState({});
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: habitats = [], isLoading, isError } = useQuery({
    queryKey: ['habitats'],
    queryFn: () => habitatService.getAllHabitats(),
    onError: (error) => {
      toast({
        title: 'Error fetching habitats',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const deleteHabitatMutation = useMutation({
    mutationFn: habitatService.deleteHabitat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habitats'] });
      toast({
        title: 'Habitat deleted',
        description: 'The habitat was successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error deleting habitat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const updateHabitatMutation = useMutation({
    mutationFn: ({ id, updatedData }) => habitatService.updateHabitat(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habitats'] });
      toast({
        title: 'Habitat updated',
        description: 'The habitat was successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onEditClose();
    },
    onError: (error) => {
      toast({
        title: 'Error updating habitat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this habitat?')) {
      deleteHabitatMutation.mutate(id);
    }
  };

  const handleEdit = (habitat) => {
    setSelectedHabitat(habitat);
    setUpdatedHabitatData(habitat);
    onEditOpen();
  };

  const handleUpdate = () => {
    updateHabitatMutation.mutate({ id: selectedHabitat._id, updatedData: updatedHabitatData });
  };

  const handleDetails = (habitat) => {
    setSelectedHabitat(habitat);
    onDetailsOpen();
  };

  if (isLoading) return <Spinner size="xl" color="blue.500" display="block" mx="auto" my={6} />;
  if (isError) return <Text color="red.500" fontSize="lg" textAlign="center">Error loading habitats</Text>;

  return (
    <Box p={6} maxW="8xl" mx="auto" py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg" color="gray.800" fontWeight="bold">
          Manage Habitats
        </Heading>
        <CreateHabitat />
      </Flex>

      <Table variant="simple" size="md" colorScheme="gray">
        <Thead bg="gray.100">
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {habitats.map((habitat) => (
            <Tr key={habitat._id} _hover={{ bg: 'gray.50' }}>
              <Td>
                <Image
                  src={habitat.imagesUrl[0]}
                  alt={habitat.name}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                  shadow="sm"
                />
              </Td>
              <Td fontWeight="medium" color="gray.700">{habitat.name}</Td>
              <Td>
                <HStack spacing={3}>
                  <Tooltip label="Edit Habitat" placement="top">
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      aria-label="Edit Habitat"
                      onClick={() => handleEdit(habitat)}
                      size="sm"
                    />
                  </Tooltip>
                  <Tooltip label="Delete Habitat" placement="top">
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      aria-label="Delete Habitat"
                      onClick={() => handleDelete(habitat._id)}
                      size="sm"
                    />
                  </Tooltip>
                  <Tooltip label="View Details" placement="top">
                    <IconButton
                      icon={<InfoIcon />}
                      colorScheme="teal"
                      aria-label="View Details"
                      onClick={() => handleDetails(habitat)}
                      size="sm"
                    />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Habitat Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="xl">
  <ModalOverlay />
  <ModalContent maxWidth="90%" px={10} py={8}>
    <ModalHeader fontSize="2xl" fontWeight="bold">Habitat Details</ModalHeader>
    <ModalBody fontSize="lg">
      {selectedHabitat ? (
        <HabitatDetails habitatId={selectedHabitat._id} />
      ) : (
        <Text>No habitat selected</Text>
      )}
    </ModalBody>
    <ModalFooter>
      <Button variant="outline" onClick={onDetailsClose} size="lg">Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>


      {/* Update Habitat Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Habitat</ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={updatedHabitatData.name || ''}
                  onChange={(e) => setUpdatedHabitatData({ ...updatedHabitatData, name: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={updatedHabitatData.description || ''}
                  onChange={(e) => setUpdatedHabitatData({ ...updatedHabitatData, description: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={updatedHabitatData.image || ''}
                  onChange={(e) => setUpdatedHabitatData({ ...updatedHabitatData, image: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onEditClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleUpdate}>Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ListHabitat;
