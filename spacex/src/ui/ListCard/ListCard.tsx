import React from 'react';
import classes from './ListCard.module.scss';

const ListCard = (props: {children: React.ReactNode}) => {
  return (
        <div className={classes.Card}>
            {props.children}
        </div>
  );
}

export default ListCard;
