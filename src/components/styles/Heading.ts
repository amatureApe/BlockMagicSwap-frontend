import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { colors } from './colors'

const brandPrimary = defineStyle({
    color: colors.lightBlue[200],
    _dark: {
        color: colors.lightBlue[200],
    }
})

const underline = defineStyle({
    color: colors.lightBlue[100],
    _dark: {
        color: colors.lightBlue[200],
    },
    _hover: {
        borderColor: "red.200",
        _dark: {
            borderColor: "red.300"
        }
    }
})

export const headingTheme = defineStyleConfig({
    baseStyle: brandPrimary,
    variants: {
        "underline": underline
    },
})