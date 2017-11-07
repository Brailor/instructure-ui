import { alpha, darken } from '@instructure/ui-themeable/lib/utils/color'

const activeShadow = 'inset 0 0 3px 1px'
const focusShadow = 'inset 0 0 0 1px'
const focusOutline = '1px solid'

const buttonVariant = function (style, mainColor, textColor) {
  return {
    [`${style}Background`]: mainColor,
    [`${style}BorderColor`]: darken(mainColor, 10),
    [`${style}Color`]: textColor,
    [`${style}HoverBackground`]: darken(mainColor, 10),
    [`${style}ActiveBackground`]: darken(mainColor, 10),
    [`${style}ActiveBoxShadow`]: `${activeShadow} ${darken(mainColor, 20, 0.45)}`
  }
}

export default function generator ({ colors, borders, forms, spacing, typography }) {
  return {
    borderWidth: borders.widthSmall,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    textTransform: 'none',
    letterSpacing: 'normal',
    borderRadius: borders.radiusMedium,
    borderStyle: borders.style,

    transform: 'none',
    hoverTransform: 'none',

    smallHeight: forms.inputHeightSmall,
    smallPadding: spacing.xSmall,
    smallFontSize: typography.fontSizeSmall,

    mediumHeight: forms.inputHeightMedium,
    mediumPadding: spacing.small,
    mediumFontSize: typography.fontSizeMedium,

    largeHeight: forms.inputHeightLarge,
    largePadding: spacing.medium,
    largeFontSize: typography.fontSizeLarge,

    focusBorderRadius: borders.radiusMedium,
    focusBorder: `${focusOutline} ${colors.brand}`,
    focusShadow: 'none',

    lightBackground: colors.white,
    lightBorderColor: darken(colors.porcelain, 10),
    lightColor: colors.oxford,
    lightHoverBackground: darken(colors.white, 5),
    lightActiveBoxShadow: `${activeShadow} ${darken(colors.white, 25)}`,

    ghostBackground: 'transparent',
    ghostBorderColor: colors.brand,
    ghostBorderStyle: borders.style,
    ghostColor: colors.brand,
    ghostHoverBackground: alpha(colors.brand, 10),
    ghostActiveBoxShadow: `inset 0 0 1px 1px ${alpha(colors.brand, 20)}`,

    ghostInverseBackground: 'transparent',
    ghostInverseBorderColor: colors.white,
    ghostInverseColor: colors.white,
    ghostInverseHoverBackground: alpha(colors.white, 10),
    ghostInverseActiveBoxShadow: `inset 0 0 1px 1px ${alpha(colors.white, 20)}`,
    ghostInverseFocusBorder: `${focusOutline} ${colors.white}`,

    linkColor: colors.brand,
    linkBorderColor: 'transparent',
    linkFocusBorderColor: 'transparent',
    linkHoverColor: darken(colors.brand, 10),
    linkTextDecoration: 'none',

    linkInverseColor: colors.porcelain,

    iconBorderColor: 'transparent',
    iconPadding: `0 ${spacing.xxSmall}`,
    iconColor: colors.oxford,
    iconHoverColor: colors.brand,
    iconFocusBoxShadow: `${focusShadow} ${colors.brand}`,
    iconPlusTextFontSize: '1.25rem',
    iconPlusTextMargin: spacing.xxSmall,

    iconInverseColor: colors.white,
    iconInverseHoverColor: colors.white,
    iconInverseFocusBoxShadow: `${focusShadow} ${colors.white}`,

    fluidWidthLineHeight: typography.lineHeightFit,

    ...buttonVariant(
      'default',
      colors.porcelain,
      colors.oxford
    ),

    ...buttonVariant(
      'primary',
      colors.brand,
      colors.white
    ),

    ...buttonVariant(
      'success',
      colors.shamrock,
      colors.white
    ),

    ...buttonVariant(
      'danger',
      colors.crimson,
      colors.white
    ),

    ...buttonVariant(
      'circlePrimary',
      colors.brand,
      colors.white
    ),

    ...buttonVariant(
      'circleDanger',
      colors.crimson,
      colors.white
    )
  }
}

generator['canvas'] = function (variables) {
  return {
    focusBorder: `${focusOutline} ${variables['ic-brand-primary']}`,

    ghostBorderColor: variables['ic-brand-button--primary-bgd'],
    ghostColor: variables['ic-brand-button--primary-bgd'],
    ghostHoverBackground: alpha(variables['ic-brand-button--primary-bgd'], 10),
    ghostActiveBoxShadow: `inset 0 0 1px 1px ${alpha(variables['ic-brand-button--primary-bgd'], 20)}`,

    linkColor: variables['ic-link-color'],
    linkHoverColor: darken(variables['ic-link-color'], 10),

    iconHoverColor: variables['ic-brand-primary'],
    iconFocusBoxShadow: `${focusShadow} ${variables['ic-brand-primary']}`,

    ...buttonVariant(
      'primary',
      variables['ic-brand-button--primary-bgd'],
      variables['ic-brand-button--primary-text']
    ),

    ...buttonVariant(
      'circlePrimary',
      variables['ic-brand-button--primary-bgd'],
      variables['ic-brand-button--primary-text']
    )
  }
}

generator['canvas-a11y'] = generator['canvas-high-contrast'] = function ({ colors }) {
  return {
    linkTextDecoration: 'underline',
    linkFocusBorderColor: colors.brand
  }
}
