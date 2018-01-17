import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@instructure/ui-core/lib/components/Button'
import IconSettingsLine from 'instructure-icons/lib/Line/IconSettingsLine'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  SAVING
} from '../../constants/CaptureStates'

export default class CTA extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      saveClicked: PropTypes.func.isRequired,
      startClicked: PropTypes.func.isRequired,
      finishClicked: PropTypes.func.isRequired
    }).isRequired,
    captureState: PropTypes.string.isRequired
  }

  render () {
    const { captureState, actions } = this.props

    const StartGuard = (state) => {
      if (state !== READY) return null

      // needs i18n
      return (
        <Button
          onClick={actions.startClicked}
          variant="primary"
          size="large"
          margin="0 medium"
        >
          Start Recording
        </Button>
      )
    }

    const FinishGuard = (state) => {
      if (state !== RECORDING) return null

      // needs i18n
      return (
        <Button
          onClick={actions.finishClicked}
          variant="primary"
          size="large"
          margin="0 auto"
        >
          Finish
        </Button>
      )
    }

    const PreviewAndSaveGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      // needs i18n
      return (
        <Button
          onClick={actions.saveClicked}
          disabled={state === SAVING}
          variant="primary"
          size="large"
          margin="0 0 0 medium"
        >
          Save
        </Button>
      )
    }

    return (
      StartGuard(captureState) ||
      FinishGuard(captureState) ||
      PreviewAndSaveGuard(captureState)
    )
  }
}
