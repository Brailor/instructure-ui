import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import List from '../index'

describe('List.theme', () => {
  describe('with the default theme', () => {
    const variables = List.generateTheme()

    it('should have a background and default text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
    })

    it('should have a background and pipe variant text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.pipeColor)).to.be.above(3)
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = List.generateTheme('canvas-high-contrast')

    it('should have a background and default text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
    })

    it('should have a background and pipe variant text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.pipeColor)).to.be.above(4.5)
    })
  })
})
