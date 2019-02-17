import React, { Component } from 'react';
import CardList from './components/CardList';
import Navbar from './components/Navbar';
import { persons } from './components/persons';
import Search from './components/Search';
import SimpleMap from './components/Map';
import {createFilter} from 'react-search-input';

const style = {
  background: '#fff',
  padding: '1rem',
  width: '100%',
  margin: '0',
  zIndex: '1',
  borderRadius: '5px'
}
const responsiveSearch = {
  width: '100%',
  marginBottom: '0.5rem',
  padding: '0.5rem'
}
const KEYS_TO_FILTERS = ['name', 'jobTitle', 'location.city', 'location.state', 'location.country']

class App extends Component {
  constructor() {
    super()
    this.state = {
      persons: persons,
      searchfield: '',
      winWidth: window.innerWidth,
      map: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        winWidth: window.innerWidth
      })
    })
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  onKeyPress = (event) => {
    if ((event.keyCode === 13 || event.charCode === 13) && (this.state.isMenuOpen)) {
      event.currentTarget.blur();
      this.toggleMenu();
    }
  }

  onMapClick = () => {
    this.setState({ map: !this.state.map });
  }

  onLogoClick = () => {
    this.setState({ map: false });
  }

  render() {
    const filteredPersons = this.state.persons.filter(createFilter(this.state.searchfield, KEYS_TO_FILTERS))
    return (
      <div className="flex flex-column min-vh-100 tc">
        <header className="custom--unselectable fixed top-0 w-100 white custom--bg-additional3 custom--shadow-4 z-3">
          <Navbar
            onLogoClick={this.onLogoClick}
            winWidth={this.state.winWidth}
            onSearchChange={this.onSearchChange}
            keyPress={this.onKeyPress}
            onMapClick={this.onMapClick}
          />

        </header>
        <main className="flex-auto">
          {
            this.state.map ? <SimpleMap />
              :
              <div id="sketch-particles" className="flex flex-wrap justify-center">
                {
                  this.state.winWidth < 760 ?
                    // IF window width is less then 650 means its mobile, render the component
                    <div style={style}>
                      <Search
                        onSearchChange={this.onSearchChange}
                        keyPress={this.onKeyPress}
                        responsiveSearch={responsiveSearch}
                      />
                    </div>
                    : // ELSE return nothing
                    null
                }
                <CardList persons={filteredPersons} />
              </div>
          }
        </main>
        <footer className="custom--unselectable w-100 h3 flex items-center justify-center justify-end-l white custom--bg-additional3 z-2">
          <a href="https://github.com/weisisheng/trainerworld" title="Repository">
            <svg className="repo w2 h2" viewBox="0 0 12 16" version="1.1" aria-hidden="true">
              <path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
            </svg>
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
