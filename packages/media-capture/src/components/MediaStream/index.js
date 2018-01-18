import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getUserMedia, enumerateDevices } from '../../mediaDevices'
import { startMediaRecorder } from '../../mediaRecorder'
import { LOADING, RECORDING } from '../../constants/CaptureStates'

const HAVE_ENOUGH_DATA = 4
const POLL_DURATION = 200

const ERRORS = {
  NotAllowedError: 'Please allow Arc to access your webcam.',
  NotReadableError: 'Your webcam may already be in use.',
  TrackStartError: 'Your webcam may already be in use.',
  default: 'Something went wrong accessing your webcam.'
}

export default class MediaStream extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    videoDeviceId: PropTypes.string.isRequired,
    audioDeviceId: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      deviceRequestAccepted: PropTypes.func,
      mediaRecorderInitialized: PropTypes.func,
      videoObjectGenerated: PropTypes.func,
      devicesFound: PropTypes.func,
      errorOccurred: PropTypes.func
    })
  }

  static defaultProps = {
    actions: {
      deviceRequestAccepted: () => {},
      devicesFound: () => {},
      mediaRecorderInitialized: () => {},
      videoObjectGenerated: () => {},
      errorOccurred: () => {}
    }
  }

  shouldComponentUpdate (nextProps) {
    return (
      this.props.captureState !== nextProps.captureState
    )
  }

  componentDidMount () {
    getUserMedia(
      this.props.audioDeviceId,
      this.props.videoDeviceId,
      this.streamSuccess,
      this.error
    )
    enumerateDevices(this.deviceSuccess, this.error)
  }

  componentDidUpdate () {
    if (this.props.captureState === RECORDING && this.stream) {
      startMediaRecorder(
        this.stream,
        this.onMediaRecorderInit,
        this.blobSuccess,
        this.error
      )
    }
  }

  componentWillUnmount () {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop())
    }
  }

  onMediaRecorderInit = (mediaRecorder) => {
    this.props.actions.mediaRecorderInitialized(mediaRecorder)
  }

  pollReadyState () {
    // we poll here because rendering the stream inside the
    // video element is not instantaneous. Check the readyState
    // for an appropriate signal.
    const poll = setInterval(() => {
      if (this.video.readyState === HAVE_ENOUGH_DATA) {
        this.props.captureState === LOADING && this.props.actions.deviceRequestAccepted()
        clearInterval(poll)
      }
    }, POLL_DURATION)
  }

  streamSuccess = (stream) => {
    this.stream = stream
    if (this.video && this.props.captureState === LOADING) {
      this.video.srcObject = stream
      this.pollReadyState()
    }
  }

  deviceSuccess = (types) => {
    this.props.actions.devicesFound(types)
  }

  blobSuccess = (blob) => {
    const src = window.URL.createObjectURL(blob)
    this.props.actions.videoObjectGenerated(src)
  }

  error = (err) => {
    if (err) {
      const key = ERRORS[err.name] ? err.name : 'default'
      this.props.actions.errorOccurred(ERRORS[key])
    }
  }

  render () {
    return (
      <div>
        <video
          style={{width: '100%', height: '100%', borderRadius: '4px'}}
          controls={false}
          autoPlay
          ref={el => { this.video = el }}
        />
      </div>
    )
  }
  /* eslint-enable jsx-a11y/media-has-caption */
}
