import React, { Component } from "react";

// CSS
import "./App.css";
import "react-responsive-modal/styles.css";
import "./css/account.css";
import "./css/apply.css";
import "./css/Chip.css";
import "./css/custom-progress.css";
import "./css/datepicker.css";
import "./css/dnd.css";
import "./css/file-row.css";
import "./css/general.css";
import "./css/land-simulator.css";
import "./css/loader.css";
import "./css/progress-tracker.css";
import "./css/signup.css";
import "./css/tabs.css";
import "./css/toast.css";
import "./css/type-card.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import NavBar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Landing/Footer/Footer";
import Questions from "./components/Landing/Questions/Questions";
import Terms from "./components/Landing/Terms/Terms";
import Privacy from "./components/Landing/Privacy/Privacy";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import OurAllies from "./components/OurAllies/OurAllies";
import Signup from "./components/Signup/Signup";
import SignupBrokers from "./components/Brokers/SignupBrokers";
import RegistroExitoso from "./components/Registro/RegistroExitoso";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import GeneralInfo from "./components/Appliance/GeneralInfo";
import ComercialInfo from "./components/Appliance/ComercialInfo";
import Amount from "./components/Appliance/Amount";
import Appliance from "./components/Appliance/Appliance";
import Credit from "./components/Credit/Credit";
import Record from "./components/Record/Record";
import Documents from "./components/Appliance/Documents";
import OpenBanking from "./components/OpenBanking/OpenBanking";
// import Loader from "./components/Loader/Loader";
import Brokers from "./components/Brokers/Brokers";
import ThankyouPage from "./components/Brokers/ThankyouPage";
import Counter from "./components/Counter/Counter";
import Solicitud from "./components/Solicitud/Solicitud";
import Propuestas from "./components/Propuestas/Propuestas";
import Allies from "./components/Allies/Allies";
import BrokersLanding from "./components/BrokersLanding/BrokersLanding";
import Dashboard from "./components/Dashboard/Dashboard";


// ROUTER & REDUX
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// UTILS
import isAuthenticated from "./utils/isAuthenticated";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

class App extends Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );

    return (
      <Router>
        <div
          className="divContainer d-flex flex-column justify-content-between"
          style={{ height: "100vh" }}
        >
          <Provider store={store}>
            <NavBar url={this.props.navegationurl} />
            <div className="flex-grow-1" style={{ height: "auto" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/credito/solicitud/:idAppliance"
                  component={Appliance}
                />
                <PrivateRoute
                  exact
                  path="/elige-monto/:idAppliance"
                  component={Amount}
                />
                <PrivateRoute
                  exact
                  path="/datos-comerciales/:idAppliance"
                  component={ComercialInfo}
                />
                <PrivateRoute
                  exact
                  path="/informacion-comercial/:idAppliance"
                  component={ComercialInfo}
                />
                <Route path="/" exact component={Landing} />
                <Route
                  path="/preguntas-frecuentes"
                  exact
                  component={Questions}
                />
                <Route path="/terminos-y-condiciones" exact component={Terms} />
                <Route path="/privacidad" exact component={Privacy} />
                <Route path="/reset-password" exact component={ResetPassword} />
                <Route path="/nuestros-aliados" exact component={OurAllies}/>
                <Route
                  path="/recover-password/:hash"
                  exact
                  component={RecoverPassword}
                />
                <Route path="/registrate/:financialPartner?" exact component={Signup} />
                <Route path="/solicitudBrokers/:ownerId?" exact component={SignupBrokers} />
                <Route path="/registroexitoso/:partner?" exact component={RegistroExitoso} />
                <Route path="/login/:redirect?" exact component={Login} />
                <Route path="/brokers-registro" exact component={Brokers}/>
                <Route path="/solicitud_enviada_brokers" exact component={ThankyouPage} />
                <Route path="/contador" exact component={Counter}/>
                <Route path="/alianza" exact component={Allies}/>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/solicitud" component={Appliance} />
                <PrivateRoute
                  exact
                  path="/elige-monto/:idAppliance"
                  component={Amount}
                />
                <PrivateRoute
                  exact
                  path="/informacion-general/:idAppliance"
                  component={GeneralInfo}
                />
                <PrivateRoute exact path="/credito" component={Credit} />
                <PrivateRoute exact path="/historial" component={Record} />
                <PrivateRoute
                  exact
                  path="/historial/:idAppliance"
                  component={Record}
                />
                <PrivateRoute
                  exact
                  path="/documentos/:idAppliance"
                  component={Documents}
                />
                <Route path="/open-banking" exact component={OpenBanking}/>
                {/* <PrivateRoute
                  exact
                  path="/documentos2/:idAppliance"
                  component={Documents2}
                /> */}

                {/* Estatus de solicitud */}

                <PrivateRoute exact path="/estatus_solicitud" component={Solicitud}/>
                <PrivateRoute exact path="/propuestas" component={Propuestas}/>

                <Route path="/brokers" exact component = {BrokersLanding}/>
                <Route path="/dashboard" exact component={Dashboard} />

                
                <Redirect to="/"/>
              </Switch>
            </div>
            <div className="container-fluid">
              <Footer />
            </div>
          </Provider>
        </div>
      </Router>
    );
  }
}

export default App;
