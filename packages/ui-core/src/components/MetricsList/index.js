import React, { Component } from 'react'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'

import MetricsListItem from './MetricsListItem'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/typography
---
**/
@themeable(theme, styles)
export default class MetricsList extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * children of type `MetricsListItem`
    */
    children: CustomPropTypes.Children.oneOf([MetricsListItem])
  };
  /* eslint-enable react/require-default-props */

  render () {
    return (
      <div className={styles.root} role="grid" aria-readonly="true">
        {this.props.children}
      </div>
    )
  }
}

export { default as MetricsListItem } from './MetricsListItem'
