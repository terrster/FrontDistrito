import React, { Component } from "react";

// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/about-us.css";
import "./css/account.css";
import "./css/apply.css";
import "./css/Chip.css";
import "./css/custom-progress.css";
import "./css/datepicker.css";
import "./css/dnd.css";
import "./css/doubts.css";
import "./css/file-row.css";
import "./css/footer.css";
import "./css/general.css";
import "./css/header.css";
import "./css/land-simulator.css";
import "./css/loader.css";
import "./css/nav-bar.css";
import "./css/progress-tracker.css";
import "./css/signup.css";
import "./css/tabs.css";
import "./css/toast.css";
import "./css/type-card.css";

import NavBar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Landing/Footer/Footer";
import Questions from "./components/Questions/Questions";
import Terms from "./components/Landing/Terms/Terms";
import Privacy from "./components/Privacy/Privacy";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Signup from "./components/Signup/Signup";
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
  
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
    };
  }

  onCloseBar = () => {
    this.setState({ isOpen: false });
  };

  onOpenBar = () => {
    this.setState({ isOpen: true });
  };

  render() {

    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to="/" />
      )} />
    )

    return (
      <Router>
        <div
          className="divContainer d-flex flex-column justify-content-between"
          style={{ height: "100vh" }}
        >
          <Provider store={store}>
            <NavBar
              type={this.props.navType}
              url={this.props.navegationurl}
              isOpen={this.state.isOpen}
              close={this.onCloseBar}
              open={this.onOpenBar}
            />

            <div className="flex-grow-1" style={{ height: "auto" }}>
              <Switch>
                <PrivateRoute exact  path="/credito/solicitud/:idAppliance" component={Appliance} />
                <PrivateRoute exact path="/elige-monto/:idAppliance" component={Amount} />
                <PrivateRoute exact path="/datos-comerciales/:idAppliance" component={ComercialInfo} />
                <Route path="/" exact component={Landing} />
                <Route
                  path="/preguntas-frecuentes"
                  exact
                  component={Questions}
                />
                <Route path="/terminos-y-condiciones" exact component={Terms} />
                <Route path="/privacidad" exact component={Privacy} />
                <Route path="/reset-password" exact component={ResetPassword} />
                <Route
                  path="/recover-password/:hash"
                  exact
                  component={RecoverPassword}
                />
                <Route path="/registrate" exact component={Signup} />
                <Route
                  path="/registroexitoso"
                  exact
                  component={RegistroExitoso}
                />
                <Route path="/login" exact component={Login} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact  path="/solicitud" component={Appliance} />
                <PrivateRoute exact path="/elige-monto/:idAppliance" component={Amount} />
                <PrivateRoute exact path="/informacion-general/:idAppliance" component={GeneralInfo} />
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
