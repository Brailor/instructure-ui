/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'

import Component from '../index'

describe('<AudioSignal />', () => {
  const props = {
    soundMeter: {
      processor: {
        volume: 0.1
      }
    }
  }

  const testbed = new Testbed(<Component {...props} />)

  it('should render', () => {
    const AudioSignal = testbed.render()
    expect(AudioSignal).to.be.present
  })

  it('should render a <progress />', () => {
    const AudioSignal = testbed.render()
    expect(AudioSignal.find('progress').length).to.eql(1)
  })

  describe('getVolume', () => {
    it('gets the volume from the sound processor and updates local state', () => {
      const AudioSignal = testbed.render()
      AudioSignal.instance().getVolume()
      expect(AudioSignal.state('value')).to.eql(15)
    })
  })
})
