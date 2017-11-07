import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import Pill from '../index'

describe('Pill.theme', () => {
  describe('with the canvas theme', () => {
    const variables = Pill.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = Pill.generateTheme('canvas-high-contrast')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })
  })
})
