import React, { Component } from 'react';
import logoOne from './logo_1.jpg';
import logoTwo from './logo_2.gif';
import logoThree from './logo_3.png';
import './App.css';
import MainTable from './MainTable.js';
import Fetch from 'react-fetch'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logoOne} className="App-logo" alt="logo" />
          <img src={logoTwo} className="App-logo" alt="logo" />
          <img src={logoThree} className="App-logo" alt="logo" />
          <h2>Агрегатор на случаите на говор на омраза, злосторства од омраза и дискриминација базирани на сексуална ориентација и/или родов идентитет</h2>
        </div>
        <div className="App-intro">
          Агрегатор на податоци од:
          <div className="Sources-list">
            <ol>
              <li><a href="http://www.govornaomraza.mk" target="_blank">Говор на омраза</a></li>
              <li><a href="http://www.zlostorstvaodomraza.com" target="_blank">Злосторство од омраза</a></li>
              <li><a href="http://www.prijavinasilstvo.mk" target="_blank">Пријави Насилство</a></li>
            </ol>
          </div>
        </div>
        <Fetch url="https://api.fieldbook.com/v1/58036e0f9507f5030053877f/main">
          <MainTable>
          </MainTable>
        </Fetch>
      </div>
    );
  }
}

export default App;
