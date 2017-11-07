import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import Button from '../index'

describe('Button.theme', () => {
  describe('with the default theme', () => {
    const variables = Button.generateTheme()

    describe('default', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.defaultBackground, variables.defaultColor))
          .to.be.above(3)
        expect(contrast(variables.defaultHoverBackground, variables.defaultColor))
          .to.be.above(3)
      })
    })

    describe('primary', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.primaryBackground, variables.primaryColor))
          .to.be.above(3)
        expect(contrast(variables.primaryHoverBackground, variables.primaryColor))
          .to.be.above(3)
      })
    })

    describe('success', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.successBackground, variables.successColor))
          .to.be.above(3)
        expect(contrast(variables.successHoverBackground, variables.successColor))
          .to.be.above(3)
      })
    })

    describe('danger', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.dangerBackground, variables.dangerColor))
          .to.be.above(3)
        expect(contrast(variables.dangerHoverBackground, variables.dangerColor))
          .to.be.above(3)
      })
    })

    describe('light', () => {
      it('should have a background and text colors that meet 3:1 contrast', () => {
        expect(contrast(variables.lightBackground, variables.lightColor))
          .to.be.above(3)
        expect(contrast(variables.lightHoverBackground, variables.lightColor))
          .to.be.above(3)
      })
    })
  })

  describe('with the "canvas-high-contrast" theme', () => {
    const variables = Button.generateTheme('canvas-high-contrast')

    describe('default', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.defaultBackground, variables.defaultColor))
          .to.be.above(4.5)
        expect(contrast(variables.defaultHoverBackground, variables.defaultColor))
          .to.be.above(4.5)
      })
    })

    describe('primary', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.primaryBackground, variables.primaryColor))
          .to.be.above(4.5)
        expect(contrast(variables.primaryHoverBackground, variables.primaryColor))
          .to.be.above(4.5)
      })
    })

    describe('success', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.successBackground, variables.successColor))
          .to.be.above(4.5)
        expect(contrast(variables.successHoverBackground, variables.successColor))
          .to.be.above(4.5)
      })
    })

    describe('danger', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.dangerBackground, variables.dangerColor))
          .to.be.above(4.5)
        expect(contrast(variables.dangerHoverBackground, variables.dangerColor))
          .to.be.above(4.5)
      })
    })

    describe('light', () => {
      it('should have a background and text colors that meet 4.5:1 contrast', () => {
        expect(contrast(variables.lightBackground, variables.lightColor))
          .to.be.above(4.5)
        expect(contrast(variables.lightHoverBackground, variables.lightColor))
          .to.be.above(4.5)
      })
    })
  })
})
