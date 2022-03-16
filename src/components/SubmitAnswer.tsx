import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { verifySolution } from '../slices/boardSlice';

function SubmitAnswer() {
  const allFilled = useAppSelector((state) => state.board.boardFilled);
  const dispatch = useAppDispatch();
  const clickHandler = () => {
    dispatch(verifySolution())
  }

  return (
    <div>
      {allFilled === true ?
        <div className="submitActive" onClick={clickHandler}>Submit Answer</div>
        :
        <div className="submitInactive">Submit Answer</div>
      }
    </div>
  );
}

export default SubmitAnswer;
