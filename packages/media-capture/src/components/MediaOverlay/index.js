import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import AudioSignal from '../AudioSignal'
import CountdownContainer from '../CountdownContainer'
import CountdownTimer from '../CountdownTimer'
import Loading from '../Loading'
import Message from '../Message'
import RecordingBadge from '../RecordingBadge'
import {
  STARTING,
  RECORDING,
  PREVIEWSAVE,
  SAVING,
  LOADING,
  ERROR,
  READY
} from '../../constants/CaptureStates'
import styles from './styles.css'

@themeable({}, styles)
export default class MediaOverlay extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    soundMeter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    msg: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    soundMeter: {}
  }

  render () {
    const LoadingGuard = (state) => {
      if (state !== LOADING) return null

      return <Loading />
    }

    const ErrorGuard = (state) => {
      if (state !== ERROR) return null

      return <Message msg={this.props.msg} />
    }

    const CountdownTimerGuard = (state) => {
      if (state !== STARTING) return null

      return (
        <CountdownContainer>
          <CountdownTimer actions={this.props.actions} />
        </CountdownContainer>
      )
    }

    const PreviewBadgeGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      // needs i18n
      return (
        <div className={styles.badge}>
          PREVIEW
        </div>
      )
    }

    const RecordingGuard = (state) => {
      if (state !== RECORDING) return null

      return (
        <div>
          <AudioSignal reduced soundMeter={this.props.soundMeter} />
          <RecordingBadge />
        </div>
      )
    }

    const ReadyGuard = (state) => {
      if (state !== READY) return null

      return <AudioSignal soundMeter={this.props.soundMeter} />
    }

    return (
      LoadingGuard(this.props.captureState) ||
      ReadyGuard(this.props.captureState) ||
      ErrorGuard(this.props.captureState) ||
      CountdownTimerGuard(this.props.captureState) ||
      RecordingGuard(this.props.captureState) ||
      PreviewBadgeGuard(this.props.captureState)
    )
  }
}
