import React from 'react';
import Cell from '../Cell/Cell';
import styles from './Field.module.css';
import { boardSizes } from '../../config/config';


const Field = ({clicked, size, fields, handler}) => {

  const classes = [styles.field];
  classes.push(styles[boardSizes[size].class]);
    
  return (
    <div className={classes.join(' ')}>
      {
        fields.map((field, index) => <Cell key={index} value={field} handler={() => handler(index)}/>)
      }
    </div>
  )
}

export default Field;
