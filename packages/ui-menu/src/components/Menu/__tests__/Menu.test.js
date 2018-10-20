/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'
import { within, expect, mount, stub, wait } from '@instructure/ui-test-utils'

import Menu, { MenuItem, MenuItemSeparator } from '../index'

import MenuLocator from '../locator'

describe('<Menu />', async () => {
  it('should render', async () => {
    await mount(
      <Menu label="Settings">
        <MenuItem>Account</MenuItem>
      </Menu>
    )

    const menu = await MenuLocator.findMenu({ label: 'Settings' })

    expect(menu).to.exist()
  })

  it('should meet a11y standards', async () => {
    await mount(
      <Menu label="Settings">
        <MenuItem>Account</MenuItem>
      </Menu>
    )

    const menu = await MenuLocator.find({ label: 'Settings' })

    expect(await menu.accessible()).to.be.true()
  })

  it('should not allow invalid children', async () => {
    let error = false
    try {
      await mount(
        <Menu>
          <div />
        </Menu>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('should call onSelect when menu item is selected', async () => {
    const onSelect = stub()
    await mount(
      <Menu
        label="Settings"
        onSelect={onSelect}
      >
        <MenuItem value="Account">Account</MenuItem>
      </Menu>
    )

    const menu = await MenuLocator.find({ label: 'Settings' })
    const item = await menu.findItem({ label: 'Account' })

    await item.click()

    expect(onSelect).to.have.been.calledOnce()
    expect(onSelect.getCall(0).args[1]).to.equal('Account')
  })

  it('should not call onSelect when disabled', async () => {
    const onSelect = stub()
    await mount(
      <Menu
        label="Settings"
        onSelect={onSelect}
        disabled
      >
        <MenuItem value="Account">Account</MenuItem>
      </Menu>
    )

    const menu = await MenuLocator.find({ label: 'Settings' })
    const item = await menu.findItem({ label: 'Account' })

    await item.click()

    expect(onSelect).to.not.have.been.called()
  })

  it('should move focus properly', async () => {
    await mount(
      <Menu
        label="Settings"
      >
        <MenuItem value="Account">Account</MenuItem>
      </Menu>
    )

    const menu = await MenuLocator.find({ label: 'Settings' })
    const items = await menu.findAllItems()

    await menu.keyDown('up')

    expect(items[items.length - 1].focused()).to.be.true()

    await menu.keyDown('down')

    expect(items[0].focused()).to.be.true()
  })

  it('should provide a menu ref', async () => {
    const menuRef = stub()
    await mount(
      <Menu
        label="Settings"
        menuRef={menuRef}
      >
        <MenuItem value="Account">Account</MenuItem>
      </Menu>
    )
    const menu = await MenuLocator.find({ label: 'Settings' })
    expect(menuRef).to.have.been.calledWith(menu.getDOMNode())
  })

  it('should focus the first menu item when menu only has one item', async () => {
    await mount(
      <Menu label="Settings">
        <MenuItem value="Account">Account</MenuItem>
      </Menu>
    )
    const menu = await MenuLocator.find({ label: 'Settings', focusable: true })
    const items = await menu.findAllItems()

    await menu.focus()

    await wait(() => {
      expect(items[0].focused()).to.be.true()
    })
  })

  it('should set aria attributes properly', async () => {
    await mount(
      <Menu disabled label="Settings">
        <MenuItem value="Account">Account</MenuItem>
      </Menu>
    )
    const menu = await MenuLocator.find({ label: 'Settings' })
    expect(menu.getAttribute('aria-disabled')).to.exist()
    expect(menu.getAttribute('aria-label')).to.exist()
  })

  describe('with a trigger', async () => {
    it('should set aria attributes properly', async () => {
      await mount(
        <Menu
          trigger={<button>Settings</button>}
          defaultShow
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
          <MenuItem type="radio" defaultChecked>
            Default (Grid view)
          </MenuItem>
          <MenuItem type="radio">
            Individual (List view)
          </MenuItem>
          <MenuItem type="checkbox" defaultChecked>
            Include Anchor Standards
          </MenuItem>
          <MenuItemSeparator />
          <MenuItem>Open grading history...</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'Settings' })

      expect(menu.getAttribute('aria-labelledby')).to.exist()
    })

    it('should call onFocus on focus', async () => {
      const onFocus = stub()
      await mount(
        <Menu
          trigger={<button>More</button>}
          onFocus={onFocus}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const trigger = await MenuLocator.find({ focusable: true, contains: 'More' })

      await trigger.focus()

      await wait(() => {
        expect(onFocus).to.have.been.called()
      })
    })

    it('should render when show and onToggle props are set', async () => {
      await mount(
        <Menu
          trigger={<button>More</button>}
          show
          onToggle={() => {}}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'More' })

      expect(menu).to.exist()
    })

    it('should not show by default', async () => {
      await mount(
        <Menu
          trigger={<button>More</button>}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'More', expectEmpty: true })

      expect(menu).to.not.exist()
    })

    it('should accept a default show', async () => {
      await mount(
        <Menu
          trigger={<button>More</button>}
          defaultShow
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'More' })

      expect(menu).to.exist()
    })

    it('should provide a menu ref', async () => {
      const menuRef = stub()
      await mount(
        <Menu
          trigger={<button>More</button>}
          defaultShow
          menuRef={menuRef}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'More' })

      expect(menuRef).to.have.been.calledWith(menu.getDOMNode())
    })

    it('should provide a popoverRef ref', async () => {
      const popoverRef = stub()
      await mount(
        <Menu
          trigger={<button>More</button>}
          defaultShow
          popoverRef={popoverRef}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      expect(popoverRef).to.have.been.called()
    })

    it('should focus the menu', async () => {
      await mount(
        <Menu
          trigger={<button>More</button>}
          defaultShow
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'More', focusable: true })

      await wait(() => {
        expect(menu.focused()).to.be.true()
      })
    })

    it('should call onToggle on click', async () => {
      const onToggle = stub()
      await mount(
        <Menu
          trigger={<button>More</button>}
          onToggle={onToggle}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const trigger = await MenuLocator.find({ tag: 'button', contains: 'More' })

      await trigger.click()

      expect(onToggle).to.have.been.called()
    })

    it('should have an aria-haspopup attribute', async () => {
      await mount(
        <Menu
          trigger={<button>More</button>}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const trigger = await MenuLocator.find({ tag: 'button', contains: 'More' })

      expect(trigger.getAttribute('aria-haspopup')).to.exist()
    })

    describe('for a11y', async () => {
      it('should meet standards when menu is closed', async () => {
        await mount(
          <Menu
            trigger={<button>More</button>}
          >
            <MenuItem>Learning Mastery</MenuItem>
            <MenuItem disabled>Gradebook</MenuItem>
          </Menu>
        )

        const menu = await MenuLocator.find()

        expect(await menu.accessible()).to.be.true()
      })

      it('should meet standards when menu is open', async () => {
        await mount(
          <Menu
            trigger={<button>More</button>}
            defaultShow
          >
            <MenuItem>Learning Mastery</MenuItem>
            <MenuItem disabled>Gradebook</MenuItem>
          </Menu>
        )

        const menu = await MenuLocator.find()

        expect(await menu.accessible()).to.be.true()
      })
    })
  })

  describe('with a flyout', async () => {

    testShowFlyoutOnEvent({type: 'click'})
    testShowFlyoutOnEvent({type: 'mouseOver'})
    testShowFlyoutOnEvent({type: 'keyDown', which: 'right'})
    testShowFlyoutOnEvent({type: 'keyUp', which: 'space'})
    testShowFlyoutOnEvent({type: 'keyDown', which: 'enter'})

    testFocusFlyoutOnEvent({type: 'click'})
    testFocusFlyoutOnEvent({type: 'keyDown', which: 'right'})
    testFocusFlyoutOnEvent({type: 'keyUp', which: 'space'})
    testFocusFlyoutOnEvent({type: 'keyDown', which: 'enter'})

    it('it should not open the flyout when disabled', async () => {
      await mount(
        <Menu label="Parent" disabled>
          <Menu label="Flyout">
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'Parent' })
      const trigger = await menu.findItem({ contains: 'Flyout' })

      await trigger.click()

      const flyout = await MenuLocator.findMenu({ label: 'Flyout', expectEmpty: true })

      expect(flyout).to.not.exist()
    })

    it('it should close the menu flyout on escape press', async () => {
      await mount(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'Parent' })
      const trigger = await menu.findItem({ contains: 'Flyout' })

      await trigger.click()

      let flyout = await MenuLocator.findMenu({ label: 'Flyout' })

      await wait (() => {
        expect(flyout.focused()).to.be.true()
      })

      flyout.keyUp('escape', {
        defaultPrevented: false,
        bubbles: true,
        button: 0
      })

      flyout = await MenuLocator.findMenu({ label: 'Flyout', expectEmpty: true })

      expect(flyout).to.not.exist()
    })

    it('it should close the menu flyout on left press', async () => {
      await mount(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'Parent' })
      const trigger = await menu.findItem({ contains: 'Flyout' })

      await trigger.click()

      let flyout = await MenuLocator.findMenu({ label: 'Flyout' })

      await wait (() => {
        expect(flyout.focused()).to.be.true()
      })

      await flyout.keyDown('left')

      flyout = await MenuLocator.findMenu({ label: 'Flyout', expectEmpty: true })

      expect(flyout).to.not.exist()
    })

    it('it should call onDismiss on tab press', async () => {
      const onDismiss = stub()
      await mount(
        <Menu label="Parent">
          <Menu label="Flyout" onDismiss={onDismiss}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'Parent' })
      const trigger = await menu.findItem({ contains: 'Flyout' })

      await trigger.click()

      const flyout = await MenuLocator.findMenu({ label: 'Flyout' })

      await wait (() => {
        expect(flyout.focused()).to.be.true()
      })

      await flyout.keyDown('tab')

      expect(onDismiss).to.have.been.calledOnce()
    })

    it('it should call onSelect when flyout option is selected', async () => {
      const onSelect = stub()
      await mount(
        <Menu label="Parent">
          <Menu label="Flyout" onSelect={onSelect}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'Parent' })
      const trigger = await menu.findItem({ contains: 'Flyout' })

      await trigger.click()

      const flyout = await MenuLocator.findMenu({ label: 'Flyout' })

      await wait (() => {
        expect(flyout.focused()).to.be.true()
      })

      const menuItem = await flyout.findItem({ label: 'Foo' })

      await menuItem.click()

      expect(onSelect).to.have.been.calledOnce()
    })

    it('it should call onToggle on document click and on dismiss', async () => {
      const onToggle = stub()
      await mount(
        <Menu label="Parent">
          <Menu label="Flyout" onToggle={onToggle}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.findMenu({ label: 'Parent' })
      const trigger = await menu.findItem({ contains: 'Flyout' })

      await trigger.click()

      expect(onToggle).to.have.been.calledOnce()
      expect(onToggle.getCall(0).args[0]).to.equal(true)

      const flyout = await MenuLocator.findMenu({ label: 'Flyout' })

      await wait (() => {
        expect(flyout.focused()).to.be.true()
      })

      await (await within(trigger.getOwnerDocument().documentElement))
        .click()

      expect(onToggle).to.have.been.calledTwice()
      expect(onToggle.getCall(1).args[0]).to.equal(false)
    })

    it('it should call onMouseOver on hover', async () => {
      const onMouseOver = stub()

      /* eslint-disable jsx-a11y/mouse-events-have-key-events */
      await mount(
        <Menu label="Parent">
          <Menu label="Flyout" onMouseOver={onMouseOver}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )
      /* eslint-enable jsx-a11y/mouse-events-have-key-events */

      const menu = await MenuLocator.findMenu({ label: 'Parent' })
      const trigger = await menu.findItem({ contains: 'Flyout' })

      await trigger.mouseOver()

      expect(onMouseOver).to.have.been.calledOnce()
    })
  })
})

