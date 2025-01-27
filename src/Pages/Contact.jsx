import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const toast = useToast();

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Veuillez entrer votre nom."),
    email: Yup.string()
      .email("Adresse e-mail invalide.")
      .required("Veuillez entrer votre adresse e-mail."),
    message: Yup.string().required("Veuillez entrer votre message."),
  });

  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Message envoyé.",
        description: "Votre message a été envoyé avec succès. Nous vous répondrons bientôt.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      actions.resetForm();
    }, 1000);
  };

  return (
    <Box bg="gray.800" color="white">
      {/* Header Section */}
      <Box
        bgImage="url('https://images.unsplash.com/photo-1580278858858-d4ef9ce4b9c8')"
        bgSize="cover"
        bgPosition="center"
        py={20}
        px={5}
       
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          bg="rgba(0, 0, 0, 0.6)"
          py={10}
          px={5}
          borderRadius="md"
           color="yellow.400"
         
        >
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4}>
            Contactez-Nous
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="600px" textAlign="center">
            Nous sommes là pour répondre à toutes vos questions ou préoccupations. Remplissez le
            formulaire ci-dessous, et nous vous répondrons dès que possible !
          </Text>
        </Flex>
      </Box>

      {/* Contact Form Section */}
      <Box py={10} px={5} bg="gray.800">
        <VStack spacing={6} align="center" maxW="700px" mx="auto">
          <Heading fontSize="2xl" color="yellow.400">
            Laissez-nous un message
          </Heading>
          <Text fontSize="md" color="gray.400" textAlign="center">
            Remplissez vos coordonnées et votre message. Nous ferons de notre mieux pour vous
            répondre rapidement.
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "100%" }}>
                <VStack spacing={4}>
                  <FormControl isInvalid={errors.name && touched.name}>
                    <FormLabel color="yellow.400">Nom</FormLabel>
                    <Field
                    
                      as={Input}
                      name="name"
                      placeholder="Entrez votre nom"
                      focusBorderColor="teal.500"
                    />
                    <Text color="red.500" fontSize="sm">
                      {errors.name && touched.name ? errors.name : ""}
                    </Text>
                  </FormControl>

                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel color="yellow.400">Email</FormLabel>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="Entrez votre adresse e-mail"
                      focusBorderColor="teal.500"
                    />
                    <Text color="red.500" fontSize="sm">
                      {errors.email && touched.email ? errors.email : ""}
                    </Text>
                  </FormControl>

                  <FormControl isInvalid={errors.message && touched.message}>
                    <FormLabel color="yellow.400">Message</FormLabel>
                    <Field
                      as={Textarea}
                      name="message"
                      placeholder="Écrivez votre message ici"
                      focusBorderColor="teal.500"
                      rows={5}
                    />
                    <Text color="red.500" fontSize="sm">
                      {errors.message && touched.message ? errors.message : ""}
                    </Text>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    w="full"
                    _hover={{ bg: "teal.600" }}
                  >
                    Envoyer
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </VStack>
      </Box>
    </Box>
  );
};

export default Contact;
