import React, { Component } from 'react';
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import Api from './Components/Api.js';


class CovidApp extends Component {


  render() {

    return (
      <div class="p-grid p-justify-between" style={{marginTop: '.25em' }}>
        <div class="p-md-1"></div>
        <div class="p-col-12 p-md-8" style={{ backgroundColor: '#FAF9F6' }} >
          <Api />
        </div>
        <div class="p-md-1"></div>

      </div>


    );
  }
}
export default CovidApp;