import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBots from '../components/SearchBots';
import Scroll from '../components/Scroll';
// import { robots } from './robots';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';

//redux
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => requestRobots(dispatch)
    }
}

class App extends Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending ? 
        <h1>loading...</h1> :
        ( 
            <div className='tc'>
                <h1 className="f1">RoboFriends</h1>
                <SearchBots searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);