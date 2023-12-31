import { createTheme } from "@mui/material";
import { colors } from "@mui/material";

const appTheme = createTheme({

    // shadows: ['none'], // to disable shadows globally

    typography: {
        fontFamily: [
          'Lato'
        ].join(','),
        allVariants: {
            color: '#444'
        }
      },

    palette: {
        // primary: {
        //     main: '#000000',
        //     test: '#ff5722',
        // },
        red: {
            main: '#ff5722',
            dark: '#ff5722',
            medium: '#ff5722',
            light: '#f7eae6',
        },
        blue: {
            main: '#4184f3',
            dark: '#ff5722',
            medium: '#679df5',
            light: '#E7EDF9',
        },
        black: {
            main: '#444',
            dark: '#ff5722',
            medium: '#ff5722',
            light: '#ff5722',
            text: '#444',
            textLight: '#000000'
        },
        grey: {
            main: '#bdbdbd',
            dark: '#ff5722',
            medium: '#ff5722',
            light: '#ff5722',
            text: '#b2b2b2',
        },
        green: {
            main: '#4caf50',
            dark: '#ff5722',
            medium: '#70bf73',
            light: '#ff5722',
        },
        secondary: {
            main: '#ffffff',
        },
        bandar: {
            main: colors.blue[900],
        },
        
    },
})

export default appTheme;