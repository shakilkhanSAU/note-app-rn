import { typography } from "../../theme/typography"


const base = {
    fontFamily: typography.nunitoRegular,
    fontSize: 16,
    color: 'black'
}

const medium = {
    fontFamily: typography.nunitoMedium,
    fontSize: 20,
    color: 'black'
}

const bold = {
    fontFamily: typography.nunitoBold,
    color: 'black'
}

export const presets = {
    default: {
        ...base
    },
    medium: {
        ...medium
    },
    h1: {
        ...bold,
        fontSize: 30
    },
    h2: {
        ...bold,
        fontSize: 24
    },
    h3: {
        ...bold,
        fontSize: 22
    },
    h4: {
        ...bold,
        fontSize: 18
    },
}