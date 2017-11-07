import { contrast } from '@instructure/ui-themeable/lib/utils/color'

import AutocompleteOptionsList from '../index'

describe('AutocompleteField.theme', () => {
  describe('with the canvas theme', () => {
    const variables = AutocompleteOptionsList.generateTheme()

    it('should have a highlightedBackground and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.highlightedBackground, variables.activeLabelColor)).to.be.above(3)
    })

    it('should have an activeBackground and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.activeBackground, variables.activeLabelColor)).to.be.above(3)
    })
  })

  describe('with the accessible canvas theme', () => {
    const variables = AutocompleteOptionsList.generateTheme('canvas-high-contrast')

    it('should have a highlightedBackground and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.highlightedBackground, variables.activeLabelColor)).to.be.above(4.5)
    })

    it('should have an activeBackground and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.activeBackground, variables.activeLabelColor)).to.be.above(4.5)
    })
  })
})
