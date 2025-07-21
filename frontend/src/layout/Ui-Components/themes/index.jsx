import { createTheme } from '@mui/material/styles';

// assets
// Asegúrate de que colors sea un objeto con los colores que necesitas
import colorss from '../../../assets/scss/_themes-vars.module.scss';
import colors from '../../../assets/theme/base/colors.jsx'; // Esto parece ser el objeto de colores principal

// project imports
import componentStyleOverrides from './compStyleOverride.jsx';
import themePalette from './palette.jsx';
//import themeTypography from './typography'; // Si este es un objeto de tipografía, debería ir en `typography`

// Soft UI Dashboard PRO React base styles
import breakpoints from '../../../assets/theme/base/breakpoints.jsx';
import typography from '../../../assets/theme/base/typography.jsx';
import boxShadows from '../../../assets/theme/base/boxShadows.jsx';
import borders from '../../../assets/theme/base/borders.jsx';
import globals from '../../../assets/theme/base/globals.jsx';

// Soft UI Dashboard PRO React helper functions
import boxShadow from '../../../assets/theme/functions/boxShadow.jsx';
import hexToRgb from '../../../assets/theme/functions/hexToRgb.jsx';
import linearGradient from '../../../assets/theme/functions/linearGradient.jsx';
import pxToRem from '../../../assets/theme/functions/pxToRem.jsx';
import rgba from '../../../assets/theme/functions/rgba.jsx';

// Importa todos tus overrides de componentes de MUI aquí
// Si el archivo de un componente está comentado, no lo importes o descoméntalo si lo necesitas
import sidenav from '../../../assets/theme/components/sidenav.jsx';
import list from '../../../assets/theme/components/list/index.jsx';
import listItem from '../../../assets/theme/components/list/listItem.jsx';
import listItemText from '../../../assets/theme/components/list/listItemText.jsx';
import card from '../../../assets/theme/components/card/index.jsx';
import cardMedia from '../../../assets/theme/components/card/cardMedia.jsx';
import cardContent from '../../../assets/theme/components/card/cardContent.jsx';
import button from '../../../assets/theme/components/button/index.jsx';
import iconButton from '../../../assets/theme/components/iconButton.jsx';
import inputBase from '../../../assets/theme/components/form/inputBase.jsx';
import menu from '../../../assets/theme/components/menu/index.jsx';
import menuItem from '../../../assets/theme/components/menu/menuItem.jsx';
import switchButton from '../../../assets/theme/components/form/switchButton.jsx';
import divider from '../../../assets/theme/components/divider.jsx';
import tableContainer from '../../../assets/theme/components/table/tableContainer.jsx';
import tableHead from '../../../assets/theme/components/table/tableHead.jsx';
import tableCell from '../../../assets/theme/components/table/tableCell.jsx';
import linearProgress from '../../../assets/theme/components/linearProgress.jsx';
import breadcrumbs from '../../../assets/theme/components/breadcrumbs.jsx';
import slider from '../../../assets/theme/components/slider.jsx';
import avatar from '../../../assets/theme/components/avatar.jsx';
import tooltip from '../../../assets/theme/components/tooltip.jsx';
import appBar from '../../../assets/theme/components/appBar.jsx';
import tabs from '../../../assets/theme/components/tabs/index.jsx';
import tab from '../../../assets/theme/components/tabs/tab.jsx';
import stepper from '../../../assets/theme/components/stepper/index.jsx';
import step from '../../../assets/theme/components/stepper/step.jsx';
import stepConnector from '../../../assets/theme/components/stepper/stepConnector.jsx';
import stepLabel from '../../../assets/theme/components/stepper/stepLabel.jsx';
import stepIcon from '../../../assets/theme/components/stepper/stepIcon.jsx';
import select from '../../../assets/theme/components/form/select.jsx';
import formControlLabel from '../../../assets/theme/components/form/formControlLabel.jsx';
import formLabel from '../../../assets/theme/components/form/formLabel.jsx';
import checkbox from '../../../assets/theme/components/form/checkbox.jsx';
import radio from '../../../assets/theme/components/form/radio.jsx';
import autocomplete from '../../../assets/theme/components/form/autocomplete.jsx';
import input from '../../../assets/theme/components/form/input.jsx';
import flatpickr from '../../../assets/theme/components/flatpickr.jsx';
import swal from '../../../assets/theme/components/swal.jsx';
import container from '../../../assets/theme/components/container.jsx';
import popover from '../../../assets/theme/components/popover.jsx';
import buttonBase from '../../../assets/theme/components/buttonBase.jsx';
import icon from '../../../assets/theme/components/icon.jsx';
import svgIcon from '../../../assets/theme/components/svgIcon.jsx';
import link from '../../../assets/theme/components/link.jsx';
import dialog from '../../../assets/theme/components/dialog/index.jsx';
import dialogTitle from '../../../assets/theme/components/dialog/dialogTitle.jsx';
import dialogContent from '../../../assets/theme/components/dialog/dialogContent.jsx';
import dialogContentText from '../../../assets/theme/components/dialog/dialogContentText.jsx';
import dialogActions from '../../../assets/theme/components/dialog/dialogActions.jsx';


