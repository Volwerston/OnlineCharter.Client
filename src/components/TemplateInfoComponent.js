import React from 'react'
import { connect } from 'react-redux'

import { getTemplate } from '../actions'

class TemplateInfoComponent extends React.Component {
    componentDidMount(){
        this.props.getTemplate(this.props.match.params.id);
    }

    renderTemplate(){
        if(!this.props.template){
            return <div>Loading...</div>
        }

        return (
            <div>{JSON.stringify(this.props.template)}</div>
        );
    }

    render(){
        return this.renderTemplate();
    }
}

const mapStateToProps = state => {
    return {
        template: state.currentTemplate
    };
}

export default connect(mapStateToProps, { getTemplate })(TemplateInfoComponent)