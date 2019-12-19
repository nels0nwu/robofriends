import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import {robots} from './robots';
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [], //robots,
            searchfield: ''
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

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        console.log('render');
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })


        if (this.state.robots.length === 0) {
            return <h1>Loading</h1>;
        } else {
            return (
                <React.Fragment>
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </React.Fragment>
            );
        }
    }
}

export default App;