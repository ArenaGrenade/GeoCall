import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Session from "./session"

import Home from './pages/Home'
import Room from './pages/Room'

const App = () => {
    return (
        <Session>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/:code" component={Room} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </Session>
    );
}

export default App;
