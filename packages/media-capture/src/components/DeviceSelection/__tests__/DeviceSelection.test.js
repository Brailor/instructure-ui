import React from 'react'

import Component from '../index'

describe('<DeviceSelection />', () => {
  const props = {
    devices: [],
    selectedDeviceId: '',
    variant: 'audio',
    actions: {
      audioDeviceChanged: () => {},
      videoDeviceChanged: () => {}
    }
  }

  const testbed = new Testbed(<Component {...props} />)

  it('should render', () => {
    const DeviceSelection = testbed.render()
    expect(DeviceSelection).to.be.present
  })

  it('should render a <PopoverMenu />', () => {
    const DeviceSelection = testbed.render()
    expect(DeviceSelection.find('PopoverMenu').length).to.eql(1)
  })

  it('should render a <Button />', () => {
    const DeviceSelection = testbed.render()
    expect(DeviceSelection.find('Button').length).to.eql(1)
  })

  context('audio variant', () => {
    describe('on render', () => {
      it('renders an appropriate label', () => {
        const props = {
          devices: [
            { deviceId: 'audioId1', label: 'label1' },
            { deviceId: 'audioId2', label: '' }
          ]
        }
        const DeviceSelection = testbed.render(props)
        expect(DeviceSelection.text()).to.eql('Mic')
      })

      it('renders an appropriate icon', () => {
        const DeviceSelection = testbed.render()
        expect(DeviceSelection.find('IconMicSolid').length).to.eql(1)
      })
    })
  })

  context('video variant', () => {
    describe('on render', () => {
      it('renders an appropriate label', () => {
        const DeviceSelection = testbed.render({ variant: 'video' })
        expect(DeviceSelection.text()).to.eql('Webcam')
      })

      it('renders an appropriate icon', () => {
        const DeviceSelection = testbed.render({ variant: 'video' })
        expect(DeviceSelection.find('IconVideoSolid').length).to.eql(1)
      })
    })
  })

  context('device selection', () => {
    describe('#isDeviceSelected', () => {
      it('returns true if the value if equal to the prop', () => {
        const DeviceSelection = testbed.render({ selectedDeviceId: 'aeiou' })
        expect(DeviceSelection.instance().isDeviceSelected('aeiou')).to.eql(true)
      })

      it('returns false if the value if equal to the prop', () => {
        const DeviceSelection = testbed.render({ selectedDeviceId: 'aeiou' })
        expect(DeviceSelection.instance().isDeviceSelected('uoiea')).to.eql(false)
      })
    })

    describe('#deviceSelected', () => {
      it('invoked the action associated with its variant', () => {
        const audioDeviceChangedStub = testbed.spy()
        const props = {
          variant: 'audio',
          actions: {
            audioDeviceChanged: audioDeviceChangedStub,
            videoDeviceChanged: () => {}
          }
        }

        const DeviceSelection = testbed.render(props)
        DeviceSelection.instance().deviceSelected('event', ['newSelected'])
        expect(audioDeviceChangedStub).to.have.been.calledWith('newSelected')
      })
    })
  })
})
