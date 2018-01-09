import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    action as actionAction,
} from 'path';

const mapDispatchToProps = (dispatch) => {
    return {
        action: () => {
            dispatch(actionAction());
        },
    };
};

const mapStateToProps = ({ state }) => ({
    prop: state.prop
});

export class AlexJoinedOnNewBranch extends Component {
    render() {
        const {
            action
        } = this.props;

        return (
        	<div></div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlexJoinedOnNewBranch);
