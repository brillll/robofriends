import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBots from '../components/SearchBots';
import Scroll from '../components/Scroll';
// import { robots } from './robots';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }


    componentDidMount() {
        fetch('https://my.api.mockaroo.com/robots.json?key=e4e99eb0')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    onSearch = (e) => {
        this.setState({ searchfield: e.target.value });
    }

    render() {
        const { robots, searchfield } = this.state;

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return robots.length < 20? 
        <h1>loading...</h1> :
        ( 
            <div className='tc'>
                <h1 className="f1">RoboFriends</h1>
                <SearchBots searchChange={this.onSearch}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}


export default App;