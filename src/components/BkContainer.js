import React, { Component } from 'react';
import './BkContainer.css';

import BkFolder from './BkFolder'
import BkItem from './BkItem'
import BkOpenFolder from './BkOpenFolder'



export default class BkContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenFolder: false,
            title: "",
            idOpenFolder: this.props.idOpenFolder
        }
    }

    setOpenFolder = (id) => {
        this.setState({ isOpenFolder: !this.state.isOpenFolder })
        console.log('click Container' + id)
        //this.setState({ idOpenFolder: id })
        this.props.setDoRander(id)
    }

    render() {
        const { title, bkFolder } = this.props
        let renderComponent = []
        console.log('render ' + bkFolder.id)

        if (!bkFolder.children) {
            renderComponent.push(
                <BkItem
                    //bkFolder={currentBk.children}
                    //currentBk={bkFolder}
                    title={title}
                />)
        } else {

            for (const currentBk of bkFolder.children) {
                if (currentBk.index > 3) break;

                if (!currentBk.children) {
                    renderComponent.push(
                        <BkItem
                            //bkFolder={currentBk.children}
                            //currentBk={bkFolder}
                            title={currentBk.title}
                        />)
                } else {
                    renderComponent.push(
                        <BkFolder
                            key={currentBk.id}
                            //bkFolder={currentBk.children}
                            currentBk={currentBk}
                            title={currentBk.title}
                        />
                    )
                }
            }
        }

        return (
            <div className="contener-card">
                <React.Fragment>
                    <div className="title"
                        onClick={() => this.setOpenFolder(this.props.bkFolder.id)}
                    >
                        {title}

                    </div>
                    <div className="bk-contener">
                        {renderComponent}
                    </div>
                </React.Fragment>

                {this.state.isOpenFolder && bkFolder.id === this.props.idOpenFolder &&
                    <BkOpenFolder
                        bkFolder={bkFolder}
                        title={title}
                        setOpenFolder={this.setOpenFolder}
                    />
                }
            </div>
        )
    }
}

