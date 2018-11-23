import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Formulario extends Component {
    
    //crear Refs
    ciudadRef = React.createRef();
    paisRef = React.createRef();

    buscarClima = e => {
        e.preventDefault();

        //crear objeto y leer refs
        const clima = {
            ciudad: this.ciudadRef.current.value,
            pais: this.paisRef.current.value
        }

        //pasar a props
        this.props.consultaDatos(clima);

        //limpiar form
        e.target.reset()
        
    }

    render() { 
        return ( 
            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <form onSubmit={this.buscarClima}>
                            <div className="input-field col s12 m8 l4 offset-m2">
                                <input id="ciudad" ref={this.ciudadRef} type="text"/>
                                <label htmlFor="ciudad">Ciudad:</label>
                            </div>
                            <div className="input-field col s12 m8 l4 offset-m2">
                                <select ref={this.paisRef}>
                                    <option value="" defaultValue>Elige un país</option>
                                    <option value="AR">Argentina</option>
                                    <option value="CO">Colombia</option>
                                    <option value="CR">Costa Rica</option>
                                    <option value="ES">España</option>
                                    <option value="US">Estados Unidos</option>
                                    <option value="MX">México</option>
                                    <option value="PE">Perú</option>
                                </select>
                                <label htmlFor="pais">País:</label>
                            </div>
                            <div className="input-field col s12 m8 l4 offset-m2 buscador">
                                <input type="submit" className="waves-effect waves-light btn-large yellow accent-4" value="BUSCAR..."/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
         );
    }
}

Formulario.propTypes = {
    consultaDatos: PropTypes.func.isRequired
}

export default Formulario;