function testShowFlyoutOnEvent (event) {
  it(`should show flyout menu on ${event.type} ${event.which || ''}`, async () => {
    await mount(
      <Menu label="Parent">
        <Menu label="Flyout">
          <MenuItem>Foo</MenuItem>
          <MenuItem>Bar</MenuItem>
          <MenuItem>Baz</MenuItem>
        </Menu>
      </Menu>
    )

    const menu = await MenuLocator.findMenu({ label: 'Parent' })
    const trigger = await menu.findItem({ contains: 'Flyout' })

    await trigger[event.type](event.which)

    const flyout = await MenuLocator.findMenu({ label: 'Flyout' })

    expect(flyout).to.exist()
  })
}

function testFocusFlyoutOnEvent (event) {
  it(`expect flyout menu to be focused on ${event.type} ${event.which || ''}`, async () => {
    await mount(
      <Menu label="Parent">
        <Menu label="Flyout">
          <MenuItem>Foo</MenuItem>
          <MenuItem>Bar</MenuItem>
          <MenuItem>Baz</MenuItem>
        </Menu>
      </Menu>
    )

    const menu = await MenuLocator.findMenu({ label: 'Parent' })
    const trigger = await menu.findItem({ contains: 'Flyout' })

    await trigger[event.type](event.which)

    const flyout = await MenuLocator.findMenu({ label: 'Flyout' })

    await wait(() => {
      expect(flyout.focused()).to.be.true()
    })
  })
}
