import React from 'react'

class TemplateSourceComponent extends React.Component {

    renderDataSourceSchemaElement = dataSources => {
        if(dataSources && dataSources.length > 0){
            return dataSources.map(item => {
                return <option key={item.id} value={item.id}>{item.name}: {item.id}</option>
            });
        }

        return <option value="00000000-0000-0000-0000-000000000000">None</option>
    }

    render(){
        return (
            <div  className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                        <label htmlFor="templateName">Template name:</label>
                        <input type="text" name="templateName" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataSource">Data source: </label>
                        <select name="dataSource" className="form-control">
                            {this.renderDataSourceSchemaElement(this.props.dataSources)}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default TemplateSourceComponent;