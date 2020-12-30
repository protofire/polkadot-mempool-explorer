const darkGrey = '#5d6d74'
const darkerGrey = '#445055'
const error = '#db3a3d'
const errorDark = '#BC3033'
const lightGrey = '#d4d5d3'
const mediumGrey = '#b2b5b2'
const primary = '#009cb4'
const primaryDark = '#00879B'
const textColor = '#5d6d74'
const whitesmoke1 = '#e8e7e6'
const whitesmoke2 = '#f3f2f2'
const whitesmoke3 = '#fafafa'

const theme = {
  fonts: {
    defaultSize: '14px',
    fontFamily: `'Averta', 'Helvetica Neue', 'Arial', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', '-apple-system', 'BlinkMacSystemFont', sans-serif`,
    fontFamilyCode: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
  border: {
    color: '#eceff1',
    colorDark: lightGrey,
    borderRadius: '6px',
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
    borderRadius: '8px ',
    boxShadow: '0 2px 8px 0 rgba(212, 213, 211, 0.7)',
    paddingHorizontal: '20px',
    paddingVertical: '24px',
  },
  colors: {
    darkBlue: '#001428',
    darkGrey: darkGrey,
    darkerGrey: darkerGrey,
    darkestGray: '#081728',
    delete: error,
    error: error,
    holdGreen: '#008c73',
    lightGreen: '#a1d2ca',
    lightGrey: lightGrey,
    lighterGreen: '#b6e2da',
    mainBodyBackground: whitesmoke2,
    mediumGrey: mediumGrey,
    primary: primary,
    textColor: textColor,
    tomatoRed: error,
    warning: '#ffc05f',
    whitesmoke1: whitesmoke1,
    whitesmoke2: whitesmoke2,
    whitesmoke3: whitesmoke3,
  },
  dropdown: {
    item: {
      backgroundColor: 'transparent',
      backgroundColorActive: whitesmoke3,
      backgroundColorHover: whitesmoke3,
      borderColor: lightGrey,
      color: textColor,
      colorActive: darkerGrey,
      height: '40px',
      paddingHorizontal: '12px',
    },
  },
  form: {
    disabled: {
      backgroundColor: '#fff',
      borderColor: '#E8EAF6',
      color: '#757575',
    },
  },
  header: {
    backgroundColor: '#fff',
    height: '60px',
  },
  layout: {
    commonContainerMaxWidth: '600px',
    horizontalPadding: '10px',
    maxWidth: '100%',
  },
  outcomes: {
    dimensions: '27px',
  },
  paddings: {
    mainPadding: '15px',
  },
  pillPrimary: {
    backgroundColor: '#caf2eb',
    color: '#348174',
  },
  pillOpen: {
    backgroundColor: whitesmoke1,
    color: textColor,
  },
  textField: {
    backgroundColor: '#fff',
    backgroundColorActive: '#fff',
    borderColor: mediumGrey,
    borderColorActive: '#aaa',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: textColor,
    colorPlaceholder: mediumGrey,
    errorColor: error,
    fontSize: '16px',
    fontWeight: '400',
    height: '36px',
    paddingHorizontal: '11px',
  },
  modalStyle: {
    content: {
      backgroundColor: '#fff',
      borderColor: 'transparent',
      borderRadius: '8px',
      bottom: 'auto',
      boxShadow: '0 2px 8px 0 rgba(212, 213, 211, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '0',
      height: 'fit-content',
      left: 'auto',
      margin: 'auto 0',
      maxWidth: '100%',
      overflow: 'hidden',
      paddingBottom: '24px',
      paddingHorizontal: '20px',
      paddingTop: '24px',
      position: 'relative',
      right: 'auto',
      top: 'auto',
      width: '600px',
      zIndex: '123456789',
    },
    overlay: {
      alignItems: 'unset',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
      padding: '10px',
      zIndex: '12345',
    },
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
