import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        darkBlue: '#364652',
        offBlack: '#071108',
        lightBlue: {
            100: '#BBD1EA',
            200: '#A1C6EA',
        },
        offWhite: '#E4E7EF',
        brightGreen: '#55D45A',
        softRed: '#D06167',
    },
    components: {
        Button: {
            baseStyle: {
                background: 'dark',
                color: 'customDeepGreen',
            }
        },
    },
});

export default theme;
