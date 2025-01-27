import {
  Box, Button, FormControl, FormLabel, Input, Textarea, FormErrorMessage,
  IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, useToast, Grid, Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import animalService from '../../../Services/animalService';
import habitatService from '../../../Services/habitatService'; // Supposons que vous avez ce service pour récupérer les habitats
import { useState } from 'react';

const CreateAnimal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null); // État pour le fichier image

  // Récupérer les habitats lorsque le composant est monté
  const { data: habitats = [], isLoading, isError } = useQuery({
    queryKey: ['habitats'],
    queryFn: habitatService.getAllHabitats,
    onError: (error) => {
      toast({
        title: 'Erreur lors de la récupération des habitats',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const createAnimalMutation = useMutation({
    mutationFn: animalService.createAnimal,
    onSuccess: () => {
      toast({
        title: 'Animal créé avec succès !',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['animals'] });  
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Erreur lors de la création de l\'animal.',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Erreur lors de la création de l\'animal :', error.response?.data || error.message);
    },
  });

  const initialValues = {
    name: '',
    race: '',
    habitat: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Le nom de l\'animal est requis'),
    race: Yup.string().required('La race de l\'animal est requise'),
    habitat: Yup.string().required('L\'habitat de l\'animal est requis'),
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('race', values.race);
    formData.append('habitat', values.habitat);
    if (file) {
      formData.append('image', file);
    }

    createAnimalMutation.mutate(formData, {
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
        aria-label="Ajouter un animal"
        colorScheme="teal"
        onClick={onOpen}
        size="sm"
        borderRadius="md"
        boxShadow="sm"
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="md" boxShadow="lg">
          <ModalHeader
            fontSize="lg"
            fontWeight="bold"
            bg="linear-gradient(to-r, #663300, #cc6600)"
            color="black"
          >
            Créer un nouvel animal
          </ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
                    <FormControl>
                      <FormLabel>Nom de l'animal</FormLabel>
                      <Field name="name" as={Input} placeholder="Entrez le nom de l'animal" />
                      <ErrorMessage name="name" component={FormErrorMessage} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Race</FormLabel>
                      <Field name="race" as={Textarea} placeholder="Entrez la race" />
                      <ErrorMessage name="race" component={FormErrorMessage} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Habitat</FormLabel>
                      <Field name="habitat" as={Select} placeholder="Sélectionnez un habitat">
                        {!isLoading && habitats && habitats.map((habitat) => (
                          <option key={habitat._id} value={habitat._id}>
                            {habitat.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="habitat" component={FormErrorMessage} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Image</FormLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                  </Grid>

                  <ModalFooter justifyContent="center" mt={6}>
                    <Button onClick={onClose} mr={3} colorScheme="gray">
                      Annuler
                    </Button>
                    <Button
                      colorScheme="teal"
                      borderRadius="md"
                      isLoading={isSubmitting}
                      type="submit"
                      size="sm"
                      width="auto"
                      _hover={{
                        bg: 'teal.600',
                        transform: 'scale(1.05)',
                        boxShadow: 'xl',
                      }}
                    >
                      Créer l'animal
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

export default CreateAnimal;
