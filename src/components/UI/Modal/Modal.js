import React ,{ Component }from 'react';
import classes from './Modal.module.css';
import Aux from '../../../containers/hoc/Aux/Aux';
import BackDrop from '../BackDrop/BackDrop';



class Modal extends Component{

    //we have made our modal class based insted of stateless functional comp becoz to improve performance by not making
    //re-rending of order summary when it is not displayed we made changes in Modal not in Order summary as Modal 
    //is parent/wrappind element of ordersummary/wrapped element i.e we put chcek condition of show in Modal.
    // here we are checking only show property no need to check for modalclosed i.e not used Pure comp 


    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show || nextProps.children!==this.props.children
    }

    componentWillUpdate(){
        console.log('[Modal] will update');
    }

    render(){
        return(
        <Aux>
            <BackDrop 
            show={this.props.show} 
            clicked={this.props.modalClosed}
            />
            <div 
                className ={classes.Modal}
                style={{
                transform:this.props.show ? 'translateY(0)' :'translateY(-100vh)',
                opacity:this.props.show ? '1' :'0'
                }}
                >
                {this.props.children}
            </div>
        </Aux>
        );
    }
}

export default Modal;