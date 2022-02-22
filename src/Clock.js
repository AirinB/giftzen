import React from 'react'
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    render() {
        return (
            <div>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}

function makeRequest() {
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>console.log(json))
}

setInterval(tick, 1000);
makeRequest();
export default Clock;