export const theme = (customization) => {
  const color = colors; // Asume que 'colors' es el objeto de tus variables de color base

  const themeOption = {
    colors: color, // Esto puede ser redundante si ya estás pasando 'color' a palette
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization, // Pasa la personalización si themePalette o componentStyleOverrides la necesitan
  };

  // Define tu objeto de componentes aquí
  const componentsOverrides = {
    ...componentStyleOverrides(themeOption), // Asegúrate de que esto devuelve un objeto de overrides de componentes válido
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...swal,
        ...container,
      },
    },
    // Descomenta y agrega los objetos de estilo de componentes que necesites
    // MuiDrawer: { ...sidenav },
    // MuiList: { ...list },
    // MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    // MuiCard: { ...card },
    // MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    // MuiIconButton: { ...iconButton },
    // MuiInputBase: { ...inputBase },
    // MuiMenu: { ...menu },
    // MuiMenuItem: { ...menuItem },
    // MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    // MuiTableContainer: { ...tableContainer },
    // MuiTableHead: { ...tableHead },
    // MuiTableCell: { ...tableCell },
    // MuiLinearProgress: { ...linearProgress },
    // MuiBreadcrumbs: { ...breadcrumbs },
    // MuiSlider: { ...slider },
    // MuiAvatar: { ...avatar },
    // MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    // MuiTabs: { ...tabs },
    // MuiTab: { ...tab },
    // MuiStepper: { ...stepper },
    // MuiStep: { ...step },
    // MuiStepConnector: { ...stepConnector },
    // MuiStepLabel: { ...stepLabel },
    // MuiStepIcon: { ...stepIcon },
    // MuiSelect: { ...select },
    // MuiFormControlLabel: { ...formControlLabel },
    // MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    // MuiRadio: { ...radio },
    // MuiAutocomplete: { ...autocomplete },
    // MuiInput: { ...input },
    // MuiOutlinedInput: { ...input },
    // MuiFilledInput: { ...input },
    // MuiPopover: { ...popover },
    // MuiButtonBase: { ...buttonBase },
    // MuiIcon: { ...icon },
    // MuiSvgIcon: { ...svgIcon },
    // MuiLink: { ...link },
    // MuiDialog: { ...dialog },
    // MuiDialogTitle: { ...dialogTitle },
    // MuiDialogContent: { ...dialogContent },
    // MuiDialogContentText: { ...dialogContentText },
    // MuiDialogActions: { ...dialogActions },
  };


  const fullThemeOptions = {
    breakpoints: { ...breakpoints },
    direction: 'ltr',
    palette: {
      ...themePalette(themeOption), // Asegúrate de que esto devuelve un objeto de paleta válido
      ...colors, // Esto podría sobrescribir partes de themePalette si tienen claves en común
    },
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '38px',
        },
      },
    },
    typography: {
      ...typography, // Asegúrate de que esto es un objeto de tipografía válido de MUI
    },
    boxShadows: { ...boxShadows },
    borders: { ...borders },
    functions: { // Esto es una adición personalizada, asegúrate de que no entre en conflicto con las propiedades internas de MUI
      boxShadow,
      hexToRgb,
      linearGradient,
      pxToRem,
      rgba,
    },
    components: { // Aquí es donde se deben pasar los overrides de componentes
      ...componentsOverrides,
    },
  };

  const themes = createTheme(fullThemeOptions); // Pasa todas las opciones a createTheme en una sola llamada

  return themes;
};

export default theme;