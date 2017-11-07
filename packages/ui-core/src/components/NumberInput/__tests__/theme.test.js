import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import NumberInput from '../index'

describe('NumberInput.theme', () => {
  describe('with the default theme', () => {
    const variables = NumberInput.generateTheme()

    describe('default', () => {
      it('should ensure focus color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(3)
      })

      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(3)
      })
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = NumberInput.generateTheme('canvas-high-contrast')

    describe('default', () => {
      it('should ensure focus color and background color meet 4.5:1 contrast', () => {
        expect(contrast(variables.background, variables.focus))
          .to.be.above(4.5)
      })

      it('should ensure text color and background color meet 3:1 contrast', () => {
        expect(contrast(variables.color, variables.background))
          .to.be.above(4.5)
      })
    })
  })
})
