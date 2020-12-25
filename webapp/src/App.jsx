import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Home } from './pages/Home'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;