import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
// import {robots} from './robots';
import './App.css';

import {setSearchField, requestRobots} from '../actions';

function mapStateToProps(state) {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {
    constructor() {
        super()
        console.log('constructor');
    }

    componentDidMount() 
    {
        this.props.onRequestRobots();
        console.log('component did mount');
    }

    render() {
        console.log('render');
        const filteredRobots = this.props.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase())
        })


        if (this.props.isPending) {
            return <h1>Loading</h1>;
        } else {
            return (
                <React.Fragment>
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.props.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </React.Fragment>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);