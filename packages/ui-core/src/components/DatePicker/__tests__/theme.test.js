import { contrast } from '@instructure/ui-themeable/lib/utils/color'
import DatePicker from '../index'

describe('DatePicker.theme', () => {
  describe('with the canvas theme', () => {
    const variables = DatePicker.generateTheme()

    it('should have a background and text colors that meet 3:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(3)
      expect(contrast(variables.todayBackground, variables.todayColor)).to.be.above(3)
      expect(contrast(variables.selectedBackground, variables.selectedColor)).to.be.above(3)
      expect(contrast(variables.background, variables.otherMonthColor)).to.be.above(3)
    })
  })

  describe('with the high contrast canvas theme', () => {
    const variables = DatePicker.generateTheme('canvas-high-contrast')

    it('should have a background and text colors that meet 4.5:1 contrast', () => {
      expect(contrast(variables.background, variables.color)).to.be.above(4.5)
      expect(contrast(variables.todayBackground, variables.todayColor)).to.be.above(4.5)
      expect(contrast(variables.selectedBackground, variables.selectedColor)).to.be.above(4.5)
      expect(contrast(variables.background, variables.otherMonthColor)).to.be.above(4.5)
    })
  })
})
