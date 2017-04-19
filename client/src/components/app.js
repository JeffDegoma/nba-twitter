import React from 'react';
import * as Cookies from 'js-cookie';

import TweetPage from './tweet-page';
import LoginPage from './login-page';
import CardContainer from './card'
import Navigation from './navigation'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        console.log("accessToken", accessToken)
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status !== 401) {
                        // Unauthorized, clear the cookie and go to
                        // the login page
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error("ERROR!!", res.statusText);
                }
                return res.json();
            }).then(currentUser => {
                console.log("CURRENT USER", currentUser)
                    this.setState({
                        currentUser
                    })
                }
            );
        }
    }

    render() {

        if (!this.state.currentUser) {
            return <LoginPage />;
        }

        return(
            //container
            <div className="app-container">
                <Navigation />
                <TweetPage />
            </div>
            )
    }
}

export default App;
