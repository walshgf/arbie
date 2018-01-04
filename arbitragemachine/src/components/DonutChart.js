import React from 'react';
import style from './DonutChart.css';

class DonutChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            lowSeller: this.props.lowSeller,
            highBuyer: this.props.highBuyer,
            valueLabel: 'Completed',
            size: 116,
            strokeWidth: 26,
        };
    }
    render() {
        const halfSize = (this.state.size * 0.5);
        const radius = halfSize - (this.state.strokeWidth * 0.5);
        const circumference = 2 * Math.PI * radius;
        const strokeVal = ((this.state.value * circumference)/ 100);
        const dashVal = (strokeVal * 11 + ' ' + circumference);

        const trackStyle = {strokeWidth: this.state.strokeWidth};
        const indicatorStyle = {strokeWidth: this.state.strokeWidth, strokeDasharray: dashVal};
        const rotateVal = 'rotate(-90 '+halfSize+','+halfSize+')';

        return (
            <div>
                <svg width={this.state.size} height={this.state.size} className ="donutchart">
                <circle r={radius} cx={halfSize} cy={halfSize} transform={rotateVal} style={trackStyle} className="donutchart--track"/>
                    <circle r={radius} cx={halfSize} cy={halfSize} transform={rotateVal} style={indicatorStyle} className="donutchart--indicator"/>
                    <text className="donutchart--text" x={halfSize} y={halfSize} style={{textAnchor:'middle'}} >
                        <tspan className="donutchart--text_val">{this.props.value}</tspan>
                        <tspan className="donutchart--text_percent">%</tspan>
                        <tspan className="donutchart--text_label" x={halfSize} y={halfSize+10}>{this.props.valueLabel}</tspan>
                    </text>
                </svg>
                <div>
                    <p>Arbitrage Percentage: {this.state.value} %</p>
                    <p>Buy from: {this.state.lowSeller}</p>
                    <p>Sell to: {this.state.highBuyer}</p>
                </div>
    
            </div>            
            
        );
    }
}
/*

                    
                    
                    */

export default DonutChart;