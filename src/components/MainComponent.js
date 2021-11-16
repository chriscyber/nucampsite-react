import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    //use CAMPSITES array to set local state in App
    constructor(props) {
        super(props);
        this.state = {
        campsites: CAMPSITES,
        selectedCampsite: null
        };
    }

    onCampsiteSelect(campsiteId) {
        //update selected campsite property to campsite object passed into this method = updating the state
        this.setState({selectedCampsite: campsiteId})
    }

    render() {
        return (
            <div>
                <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="/">NuCamp</NavbarBrand>
                </div>
                </Navbar>
                <Directory campsites={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />
            </div>
        );
    }
}

export default Main;