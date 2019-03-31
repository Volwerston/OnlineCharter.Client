import React from 'react'
import { connect } from 'react-redux'
import DataTable from 'react-data-table-component'
import { getUserTemplates, clearResults } from '../actions'

import history from '../utils/history'

const columns = [
    {
        name: 'Name',
        selector: 'name',
        sortable: true
    },
    {
        name: 'Id',
        selector: 'id',
        sortable: true
    },
    {
        name: 'Creation date',
        selector: 'creationDateTime',
        sortable: true
    }
];

const onRowClicked = row => {
    history.push(`/template/${row.id}/info`);
};

class TemplateSearchComponent extends React.Component {
    
    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            history.push('/');
        }
    }

    componentDidMount() {
        this.props.getUserTemplates();
    }

    componentWillUnmount() {
        this.props.clearResults();
    }

    render(){
        if (this.props.templates) {

            if (this.props.templates.error) {
                return (
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        {this.props.templates.error}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            }

            if (this.props.templates.result) {
                return (
                    <DataTable
                        title="Templates"
                        columns={columns}
                        data={this.props.templates.result.templates}
                        onRowClicked={onRowClicked}
                        pagination
                        paginationPerPage={5}
                        pointerOnHover
                        highlightOnHover          
                    />
                );
            }
        }
        else {
            return (
                <div>Loading...</div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        templates: state.getUserTemplatesResult,
        user: state.auth
    };
};

export default connect(mapStateToProps, { getUserTemplates, clearResults })(TemplateSearchComponent)