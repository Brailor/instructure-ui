import React, { Component } from 'react'

import MediaStreamMessage from '../MediaStreamMessage'
import { getUserMedia } from '../../getUserMedia'

const HAVE_ENOUGH_DATA = 4
const POLL_DURATION = 200

const ERRORS = {
  NotAllowedError: 'Please allow Arc to access your webcam.',
  default: 'Something went wrong accessing your webcam.'
}

export default class MediaStream extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  constructor (props) {
    super(props)
    this.state = {
      streamLoaded: false,
      streamError: null
    }

    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
  }

  componentDidMount () {
    getUserMedia(this.success, this.error)
  }

  componentWillUnmount () {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop())
    }
  }

  pollReadyState () {
    // we poll here because rendering the stream inside the
    // video element is not instantaneous. Check the readyState
    // for an appropriate signal.
    const poll = setInterval(() => {
      if (this.video.readyState === HAVE_ENOUGH_DATA) {
        this.setState({ streamLoaded: true }, () => {
          clearInterval(poll)
        })
      }
    }, POLL_DURATION)
  }

  success (stream) {
    this.stream = stream
    if (this.video) {
      this.video.srcObject = stream
      this.pollReadyState()
    }
  }

  error (err) {
    if (err && ERRORS[err.name]) {
      this.setState({
        streamError: ERRORS[err.name]
      })
    } else {
      this.setState({
        streamError: ERRORS['default']
      })
    }
  }

  render () {
    return (
      <div>
        <MediaStreamMessage
          loaded={this.state.streamLoaded}
          error={this.state.streamError}
        />
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
