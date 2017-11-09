import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import Container from '../Container'
import Heading from '../Heading'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)
class Media extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * the media object
    */
    children: PropTypes.node.isRequired,
    /**
    * the media title
    */
    title: PropTypes.string,
    /**
    * the media description
    */
    description: PropTypes.string,
    /**
    * how should the title and description align
    */
    alignContent: PropTypes.oneOf(['top', 'center']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    alignContent: 'center'
  }

  render () {
    const props = omitProps(this.props, Media.propTypes, ['padding'])

    const classes = {
      className: classnames({
        [styles.root]: true,
        [styles[this.props.alignContent]]: true
      })
    }
    return (
      <Container
        {...props}
        {...classes}
        as="figure"
        margin={this.props.margin}
        size={this.props.size}
      >
        <div className={styles.figure}>
          {this.props.children}
        </div>
        <figcaption className={styles.caption}>
          {
            this.props.title && (
              <Heading level="h3">
                <span className={styles.title}>
                  {this.props.title}
                </span>
              </Heading>
            )
          }
          {
            this.props.description && (
              <div className={styles.description}>
                {this.props.description}
              </div>
            )
          }
        </figcaption>
      </Container>
    )
  }
}

export default Media
