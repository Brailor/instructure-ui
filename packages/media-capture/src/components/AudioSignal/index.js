import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'
import themeable from '@instructure/ui-themeable'
import Progress from '@instructure/ui-core/lib/components/Progress'

import styles from './styles.css'
import theme from './theme'

const MULTIPLIER = 1.5

@themeable(theme, styles)
export default class AudioSignal extends Component {
  static propTypes = {
    soundMeter: PropTypes.shape({
      processor: PropTypes.shape({
        volume: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }

    this.raf = []
  }

  componentWillUnmount () {
    this.raf.forEach(request => {
      request.cancel()
    })
    this.raf = []
  }

  componentDidMount () {
    this.raf.push(
      requestAnimationFrame(() => {
        this.getVolume()
      })
    )
  }

  getVolume = () => {
    const volume = Math.floor(this.props.soundMeter.processor.volume * 100) * MULTIPLIER
    if (volume !== this.state.value) {
      this.setState({
        value: volume
      })
    }

    this.raf.push(
      requestAnimationFrame(() => {
        this.getVolume()
      })
    )
  }

  render () {
    /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
      <progress
        className={styles.progress}
        role="progressbar"
        aria-valuemin="0"
        aria-valuenow={this.state.value}
        aria-valuemax="100"
        aria-label="Current Volume Level" // TODO: needs i18n
        max="100"
        value={this.state.value}
      />
    )
    /* eslint-enable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
  }
}
