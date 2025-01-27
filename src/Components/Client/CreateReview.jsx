import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  useToast,
  Stack,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import reviewService from "../../Services/reviewService.js";

// Validation Schema using Yup
const ReviewSchema = Yup.object().shape({
  pseudo: Yup.string()
    .required("Pseudo is required")
    .min(3, "Pseudo must be at least 3 characters"),
  comment: Yup.string()
    .required("Comment is required")
    .min(10, "Comment must be at least 10 characters"),
});

const MotionBox = motion(Box);

const CreateReview = () => {
  const toast = useToast();

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: reviewService.createReview,
    onSuccess: () => {
      toast({
        title: "Review Created",
        description: "Your review has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error || "Failed to create the review.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  // Form Submission Handler
  const handleSubmit = (values, actions) => {
    mutation.mutate(values, {
      onSettled: () => {
        actions.setSubmitting(false);
        actions.resetForm();
      },
    });
  };

  return (
    <MotionBox
      maxW="lg"
      mx="auto"
      p={{ base: "4", sm: "6" }}
      boxShadow="lg"
      borderRadius="xl"
      bg="linear-gradient(to right, #2d3748, #4a5568)"
      transform="scale(1)"
      whileHover={{ scale: 1.02 }}
      transition="all 0.3s ease"
      mt={{ base: "5", sm: "8" }}
    >
      <Heading
        textAlign="center"
        fontSize={{ base: "2xl", sm: "3xl" }}
        mb="6"
        color="yellow.400"
      >
        Share Your Experience
      </Heading>

      <Formik
        initialValues={{ pseudo: "", comment: "" }}
        validationSchema={ReviewSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={4}>
              {/* Pseudo Field */}
              <Field name="pseudo">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.pseudo && form.touched.pseudo}
                  >
                    <FormLabel color="yellow.400" fontWeight="semibold">
                      Pseudo
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter your pseudo"
                      borderRadius="md"
                      size="lg"
                      _focus={{ borderColor: "teal.500" }}
                    />
                    <FormErrorMessage>{form.errors.pseudo}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Comment Field */}
              <Field name="comment">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.comment && form.touched.comment}
                  >
                    <FormLabel color="yellow.400" fontWeight="semibold">
                      Comment
                    </FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Enter your comment"
                      resize="vertical"
                      borderRadius="md"
                      size="lg"
                      _focus={{ borderColor: "teal.500" }}
                    />
                    <FormErrorMessage>{form.errors.comment}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                isLoading={isSubmitting || mutation.isLoading}
                isFullWidth
                borderRadius="md"
                _hover={{ bg: "teal.600" }}
              >
                Submit Review
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </MotionBox>
  );
};

export default CreateReview;
