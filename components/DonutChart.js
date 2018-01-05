import React from 'react';

class DonutChart {
    getDefaultProps() {
        return {
            value: 0,
            valueLabel: 'Completed',
            size: 116,
            strokeWidth: 26,
        };
    }

    render() {
        const halfSize = (this.props.size *0.5);
        const radius = halfSize - (this.getDefaultProps.strokeWidth * 0.5);
        const circumference = 2 * Math.PI * radius;
        

    }
}