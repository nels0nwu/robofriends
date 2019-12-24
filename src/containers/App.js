import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
// import {robots} from './robots';
import './App.css';

import {setSearchField} from '../actions';

function mapStateToProps(state) {
    return {
        searchField: state.searchField
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [] //robots
        }
        console.log('constructor');
    }

    componentDidMount() 
    {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => this.setState({ robots: json }));
        console.log('component did mount');
    }

    render() {
        console.log('render');
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase())
        })


        if (this.state.robots.length === 0) {
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