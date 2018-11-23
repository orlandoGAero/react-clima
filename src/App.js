import React, { Component } from 'react';
import Header from "./componentes/header/Header";
import Formulario from "./componentes/formulario/Formulario";
import Error from './componentes/error/Error';
import Clima from './componentes/clima/Clima';

class App extends Component {

  state = {
    error: '',
    consulta: {},
    res: {}
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.consulta !== this.state.consulta){
      this.consultaApi();
    }
  }
  
  componentDidMount() {
    this.setState({
      error: false
    })
  }
  
  consultaApi = () => {
    const {ciudad, pais} = this.state.consulta;
    if(!ciudad || ! pais) return null;

    // Leer la url y agregar el Api key
    const apiKey = "d46e694c106db54fdec1f2bf3f1185b7";

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${apiKey}`;

    // query con Fetch API
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        this.setState({
          res: datos
        })     
      })
      .catch(error => {
        console.log(error);
      })

  }

  consultaDatos = respuesta => {
    if(respuesta.ciudad === '' || respuesta.pais === '')
      this.setState({
        error: true
      })
    else
      this.setState({
        consulta: respuesta,
        error: false
      })

  }

  render() {

    const error = this.state.error;

    let resultado;
    let {cod} = this.state.res;
 
    if(error) {
      resultado = <Error mensaje="Los dos campos son obligatorios"/>
    } else if(cod === '404') {
      resultado = <Error mensaje= "Ciudad no encontrada"/>
    } else {
      resultado = <Clima res={this.state.res}/>
    }

    return (
      <div className="app">
        <Header
          titulo='Clima React'
        />
        < Formulario 
          consultaDatos={this.consultaDatos}
        />
        {resultado}
      </div>
    );
  }
}

export default App;
