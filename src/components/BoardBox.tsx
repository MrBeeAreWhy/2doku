import React, { MouseEvent } from 'react';
import { updatePlays } from '../slices/boardSlice';
import { connect } from 'react-redux'


const mapDispatch = (dispatch: any) => {
  return {
      updatePlays: (payload: any) => dispatch(updatePlays(payload))
  }
};

type BoardBoxProps = {
  displayValue: string;
  preset: boolean;
  location: number[];
  updatePlays: Function;
  gameWon: boolean;
};

class BoardBox extends React.Component<BoardBoxProps> { //need access to shouldComponentUpdate, so utilizing class syntaxt for this component -- prevents a lot of rerenders
  shouldComponentUpdate(nextProps:any):boolean {
    if (nextProps.gameWon !== this.props.gameWon){
      return true;
    }
    if (nextProps.preset === true || nextProps.displayValue === this.props.displayValue){
      //don't re-render if it's preset or if the display value did not change
      return false;
    }
    return true;
  }
  render () {
    const renderTime = Date.now();
    let divRef = React.createRef<HTMLDivElement>();
    
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (renderTime + 100 > Date.now()){
        return;
      }
      let dispatchValue = 0;
      let displayNum = Number(this.props.displayValue);
      if (event.type === 'click'){
        if (displayNum === 0 || displayNum === 4){
          dispatchValue = 1;
        } else {
          dispatchValue = displayNum + 1;
        }
      } else if (event.type === 'contextmenu'){
        if (displayNum === 0 || displayNum === 1){
          dispatchValue = 4;
        } else {
          dispatchValue = displayNum - 1;
        }
      }
  
      this.props.updatePlays({value: dispatchValue, i:this.props.location[0], j:this.props.location[1]});
    }
  
    const handleWiggle = () => {
      if (divRef.current){
        divRef.current.className = 'error'
        setTimeout(()=>{
          if (divRef.current){
            divRef.current.className = 'BoardBoxPreset'
          }
        }, 600)
      }
    }
    const closuredHandleWiggle = throttler(handleWiggle, 600)
  
    return (
      <div>
      {this.props.preset ? 
      <div ref={divRef} className='BoardBoxPreset' onClick={!this.props.gameWon ? closuredHandleWiggle : ()=>{return}} onContextMenu={!this.props.gameWon ? closuredHandleWiggle : ()=>{return}}>
        {this.props.displayValue}
      </div>
      :
      <div className={this.props.gameWon ? 'BoardBoxFinal' : this.props.displayValue === '' ? 'BoardBox' : 'BoardBoxFilled'} onClick={!this.props.gameWon ? handleClick : ()=>{return} } onContextMenu={!this.props.gameWon ? handleClick : ()=>{return} }>
        {this.props.displayValue}
      </div>
      }
      </div>
    );
  }
}

const throttler = (cb: Function, delay: number) => {
  let lastInvoked = 0;
  const inner = (...args: any[]) => {
    if (lastInvoked + delay < Date.now()){
      lastInvoked = Date.now()
      cb(...args);
    }
  }
  return inner;
}

export default connect(null, mapDispatch)(BoardBox);
