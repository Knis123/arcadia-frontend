import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useToast,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import HabitatDetail from "../Components/Client/HabitatDetail";
import habitatService from "../Services/habitatService";
import { useQuery } from "@tanstack/react-query";
import { FaInfoCircle } from "react-icons/fa";

const Habitat = () => {
  const [selectedHabitat, setSelectedHabitat] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { data: habitats = [], isLoading, isError } = useQuery({
    queryKey: ["habitats"],
    queryFn: () => habitatService.getAllHabitats(),
  });

  const handleHabitatClick = (habitat) => {
    setSelectedHabitat(habitat);
    onOpen();
  };

  return (
    <Box bg="gray.900" color="white" minH="100vh" py={{ base: 6, md: 8 }} px={{ base: 4, md: 12 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={12}>
        <Heading
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="bold"
          color="yellow.400"
          letterSpacing="widest"
        >
          Discover Wild Habitats
        </Heading>
        <Text fontSize="lg" mt={4} color="gray.300">
          Embark on a journey through Earth’s most captivating environments.
        </Text>
      </Box>

      {/* Habitat Gallery */}
      <Box>
        {isLoading ? (
          <Flex wrap="wrap" gap={4} justify="center">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} height="400px" width="300px" borderRadius="lg" />
              ))}
          </Flex>
        ) : isError ? (
          <Text color="red.400" textAlign="center" fontSize="xl">
            Error loading habitats. Please try again later.
          </Text>
        ) : (
          <Flex wrap="wrap" gap={6} justify="center">
            {habitats.map((habitat) => (
              <Box
                key={habitat.id}
                bg="gray.800"
                borderRadius="lg"
                overflow="hidden"
                maxW="sm"
                boxShadow="lg"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.05)" }}
                cursor="pointer"
                onClick={() => handleHabitatClick(habitat)}
              >
                <Image
                  src={habitat.imagesUrl[0]}
                  alt={habitat.name}
                  w="100%"
                  h="250px"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Heading fontSize="xl" color="yellow.300" mb={2}>
                    {habitat.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.400" noOfLines={3}>
                    {habitat.description}
                  </Text>
                  <Button
                    mt={4}
                    size="sm"
                    colorScheme="yellow"
                    variant="outline"
                    leftIcon={<FaInfoCircle />}
                    onClick={() => handleHabitatClick(habitat)}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            ))}
          </Flex>
        )}
      </Box>

      {/* Habitat Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader fontSize="2xl" fontWeight="bold" color="yellow.400">
            Habitat Details
          </ModalHeader>
          <ModalBody>
            {selectedHabitat ? (
              <HabitatDetail habitatId={selectedHabitat._id} />
            ) : (
              <Text>No habitat selected.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Habitat;
