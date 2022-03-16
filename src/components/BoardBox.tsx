import React, { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updatePlays } from '../slices/boardSlice';

type BoardBoxProps = {
  displayValue: string;
  preset: boolean;
  location: number[];
};

function BoardBox({ displayValue, preset, location }: BoardBoxProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const boxValue = Number(event.target.value);
    if (isNaN(boxValue)) {
      event.target.value = '';
      event.target.className = 'error';
      dispatch(updatePlays({value: 0, i:location[0], j:location[1]}));
      setTimeout(()=>{event.target.className = 'BoardBoxFilled'}, 1500)
      return;
    }
    if (boxValue > 4){
      event.target.value = '';
      event.target.className = 'error';
      dispatch(updatePlays({value: 0, i:location[0], j:location[1]}));
      setTimeout(()=>{event.target.className = 'BoardBoxFilled'}, 1500)
      return;
    }
    if (boxValue === 0){
      event.target.value = '';
      dispatch(updatePlays({value: 0, i:location[0], j:location[1]}));
      return;
    }
    dispatch(updatePlays({value: boxValue, i:location[0], j:location[1]}));
  }

  return (
    <div>
    {preset ? 
    <div className="BoardBoxPreset inactive" >
      {displayValue}
    </div>
    :
    <div className={displayValue === '' ? 'BoardBox' : 'BoardBoxFilled inactive'}>
      <input maxLength={1} placeholder={displayValue} onChange={handleChange}/>
    </div>
    }
    </div>
  );
}

export default BoardBox;
