import React from 'react'
import { connect } from 'react-redux'
import { getDataSourceUploadProcess } from '../actions'
import history from '../utils/history'

class DataSourceUploadProcessComponent extends React.Component {
    componentDidMount(){
        this.props.getDataSourceUploadProcess(this.props.dataSourceId);
    }

    render(){     
        var status = "None";

        if(this.props.dataSourceUploadProcess && this.props.dataSourceUploadProcess.result){
            status = this.props.dataSourceUploadProcess.result.status;

            if(status === "Completed"){
                setTimeout(() => {
                        history.push(`/data-source/${this.props.dataSourceId}/info`);
                }, 1000);
            }
            else{
                setTimeout(() => {
                    this.props.getDataSourceUploadProcess(this.props.dataSourceId);
                }, 500);
            }
        }    

        return (
            <div className="row">
                <div className="col-sm-12">
                    <p style={{textAlign: "center"}}>Upload status: {status}...</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataSourceUploadProcess: state.dataSourceUploadProcessResult
    };
}

export default connect(mapStateToProps, { getDataSourceUploadProcess })(DataSourceUploadProcessComponent)