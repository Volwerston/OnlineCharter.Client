import React from 'react'

class LandingComponent extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4"
                    style={{
                        height: '400px',
                        width: '100%',
                        backgroundColor: '#DCDCDC',
                        padding: '10px',
                        marginTop: '25px'
                    }} >
                    <div className="col-sm-12">
                        <img
                            className="img-responsive"
                            style={{
                                height: '200px',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '50%'
                            }}
                            src="./images/import-data.png" />
                    </div>
                    <br/>
                    <div className="col-sm-12">
                        <h3 className="text-center">Import</h3>
                    </div>
                    <br/>
                    <div className="col-sm-12">
                        <p className="text-center">Load structured data from your XML documents into our storage</p>
                    </div>
                </div>
                <div className="col-md-4"
                    style={{
                        height: '400px',
                        width: '100%',
                        backgroundColor: '#DCDCDC',
                        padding: '10px',
                        marginTop: '25px'
                    }} >
                    <div className="col-sm-12">
                        <img
                            className="img-responsive"
                            style={{
                                height: '200px',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '50%'
                            }}
                            src="./images/filter-data.png" />
                    </div>
                    <br/>
                    <div className="col-sm-12">
                        <h3 className="text-center">Filter</h3>
                    </div>
                    <br/>
                    <div className="col-sm-12">
                        <p className="text-center">Extract helpful insights and calculate metrics with evident UI</p>
                    </div>
                </div>
                <div className="col-md-4"
                    style={{
                        height: '400px',
                        width: '100%',
                        backgroundColor: '#DCDCDC',
                        padding: '10px',
                        marginTop: '25px'
                    }} >
                    <div className="col-sm-12">
                        <img
                            className="img-responsive"
                            style={{
                                height: '200px',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '50%'
                            }}
                            src="./images/visualize-data.png" />
                    </div>
                    <br/>
                    <div className="col-sm-12">
                        <h3 className="text-center">Visualize</h3>
                    </div>
                    <br/>
                    <div className="col-sm-12">
                        <p className="text-center">Construct popular charts and export them as PNG images</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingComponent;