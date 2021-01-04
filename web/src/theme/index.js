const borderColor = '#e6e9ed'
const darkGrey = '#1e1e1e'
const error = '#db3a3d'
const errorDark = '#BC3033'
const lightGrey = '#fafafa'
const mediumGrey = '#767676'
const primary = '#e6007a'
const primaryDark = '#bf0065'
const textColor = '#1e1e1e'

const theme = {
  fonts: {
    defaultSize: '15px',
    fontFamily: `'Work Sans', 'Helvetica Neue', 'Arial', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', '-apple-system', 'BlinkMacSystemFont', sans-serif`,
    fontFamilyCode: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
  border: {
    color: borderColor,
    borderRadius: '4px',
  },
  buttonPrimary: {
    backgroundColor: primary,
    backgroundColorHover: primaryDark,
    borderColor: primary,
    borderColorHover: primaryDark,
    color: '#fff',
    colorHover: '#fff',
  },
  buttonPrimaryInverted: {
    backgroundColor: '#fff',
    backgroundColorHover: primaryDark,
    borderColor: primary,
    borderColorHover: primaryDark,
    color: primary,
    colorHover: '#fff',
  },
  buttonDanger: {
    backgroundColor: error,
    backgroundColorHover: errorDark,
    borderColor: error,
    borderColorHover: errorDark,
    color: '#fff',
    colorHover: '#fff',
  },
  cards: {
    backgroundColor: '#fff',
    borderRadius: '4px ',
    boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.05)',
    paddingHorizontal: '12px',
    paddingVertical: '12px',
  },
  colors: {
    darkBlue: '#001428',
    darkGrey: darkGrey,
    delete: error,
    error: error,
    mainBodyBackground: '#F8F9FA',
    mediumGrey: mediumGrey,
    primary: primary,
    textColor: textColor,
    tomatoRed: error,
    warning: '#ffc05f',
  },
  dropdown: {
    item: {
      backgroundColor: 'transparent',
      backgroundColorActive: lightGrey,
      backgroundColorHover: lightGrey,
      borderColor: borderColor,
      color: textColor,
      colorActive: textColor,
      height: '37px',
      paddingHorizontal: '12px',
    },
  },
  header: {
    backgroundColor: primary,
    height: '60px',
  },
  layout: {
    horizontalPadding: '10px',
    maxWidth: '1080px',
  },
  textField: {
    backgroundColor: '#fff',
    backgroundColorActive: '#fff',
    borderColor: '#d8d8d8',
    borderColorActive: '#080808',
    borderRadius: '2px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: textColor,
    colorPlaceholder: '#a2a2a2',
    errorColor: error,
    fontSize: '13px',
    fontWeight: '400',
    height: '26px',
    paddingHorizontal: '8px',
  },
  themeBreakPoints: {
    lg: '992px',
    md: '769px',
    mdPre: '768px',
    sm: '480px',
    xl: '1024px',
    xs: '320px',
    xxl: '1280px',
    xxxl: '1366px',
  },
}

export default theme
