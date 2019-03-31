import React from 'react'
import DataTable from 'react-data-table-component'
import { connect } from 'react-redux'
import { getUserDataSources, clearResults } from '../actions'
import { Link } from 'react-router-dom'

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
    history.push(`/data-source/${row.id}/info`);
};

class DataSourceSearchComponent extends React.Component {

    componentWillMount() {
        if (!this.props.user.isAuthenticated) {
            history.push('/');
        }
    }

    componentDidMount() {
        this.props.getUserDataSources();
    }

    componentWillUnmount() {
        this.props.clearResults();
    }

    render() {
        if (this.props.dataSources) {

            if (this.props.dataSources.error) {
                return (
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        {this.props.dataSources.error}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            }

            if (this.props.dataSources.result) {
                return (
                    <DataTable
                        title="Data Sources"
                        columns={columns}
                        data={this.props.dataSources.result.dataSources}
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
        dataSources: state.userDataSources,
        user: state.auth
    };
}

export default connect(mapStateToProps, { getUserDataSources, clearResults })(DataSourceSearchComponent)