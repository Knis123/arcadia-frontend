import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import zooService from "../Services/zooServices";
import serviceheader from "../assets/service.jpg";

const Services = () => {
  const toast = useToast();

  // Fetch services using React Query
  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: zooService.getAllServices,
    onError: (error) => {
      toast({
        title: "Error fetching services",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Box mt="5rem">
      {/* Section Header */}
      <Box
        bgImage={`url(${serviceheader})`}
        bgSize="cover"
        bgPosition="center"
        py={20}
        px={5}
        color="white"
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          bg="rgba(0, 0, 0, 0.6)"
          py={10}
          px={5}
          borderRadius="md"
        >
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4}>
            Bienvenue dans Notre Zoo
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="600px" textAlign="center">
            Découvrez un monde merveilleux ! Des expositions interactives aux
            équipements familiaux, il y en a pour tous les goûts.
          </Text>
        </Flex>
      </Box>

      {/* Section Services */}
      <Box py={10} px={5} mb="5rem" mt="5rem">
        <Heading textAlign="center" mb={8} fontSize="3xl" color="teal.600">
          Nos Services
        </Heading>

        {isLoading ? (
          <Spinner size="xl" color="green.500" display="block" mx="auto" my={6} />
        ) : isError ? (
          <Text color="red.500" fontSize="lg" textAlign="center">
            Error loading services
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {services.map((service) => (
              <Card
                key={service._id}
                shadow="md"
                borderRadius="md"
                bg="white"
                _hover={{
                  shadow: "lg",
                  transform: "scale(1.05)",
                  transition: "0.3s",
                }}
              >
                <CardBody>
                  <VStack spacing={4}>
                    <Box
                      bgGradient="linear(to-r, teal.400, teal.600)"
                      color="white"
                      w={16}
                      h={16}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="full"
                      fontSize="2xl"
                      shadow="md"
                    >
                      ⭐
                    </Box>
                    <Heading fontSize="xl" textAlign="center" color="teal.700">
                      {service.name}
                    </Heading>
                    <Text fontSize="sm" textAlign="center" color="gray.600">
                      {service.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Services;
