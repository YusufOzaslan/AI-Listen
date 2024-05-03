'use client';
/* eslint-disable */
import {
    Box,
    Flex,
    Link,
    useColorModeValue
} from '@chakra-ui/react';

export default function Navbar(props: {
    pathName: string;
    logoText: string;
}) {
    const { pathName } = props;

    let mainText = useColorModeValue('navy.700', 'white');
    let navbarPosition = 'fixed' as const;
    let navbarFilter = 'none';
    let navbarBackdrop = 'blur(20px)';
    let navbarShadow = 'none';
    let navbarBg = useColorModeValue(
        'rgba(51, 108, 91, 0.2)',
        'rgba(51, 108, 91, 0.5)'
    );
    let navbarBorder = 'transparent';
    let secondaryMargin = '0px';
    let gap = '0px';

    return (
        <Box
            zIndex="100"
            position={navbarPosition}
            boxShadow={navbarShadow}
            bg={navbarBg}
            borderColor={navbarBorder}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            backgroundPosition="center"
            backgroundSize="cover"
            borderRadius="16px"
            borderWidth="1.5px"
            borderStyle="solid"
            transitionDelay="0s, 0s, 0s, 0s"
            transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
            transition-property="box-shadow, background-color, filter, border"
            transitionTimingFunction="linear, linear, linear, linear"
            alignItems={{ xl: 'center' }}
            display={'flex'}
            minH="75px"
            justifyContent={{ xl: 'center' }}
            lineHeight="25.6px"
            mx="auto"
            mt={secondaryMargin}
            pb="8px"
            right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
            px={{
                base: '8px',
                md: '10px'
            }}
            ps={{
                base: '8px',
                md: '12px'
            }}
            pt="8px"
            top={{ base: '12px', md: '16px', xl: '18px' }}
            w={{
                base: 'calc(100vw - 8%)',
                md: 'calc(100vw - 8%)',
                lg: 'calc(100vw - 6%)',
                xl: 'calc(100vw - 350px)',
                '2xl': 'calc(100vw - 365px)'
            }}>
            <Flex
                w="100%"
                flexDirection={{
                    base: 'column',
                    md: 'row'
                }}
                alignItems={{ xl: 'center' }}
                mb={gap}>
                <Box mb={{ base: '8px', md: '0px' }}>
                    <Link
                        color={mainText}
                        href="#"
                        bg="inherit"
                        borderRadius="inherit"
                        fontWeight="bold"
                        fontSize="34px"
                        p="0px"
                        _hover={{ color: { mainText } }}
                        _active={{
                            bg: 'inherit',
                            transform: 'none',
                            borderColor: 'transparent'
                        }}
                        _focus={{
                            boxShadow: 'none'
                        }}>
                        {pathName}
                    </Link>
                </Box>
            </Flex>
        </Box>
    );
}
