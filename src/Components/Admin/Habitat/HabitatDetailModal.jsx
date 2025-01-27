import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Text, Grid, Heading, Card, CardBody, Tab, TabList, TabPanel, TabPanels, Tabs, Spinner, Flex, Button, useBreakpointValue, Stack, Image, Badge, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FaDog, FaEdit, FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import habitatService from '../../../Services/habitatService';

const HabitatDetails = ({ habitatId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['habitatById', habitatId],
    queryFn: () => habitatService.getHabitatById(habitatId),
    enabled: !!habitatId,
    onError: (error) => {
      console.error('Error fetching habitat details:', error);
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Loading state
  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  // Error state
  if (isError) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text color="red.500" fontSize="xl">Error fetching habitat details</Text>
      </Flex>
    );
  }

  // If no data
  if (!data) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text color="gray.500" fontSize="xl">No habitat details found</Text>
      </Flex>
    );
  }

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <Box maxW="8xl" mx="auto" p={8} borderRadius="xl" boxShadow="2xl" bg="white">
      {/* Title & Description */}
      <Heading size="2xl" color="gray.900" mb={4} fontWeight="bold">{data.name}</Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>{data.description}</Text>

      {/* Action Buttons */}
      <Flex justify="flex-start" align="center" mb={6}>
        <Button colorScheme="teal" leftIcon={<FaEdit />} onClick={() => setIsModalOpen(true)}>
          Edit Habitat
        </Button>
        <IconButton
          icon={<FaTrashAlt />}
          colorScheme="red"
          aria-label="Delete Habitat"
          ml={4}
        />
      </Flex>

      {/* Habitat Overview */}
      <Tabs isLazy colorScheme="teal" variant="enclosed" align="start">
        <TabList mb={6} borderBottom="2px solid #e2e8f0" display="flex" justifyContent="space-between">
          <Tab
            fontWeight="semibold"
            _selected={{ color: "teal.600" }}
            px={6}
            py={3}
            borderRadius="md"
            display="flex"
            alignItems="center"
          >
            <FaDog size={20} style={{ marginRight: 8 }} />
            Animals
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
              gap={8}
              mt={6}
            >
              {data.animals && data.animals.length > 0 ? (
                data.animals.map((animal) => (
                  <Card
                    key={animal._id}
                    borderRadius="md"
                    boxShadow="lg"
                    bg="white"
                    _hover={{ boxShadow: '2xl', transform: 'scale(1.03)' }}
                    transition="all 0.3s ease"
                  >
                    <CardBody>
                      <Flex direction="column" align="center" justify="center">
                        <Image
                          src={animal.imagesUrl[0]}
                          alt={animal.name}
                          boxSize="180px"
                          objectFit="cover"
                          borderRadius="full"
                          mb={4}
                          border="4px solid #e2e8f0"
                        />
                        <Heading size="md" color="gray.800" mb={2} textAlign="center">{animal.name}</Heading>
                        <Text fontSize="sm" color="gray.500" textAlign="center">{animal.race}</Text>
                      </Flex>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <Text color="gray.500" fontSize="lg" textAlign="center" w="full">
                  No animals found for this habitat.
                </Text>
              )}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Edit Habitat Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Habitat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Modal content goes here */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={handleModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HabitatDetails;
