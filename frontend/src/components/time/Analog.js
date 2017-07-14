import React from 'react';
import { drawClock } from './AnalogAction';

class Analog extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ctx: 0,
            radius: 0,
            isChanged: true
        };
    }

    componentDidMount() {
        let tmpradius;
        let canvas = this.refs.mycanvas;
        let container = this.refs.container;
        canvas.height = container.clientWidth < container.clientHeight ? container.clientWidth : container.clientHeight;
        canvas.width = canvas.height;
        this.setState(
            {
                ctx: canvas.getContext("2d"),
                radius: canvas.height / 2 * 0.9

            },
            () => {
                tmpradius = this.state.radius / 0.9;
                this.state.ctx.translate(tmpradius, tmpradius);
                drawClock(this.state.ctx, this.state.radius, this.props.utcDiff);
                this.interval = setInterval(() => {
                    drawClock(this.state.ctx, this.state.radius, this.props.utcDiff)
                }, 1000);
            }
        );
    }

    componentWillReceiveProps() {
        if (this.props.isChanged !== this.state.isChanged) {
            let tmpradius;
            let canvas = this.refs.mycanvas;
            let container = this.refs.container;
            canvas.height = container.clientWidth < container.clientHeight ? container.clientWidth : container.clientHeight;
            canvas.width = canvas.height;
            this.setState(
                {
                    ctx: canvas.getContext("2d"),
                    radius: canvas.height / 2 * 0.9,
                    isChanged: !this.state.isChanged
                },
                () => {
                    tmpradius = this.state.radius / 0.9;
                    this.state.ctx.translate(tmpradius, tmpradius);
                }
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className='analog' ref='container' style={this.props.analogStyle}>
                <canvas className="canvas" ref="mycanvas"></canvas>
            </div>
        );
    };
}

export default Analog;