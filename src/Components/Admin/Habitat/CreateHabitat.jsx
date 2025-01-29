import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import habitatService from '../../../Services/habitatService';
import { useState } from 'react';

const CreateHabitat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);

  const createHabitatMutation = useMutation({
    mutationFn: habitatService.createHabitat,
    onSuccess: () => {
      toast({
        title: 'Habitat created successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries(['habitatService']);
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error creating habitat',
        description: error.message || 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const initialValues = {
    name: '',
    description: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Habitat name is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    if (file) {
      formData.append('image', file);
    }

    createHabitatMutation.mutate(formData, {
      onSettled: () => {
        setSubmitting(false);
        resetForm();
        setFile(null);
      },
    });
  };

  return (
    <>
      <IconButton
        icon={<AddIcon />}
        aria-label="Add Habitat"
        colorScheme="teal"
        onClick={onOpen}
        size="sm"
      />

      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="md" shadow="lg" overflow="hidden">
          <ModalHeader bg="gray.100" borderBottom="1px solid" borderColor="gray.200" textAlign="center">
            Créer un habitat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="white">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel fontWeight="medium">Nom de l'habitat</FormLabel>
                      <Field as={Input} name="name" placeholder="Entrez le nom de l'habitat" focusBorderColor="teal.400" />
                      <ErrorMessage name="name" component={FormErrorMessage} />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="medium">Description</FormLabel>
                      <Field as={Textarea} name="description" placeholder="Entrez description" focusBorderColor="teal.400" />
                      <ErrorMessage name="description" component={FormErrorMessage} />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="medium">Image</FormLabel>
                      <Input type="file" accept="image/*" onChange={handleFileChange} />
                    </FormControl>
                  </VStack>
                  <ModalFooter  borderTop="1px solid" borderColor="gray.200">
                    <Button onClick={onClose} variant="outline" colorScheme="gray" mr={3}>
                      Annuler
                    </Button>
                    <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                      Sauvegarder
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

export default CreateHabitat;
