import React, { useState } from 'react';
import styles from './Score.module.css';


const Score = ({ list, addPlayer }) => {

    return (
        <div className={styles.score__wrapper}>
            <div className={styles.score__header}>Текущий счет</div>

            {addPlayer &&
                list.map((player, i) => (
                    <div className={styles.score__content} key={i}>
                        <div className={styles.score__name}>{player.name}</div>
                        <div className={styles.score__count}>{player.count}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Score;
