// @ts-nocheck
import { routes } from '@/variables/routes';
import { Box, Portal, useDisclosure } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';


interface IProps {
    children: ReactNode;
}

const PageLayout: FC<IProps> = ({ children }) => {
    const pathname = usePathname();
    const matchedRoute = routes.find(route => pathname.includes(route.path));
    const formattedPathname = matchedRoute ? matchedRoute.name : pathname;

    return (
        <Box>
            <Sidebar routes={routes} />
            <Box
                float='right'
                w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                pt={{ base: '60px', md: '100px' }}
                minHeight="100vh"
                height="100%"
                overflow="auto"
                position="relative"
                maxHeight="100%"
                transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                transitionDuration=".2s, .2s, .35s"
                transitionProperty="top, bottom, width"
                transitionTimingFunction="linear, linear, ease">

                <Portal>
                    <Box>
                        <Navbar
                            logoText={''}
                            pathName={formattedPathname}
                        />
                    </Box>
                </Portal>
                <Box
                    mx="auto"
                    p={{ base: '20px', md: '30px' }}
                    pe="20px"
                    minH="100vh"
                    pt="50px">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export { PageLayout };
