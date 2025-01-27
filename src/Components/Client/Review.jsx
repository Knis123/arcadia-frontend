import React from 'react';
import { Box, Heading, Text, SimpleGrid, Card, CardBody, Stack, Button, Avatar, IconButton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FiArrowRight } from 'react-icons/fi';  // Optional: for "Read More" icon
import reviewService from '../../Services/reviewService.js';

const Review = () => {
  // Fetch visible reviews for the client side using useQuery
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['visible-reviews'],
    queryFn: reviewService.getAllReviews,
    select: (data) => data.filter((review) => review.isVisible), // Only show visible reviews
  });

  if (isLoading) return <Text>Loading reviews...</Text>;
  if (isError) return <Text color="red.500">Error loading reviews</Text>;

  return (
    <Box  py={12} px={4} bg="gray.800">
      <Heading size="lg" textAlign="center" mb={8} color="yellow.400">
        What Our Customers Are Saying
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        {reviews.map((review) => (
          <Card
            key={review._id}
            maxW="sm"
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            bgColor="gray.700"
            transition="all 0.3s ease"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}  // Hover effect for cards
          >
            <CardBody>
              <Stack spacing={4}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Avatar size="sm" name={review.pseudo} src={review} />  {/* Displaying Avatar */}
                  <Text fontWeight="bold" fontSize="lg" color="yellow.400">
                    {review.pseudo}
                  </Text>
                </Box>
                <Text fontSize="md" color="white">
                  "{review.comment}"
                </Text>
                
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Review;
