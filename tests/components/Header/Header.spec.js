import React from 'react'
import { Header } from 'components/Header/Header'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Renders a welcome message', () => {
    const welcome = _wrapper.find('h1')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/Slacker/)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Lobby route', () => {
      expect(_wrapper.contains(
        <a href='/' tabIndex='0' type='button' style='-webkit-tap-highlight-color: rgba(0, 0, 0, 0); outline: none; display: inline-block; font-family: Roboto, sans-serif; border: 10px; cursor: pointer; text-decoration: none; margin: 0px; padding: 0px; box-sizing: border-box; font-size: 14px; font-weight: 500; transform: translate(0px, 0px); color: rgb(255, 255, 255); width: 50%; text-transform: uppercase; background: none;'><div><span style='height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; overflow: hidden;' /><div style='display: flex; flex-direction: column; align-items: center; justify-content: center; height: 48px;' /></div></a>
      )).to.be.true
    })

    it('Should render a Link to Chats route', () => {
      expect(_wrapper.contains(
        <a href='/chats'>
          Chats
        </a>
      )).to.be.true
    })
  })
})
