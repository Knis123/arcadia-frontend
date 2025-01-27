import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Box,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

import authService from "../../Services/authService.js";

const RegisterVet = () => {
  const toast = useToast();
 

  // Schéma de validation avec Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("L'adresse e-mail est obligatoire"),
    username: Yup.string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
      .required("Le nom d'utilisateur est obligatoire"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Le mot de passe est obligatoire"),
  });

  // Gestionnaire de soumission du formulaire
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await authService.registerVet(values);
      toast({
        title: "Compte créé avec succès.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    
    } catch (error) {
      if (error.response?.status === 403) {
        toast({
          title: "Non autorisé",
          description: "Seuls les administrateurs peuvent enregistrer des vétérinaires.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Une erreur s'est produite.",
          description: error.response?.data?.message || "Impossible de créer le compte.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      p={8}
      maxWidth="500px"
      mx="auto"
      mt="50px"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h1" size="lg" textAlign="center" mb={4}>
        Inscription 
      </Heading>
      <Text textAlign="center" mb={6} color="gray.600">
      Créez un compte vétirinaire
      </Text>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.email && touched.email}>
                <FormLabel htmlFor="email">Adresse e-mail</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Entrez votre adresse e-mail"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.username && touched.username}>
                <FormLabel htmlFor="username">Nom d'utilisateur</FormLabel>
                <Field
                  as={Input}
                  id="username"
                  name="username"
                  placeholder="Entrez votre nom d'utilisateur"
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password && touched.password}>
                <FormLabel htmlFor="password">Mot de passe</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
                width="full"
              >
                Créer
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterVet;
