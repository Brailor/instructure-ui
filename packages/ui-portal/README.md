---
category: packages
describes: Portal
---

## ui-portal

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

### Example

The `<Portal/>` component allows you to render a subtree into a DOM element.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isPortalOpen: false
    }
  }

  handleButtonClick = () => {
    this.setState({
      isPortalOpen: !this.state.isPortalOpen
    })
  };

  render () {
    return (
      <div>
        <Button onClick={this.handleButtonClick}>
          {this.state.isPortalOpen ? 'Close' : 'Open'} the Portal
        </Button>
        <Portal
          mountNode={() => this._mountNode}
          open={this.state.isPortalOpen}
        >
          <ContextBox>
            <p>Greetings from the portal!</p>
          </ContextBox>
        </Portal>
        <Text>
          <p>{lorem.paragraph()}</p>
          <div ref={(c) => this._mountNode = c}></div>
          <p>{lorem.paragraph()}</p>
        </Text>
      </div>
    )
  }
}

render(<Example />)
```

### Installation

```sh
yarn add --dev @instructure/ui-portal
```
### Usage

```js
import React from 'react'
import Portal from '@instructure/ui-portal/lib/components/Portal'

export default MyPortal = function () {
  return (
    <Portal>
      <Text>Hello from Portal</Text>
    </Portal>
  )
}
```

See more detailed documentation and usage for [Portal](#Portal)

### Contribute

See the [contributing guidelines](#contributing) for details.

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/@instructure/ui-portal.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-portal

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md