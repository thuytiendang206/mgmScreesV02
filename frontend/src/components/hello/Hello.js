import React from 'react';

class Hello extends React.Component {
    static getType() {
        return "Hello";
    }
    render() {
        return (
            <h1 className="title">Hello MGM</h1>
        );
    }
};
export default Hello;