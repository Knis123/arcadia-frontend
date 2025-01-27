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
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import reviewService from '../../Services/reviewService.js';

const ManageReviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const toast = useToast();

  // Fetch all reviews with useQuery
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: reviewService.getAllReviews,
    onError: (error) => {
      toast({
        title: 'Error fetching reviews',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Mutation for toggling visibility of a review
  const { mutate: toggleVisibility } = useMutation({
    mutationFn: reviewService.toggleReviewVisibility,
    onSuccess: (data) => {
      toast({
        title: 'Visibility toggled successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error toggling visibility',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Handle the review details modal
  const handleDetails = (review) => {
    setSelectedReview(review);
    onDetailsOpen();
  };

  // Toggle review visibility
  const handleToggleVisibility = (id) => {
    toggleVisibility(id);
  };

  // Loading state while data is fetching
  if (isLoading) return <Spinner size="xl" color="blue.500" display="block" mx="auto" my={6} />;
  // Error state if there's an issue fetching data
  if (isError) return <Text color="red.500" fontSize="lg" textAlign="center">Error loading reviews</Text>;

  // Filter visible and hidden reviews
  const visibleReviews = reviews.filter((review) => review.isVisible);
  const hiddenReviews = reviews.filter((review) => !review.isVisible);

  return (
    <Box p={6} maxW="8xl" mx="auto" py={8}>
      <Heading size="lg" color="gray.800" fontWeight="bold" mb={6}>
        Manage Reviews
      </Heading>

      {/* Visible Reviews Section */}
      <Box mb={6}>
        <Heading size="md" color="gray.700" mb={4}>Visible Reviews</Heading>
        <Table variant="striped" colorScheme="gray" borderColor="gray.200" rounded="lg">
          <Thead bg="gray.100">
            <Tr>
              <Th>Pseudo</Th>
              <Th>Comment</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {visibleReviews.map((review) => (
              <Tr key={review._id} _hover={{ bg: 'gray.50' }} transition="all 0.2s ease-in-out">
                <Td fontWeight="medium" color="gray.700">{review.pseudo}</Td>
                <Td>{review.comment}</Td>
                <Td>
                  <Stack direction="row" spacing={4}>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleToggleVisibility(review._id)}
                    >
                      Hide
                    </Button>
                    <IconButton
                      icon={<InfoIcon />}
                      colorScheme="teal"
                      aria-label="View Details"
                      onClick={() => handleDetails(review)}
                      size="sm"
                      variant="ghost"
                    />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Hidden Reviews Section */}
      <Box mb={6}>
        <Heading size="md" color="gray.700" mb={4}>Hidden Reviews</Heading>
        <Table variant="striped" colorScheme="gray" borderColor="gray.200" rounded="lg">
          <Thead bg="gray.100">
            <Tr>
              <Th>Pseudo</Th>
              <Th>Comment</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hiddenReviews.map((review) => (
              <Tr key={review._id} _hover={{ bg: 'gray.50' }} transition="all 0.2s ease-in-out">
                <Td fontWeight="medium" color="gray.700">{review.pseudo}</Td>
                <Td>{review.comment}</Td>
                <Td>
                  <Stack direction="row" spacing={4}>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      onClick={() => handleToggleVisibility(review._id)}
                    >
                      Show
                    </Button>
                    <IconButton
                      icon={<InfoIcon />}
                      colorScheme="teal"
                      aria-label="View Details"
                      onClick={() => handleDetails(review)}
                      size="sm"
                      variant="ghost"
                    />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Review Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="xl">
        <ModalOverlay />
        <ModalContent maxWidth="90%" px={10} py={8} bg="white" boxShadow="lg" rounded="md">
          <ModalHeader fontSize="2xl" fontWeight="bold">Review Details</ModalHeader>
          <ModalBody fontSize="lg">
            {selectedReview ? (
              <Box>
                <Text mb={2}><strong>Pseudo:</strong> {selectedReview.pseudo}</Text>
                <Text mb={2}><strong>Comment:</strong> {selectedReview.comment}</Text>
                <Text mb={2}><strong>Visibility:</strong> {selectedReview.isVisible ? 'Visible' : 'Hidden'}</Text>
              </Box>
            ) : (
              <Text>No review selected</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onDetailsClose} size="lg" colorScheme="blue">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManageReviews;
