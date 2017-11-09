---
describes: Transition
---

The `Transition` wrapper helps you easily transition elements in and out of
your UI. The component defaults to the `fade` opacity transition.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOffscreen: true
    }
  }

  handleButtonClick = () => {
    this.setState({
      isOffscreen: !this.state.isOffscreen
    })
  };

  render () {
    const inOrOut = (this.state.isOffscreen) ? <span>in</span> : <span>out</span>

    return (
      <div>
        <Button size="small" onClick={this.handleButtonClick}>
          Fade {this.state.isOffscreen ? 'Out' : 'In'}
        </Button>
        <br/>
        <br/>
        <Transition
          transitionOnMount
          in={this.state.isOffscreen}
          type="fade">
          <Container>
            <Avatar name="Fade" />
          </Container>
        </Transition>
      </div>
    )
  }
}

render(<Example />)
```

`scale` transitions both the opacity and size of the element.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOffscreen: true
    }
  }

  handleButtonClick = () => {
    this.setState({
      isOffscreen: !this.state.isOffscreen
    })
  };

  render () {
    const inOrOut = (this.state.isOffscreen) ? <span>in</span> : <span>out</span>

    return (
      <div>
        <Button size="small" onClick={this.handleButtonClick}>
          {this.state.isOffscreen ? 'Collapse' : 'Expand'}
        </Button>
        <br/>
        <br/>
        <Transition
          transitionOnMount
          unmountOnExit
          in={this.state.isOffscreen}
          type="scale">
          <Container display="inline">
            <Avatar name="Collapse" />
          </Container>
        </Transition>
      </div>
    )
  }
}

render(<Example />)
```

`slide-` transitions the opacity and position of the element.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      direction: 'left',
      isOffscreen: true
    }
  }

  handleDirectionChange = (e) => {
    this.setState({
      direction: e.target.value
    })
  };

  handleButtonClick = () => {
    this.setState({
      isOffscreen: !this.state.isOffscreen
    })
  };

  render () {
    const transitionType = `slide-${this.state.direction}`
    const inOrOut = (this.state.isOffscreen) ? <span>in</span> : <span>out</span>
    const directionVariants = [
      {value: 'left', label: 'Left'},
      {value: 'right', label: 'Right'},
      {value: 'down', label: 'Down'},
      {value: 'up', label: 'Up'}
    ]

    return (
      <div>
        <Select
          onChange={this.handleDirectionChange}
          value={this.state.direction}
          label={<ScreenReaderContent>Transition Direction</ScreenReaderContent>}
          inline
        >
          {directionVariants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
        </Select>
        &nbsp;
        <Button size="small" onClick={this.handleButtonClick}>
          Slide {this.state.isOffscreen ? 'Out' : 'In'}
        </Button>
        <br/>
        <br/>
        <Transition
          transitionOnMount
          in={this.state.isOffscreen}
          type={transitionType}>
          <Container display="inline">
            <Avatar name="Slide" />
          </Container>
        </Transition>
      </div>
    )
  }
}

render(<Example />)
```
