import React, { Component } from 'react'
import Popover from '@material-ui/core/Popover';
export default class Test extends Component {
    
    state = {
        show:false
    }

    handleClick = () => {
        this.setState({
            show:!this.state.show
        })
    }
       open = Boolean(this.state.show);
       id = this.open ? 'simple-popover' : undefined;
    render() {
        return (
            <div>
                <div className="container">
                    <table>
                        <tbody>
                            <tr>
                                <td onClick={this.handleClick}>Devang
                                        {
                                            this.state.show && <form><input type="text"/><button>Sumbit</button></form>
                                        }

                                </td>
                                <td>Devang</td>
                                <td>Devang</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
