import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/authService";

const RegisterEmployee = () => {
  const toast = useToast();
 

  // Validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'adresse email est obligatoire"),
    username: Yup.string()
      .min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères")
      .required("Le nom d'utilisateur est obligatoire"),
    password: Yup.string()
      .min(6, "Le mot de passe doit comporter au moins 6 caractères")
      .required("Le mot de passe est obligatoire"),
  });

  // Form submission handler
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await authService.registerEmployee(values);
      toast({
        title: "Compte créé",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
     
    } catch (error) {
      if (error.response?.status === 403) {
        toast({
          title: "Non autorisé",
          description: "Seuls les administrateurs peuvent inscrire des employées.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Une erreur est survenue",
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
    <Box bg="gray.50" minH="100vh" py={10} px={6}>
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        maxWidth="400px"
        mx="auto"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={4}>
          Inscription 
        </Heading>
        <Text fontSize="sm" textAlign="center" mb={6} color="gray.600">
          Créez un compte employé .
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
                  <FormLabel htmlFor="email">Adresse Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Entrez votre adresse email"
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
                  <FormLabel htmlFor="password">Mot de Passe</FormLabel>
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
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                  width="full"
                  mt={4}
                >
                  Créer
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default RegisterEmployee;
