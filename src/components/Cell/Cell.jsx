import React from 'react';
import styles from './Cell.module.css';


const Cell = ({ value, handler }) => {

  return (
    <div className={styles.cell} onClick={handler}>
      {value}
    </div>
  )
}

export default Cell;
