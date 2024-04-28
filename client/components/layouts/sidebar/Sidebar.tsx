'use client'
import React from 'react';
import { IRoute } from '@/variables/routes';
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import logo from "@/statics/logo.svg";
interface ISidebarProps {
  routes: IRoute[];
}

const Sidebar = ({ routes }: ISidebarProps) => {
  const { user, signOut, isAuthenticated } = useAuth();
  const textColor = useColorModeValue('navy.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  const shadowPillBar = useColorModeValue(
    '4px 8px 20px 4px rgba(100, 100, 100, 0.3)',
    'none'
  );
  let variantChange = '0.2s linear';
  let shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue('white', 'navy.800');
  let sidebarRadius = '14px';
  let sidebarMargins = '0px';
  return (
    <Box display={{ base: 'none', xl: 'block' }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="285px"
        ms={{
          sm: '16px'
        }}
        my={{
          sm: '16px'
        }}
        h="calc(100vh - 32px)"
        m={sidebarMargins}
        borderRadius={sidebarRadius}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Flex
          direction="column"
          height="100%"
          pt="20px"
          pb="26px"
          borderRadius="30px"
          maxW="285px"
          px="20px"
        >
          <Link href="/content-generator">
            <img src={logo.src} alt="Logo" />
          </Link>
          <Box my=" 8px" borderBottom="1px solid" borderColor="gray.200" />
          <Stack direction="column" mb="auto" mt="8px">
            {routes.map((route, index) => (
              <Box key={index} ps="20px" pe={{ md: '0px', '2xl': '0px' }}>
                <Link href={route.path}>
                  <Flex alignItems="center">
                    {route.icon && <route.icon width="20px" height="20px" color="rgb(43, 87, 70)" />}
                    <Box ml="16px" />
                    <Text color={textColor} fontSize="larger" fontWeight="medium">
                      {route.name}
                    </Text>
                  </Flex>
                </Link>
              </Box>
            ))}
          </Stack>
          {isAuthenticated && (
            <>
              <Flex
                mt="8px"
                justifyContent="center"
                alignItems="center"
                boxShadow={shadowPillBar}
                borderRadius="30px"
                p="14px"
              >
                <Text color={textColor} fontSize="larger" fontWeight="600" me="10px">
                  {user?.name.toUpperCase()}
                </Text>

                <Button
                  variant="transparent"
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="full"
                  w="50px"
                  h="50px"
                  px="0px"
                  minW="34px"
                  justifyContent={'center'}
                  alignItems="center"
                  onClick={signOut}
                >
                  <Icon as={FiLogOut} width="16px" height="16px" color="inherit" />
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar;
