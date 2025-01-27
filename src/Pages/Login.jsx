import React, { useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"; // Import Formik
import * as Yup from "yup"; // Import Yup
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext); // Access the login function from AuthContext
  const navigate = useNavigate(); // Hook for navigation
  const bgGradient = useColorModeValue(
    "linear(to-br, teal.100, teal.200, teal.300)",
    "linear(to-br, gray.800, gray.700, gray.600)"
  );
  const boxBg = useColorModeValue("white", "gray.700");

  // Formik initial values and validation schema
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Call the login function from context
        await login(values);
        navigateToRole(); // Redirect to role-based dashboard after login
      } catch (err) {
        formik.setFieldError("general", "L'email ou le mot de passe est incorrect");
      }
    },
  });

  const navigateToRole = () => {
    const role = localStorage.getItem("role"); // Get the user's role from localStorage
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "veterinarian") {
      navigate("/vet/dashboard");
    } else if (role === "employee") {
      navigate("/employee/dashboard");
    }
  };

  return (
    <Flex  bgColor = 'gray.800'align="center" justify="center" minH="100vh" px={4}>
      <Box w={{ base: "100%", md: "420px" }} p={6}     bg="linear-gradient(to right, #2d3748, #4a5568)" borderRadius="lg" boxShadow="lg">
        <Heading textAlign="center" size="lg" mb={6} color="yellow.400">
          Bienvenue à nouveau !
        </Heading>
        <Text textAlign="center" mb={8} color="gray.200">
          Veuillez vous connecter à votre compte pour continuer.
        </Text>

        {formik.errors.general && (
          <Alert status="error" mb={6}>
            <AlertIcon />
            {formik.errors.general}
          </Alert>
        )}

        <VStack spacing={5} as="form" onSubmit={formik.handleSubmit}>
          <FormControl id="email" isRequired isInvalid={formik.touched.email && formik.errors.email}>
            <FormLabel color="yellow.400">Email</FormLabel>
            <Input
              type="email"
              placeholder="Entrez votre email"
              focusBorderColor="teal.500"
              borderColor="gray.300"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <Text color="red.500" fontSize="sm">{formik.errors.email}</Text>
            )}
          </FormControl>

          <FormControl id="password" isRequired isInvalid={formik.touched.password && formik.errors.password}>
            <FormLabel color="yellow.400">Mot de passe</FormLabel>
            <Input
              type="password"
              placeholder="Entrez votre mot de passe"
              focusBorderColor="teal.500"
              borderColor="gray.300"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <Text color="red.500" fontSize="sm">{formik.errors.password}</Text>
            )}
          </FormControl>

          <Button type="submit" width="full" colorScheme="teal" _hover={{ bg: "teal.600" }} size="lg">
            Se connecter
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
