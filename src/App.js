import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Users from "./User/Users";
import Videos from "./Video/Videos";
import Nav from "./Nav";
import VideoOverview from "./Video/VideoOverview";
import { useSelector } from "react-redux";
import Error from "./Error";
import VideoCreate from "./Video/VideoCreate";
import SingleUser from "./User/SingleUser";
import VideoRoom from "./Video/VideoRoom";

const routes = [
    {
        path: "/",
        component: Login,
    },
    {
        path: "/list-users",
        component: Users,
    },
    {
        path: "/user/:id",
        component: SingleUser,
    },
    {
        path: "/videos",
        component: Videos,
    },
    {
        path: "/video/:id",
        component: VideoOverview,
    },
    {
        path: "/create-video",
        component: VideoCreate,
    },
    {
        path: "/video-room",
        component: VideoRoom,
    }
];

function App() {
    const error = useSelector(state => state.authReducer.error)
    return (
        <div id='app' className='col-12'>
            <Router>
                {error?.length ? <Error message={error} /> : ''}
                <Nav/>
                <div>
                    <Switch>
                        {routes.map((route, i) => (
                            <Route exact key={i} {...route} />
                        ))}
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
