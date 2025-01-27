import {
  Box, Button, FormControl, FormLabel, Input, Textarea, FormErrorMessage,
  IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, useToast, Grid,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import zooService from '../../../Services/zooServices';

const CreateService = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const createServiceMutation = useMutation({
    mutationFn: zooService.createService,
    onSuccess: () => {
      toast({
        title: 'Service created successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['zooService'] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error creating zoo service.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error creating zoo service:', error);
    },
  });

  const initialValues = {
    name: '',
    description: '',
   
    
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Service name is required'),
    description: Yup.string().required('Description is required'),
   
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    createServiceMutation.mutate(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <IconButton
        icon={<AddIcon />}
        aria-label="Add Habitat"
        colorScheme="teal"
        onClick={onOpen}
        size="sm" // Small button
        borderRadius="md"
        boxShadow="sm"
      />

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="lg" boxShadow="lg" maxWidth="600px">
          <ModalHeader
            fontSize="xl"
            fontWeight="bold"
            bg="gray.100"
            color="black"
            borderTopRadius="md"
            p={4}
          >
            Create New Service
          </ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody p={6}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <FormControl isInvalid={Boolean(ErrorMessage)}>
                      <FormLabel htmlFor="name">Service Name</FormLabel>
                      <Field
                        name="name"
                        as={Input}
                        placeholder="Enter service name"
                      />
                      <ErrorMessage name="name" component={FormErrorMessage} />
                    </FormControl>

                    <FormControl isInvalid={Boolean(ErrorMessage)}>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Field
                        name="description"
                        as={Textarea}
                        placeholder="Enter description"
                      />
                      <ErrorMessage name="description" component={FormErrorMessage} />
                    </FormControl>
                  </Grid>

                  <ModalFooter justifyContent="center" mt={6}>
                    <Button
                      onClick={onClose}
                      mr={3}
                      colorScheme="gray"
                      variant="outline"
                      borderRadius="md"
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme="teal"
                      borderRadius="md"
                      isLoading={isSubmitting}
                      type="submit"
                      size="sm" // Small button
                      width="auto"
                      _hover={{
                        bg: 'teal.600',
                        transform: 'scale(1.05)',
                        boxShadow: 'xl',
                      }}
                    >
                      Create Zoo Service
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateService;
