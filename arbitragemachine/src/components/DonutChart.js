import React from 'react';
import style from './DonutChart.css';

class DonutChart {
    getDefaultProps() {
        return {
            value: 20,
            valueLabel: 'Completed',
            size: 116,
            strokeWidth: 26,
        };
    }
    render() {
        const halfSize = (this.props.size * 0.5);
        const radius = halfSize - (this.props.strokeWidth * 0.5);
        const circumference = 2 * Math.PI * radius;
        const strokeVal = ((this.props.value * circumference)/ 100);
        const dashVal = (strokeVal + ' ' + circumference);

        const trackStyle = {strokeWidth: this.props.strokeWidth};
        const indicatorStyle = {strokeWidth: this.props.strokeWidth, strokeDasharray: dashval};
        const rotateVal = 'rotate(-90 '+halfSize+','+halfSize+')';

        return (
            <svg width={this.props.size} height={this.props.size} className="donutchart">
                <circle r={radius} cx={halfSize} cy={halfSize} transform={rotateVal} style={trackStyle} className="donutchart--track"/>
                <circle r={radius} cx={halfSize} cy={halfSize} transform={rotateVal} style={indicatorStyle} className="donutchart--indicator"/>
                <text className="donutchart--text" x={halfSize} y={halfSize} style={{textAnchor:'middle'}} >
                    <tspan className="donutchart--text_val">{this.props.value}</tspan>
                    <tspan className="donutchart--text_percent">%</tspan>
                    <tspan className="donutchart--text_label" x={halfSize} y={halfSize+10}>{this.props.valueLabel}</tspan>
                </text>
            </svg>
        );
    }
}