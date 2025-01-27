import React from 'react';
import Hero from '../Components/Client/Hero';
import About from '../Components/Client/About';
import Contact from '../Components/Client/Contact';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CreateReview from '../Components/Client/CreateReview';
import Review from '../Components/Client/Review';


// Define motion element from Chakra UI
const MotionBox = motion(Box);

const Home = () => {
  
    // Define animations for fading up sections
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };
    const bgColor = useColorModeValue('gray.800', 'gray.900');
    return (
        <Box bg={bgColor}>
            {/* Hero Section */}
            <MotionBox
                as="section"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                textAlign="center"
            >
                <Hero />
            </MotionBox>

            {/* About Section */}
            <MotionBox
                as="section"
                py="6rem"
                px="2rem"
               
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
               
            >
               
                <About />
            </MotionBox>

          

            {/* Contact Section */}
            <MotionBox
                as="section"
                py="6rem"
                
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
               
                <Contact />
                <Box marginTop='5rem'>
                <CreateReview />
                </Box>
                
                <Review />
            </MotionBox>
        </Box>
    );
};

export default Home;
