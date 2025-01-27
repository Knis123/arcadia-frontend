import { Box, Flex, TabPanels, TabPanel, useColorModeValue, Tabs, Text } from '@chakra-ui/react';
import { useState } from 'react';


import SidebarVet from '../Components/Vet/SidebarVet';




import AnimalReport from '../Components/Vet/AnimalReport';




const VetDashboard = () => {
  const bg = useColorModeValue('#f9f9f9', '#1a202c');
  const panelBg = useColorModeValue('#ffffff', '#4a5568');

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Flex direction="column" minH="100vh" bg={bg}>
    
      <Flex flex="1" direction={{ base: 'column', md: 'row' }} minH="calc(100vh - 60px)">
        
        {/* Sidebar with TabList */}
        <SidebarVet activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content with TabPanels */}
        <Box flex="1" px={8} py={6} bg={bg}>
          <Tabs index={activeTab} onChange={setActiveTab} variant="soft-rounded" isFitted>
            <TabPanels bg={panelBg} borderRadius="lg" boxShadow="xl" p={6}>
              <TabPanel>
               <AnimalReport />
              </TabPanel>
              <TabPanel>
               
              </TabPanel>
              
              <TabPanel>
               
              </TabPanel>
              <TabPanel>
              
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
};

export default VetDashboard;