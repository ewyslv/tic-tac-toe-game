import React, { useEffect, useRef, useState } from 'react';

// components
import Field from './components/Field/Field';
import Score from './components/Score/Score';

// styles
import './styles/style.css';

// helpers
import { generateFields } from './helpers/generate';
import { checkWinner } from './helpers/checkWinner';
import { generateMatrix } from './helpers/generate';
import { checkName } from './helpers/checkName';

// config
import { player } from './config/config';
import { boardSizes } from './config/config';


function App() {

  const [fields, setFields] = useState(generateFields());
  const [size, setSize] = useState(boardSizes[3].quantity);
  const [currentPlayer, setCurrentPlayer] = useState(player.cross.figure);
  const [[name1, name2], setName] = useState(['', '']);
  const [result, setResult] = useState(null);
  const [over, setOver] = useState(false);
  const [list, setList] = useState([]);
  const [addPlayer, setAddPlayer] = useState(false);

  useEffect(() => {
    if (result) {

      const prevPrev = list.at(-2);
      const prev = list.at(-1);

      if (result === name1) {
        const changedCopy = list.slice(0, -2);
        setList([...changedCopy, { ...prevPrev, count: prevPrev.count + 1 }, { ...prev }]);
      }

      if (result === name2) {
        const changedCopy = list.slice(0, -1);
        setList([...changedCopy, { ...prev, count: prev.count + 1 }]);
      }

      setOver(!over);
    }
  }, [result]);


  // Handlers:

  // Ход на доске
  const movesHandler = (index) => {

    if (name1 && name2 && name1 !== name2) {

      const updateFields = [...fields];

      if (over || updateFields[index]) return;

      if (currentPlayer === player.cross.figure) {
        updateFields[index] = player.cross.figure
        setCurrentPlayer(player.zero.figure);
      }
      else {
        updateFields[index] = player.zero.figure
        setCurrentPlayer(player.cross.figure);
      }

      setFields(updateFields);
      setResult(checkWinner(generateMatrix(updateFields, size), currentPlayer, name1, name2, size));

    }
    else {
      alert('Для начала игры укажите, кто будет играть');
    }
  };

  // Сброс игры
  const resetGameHandler = () => {
    setFields(generateFields());
    setCurrentPlayer(player.cross.figure);
    setName(['', '']);
    setResult(false);
    setOver(false);
    setAddPlayer(!addPlayer);
  };

  // Следующая игра
  const nextRoundHandler = () => {
    setFields(generateFields());
    setCurrentPlayer(player.cross.figure);
    setResult(false);
    setOver(false);
  };


  // Добавление новой пары игроков
  const addPlayersHandler = () => {
    if (name1 && name2) {
      console.log(name1, name2)
      setResult(false);
      setAddPlayer(true);
      setList(prevState => ([...prevState, { name: name1, count: 0 }, { name: name2, count: 0 }]));
    }
    else {
      alert('Имя одного из игроков не указано');
    }
  };

  // Создание поля
  const generateField = (quantity) => () => {
    setSize(quantity);
    setFields(generateFields(quantity));
  };

  return (
    <div className="App">
      <div className="fieldSize">
        <button className='btn btn_fields' onClick={generateField(boardSizes[3].quantity)}>3х3</button>
        <button className='btn btn_fields' onClick={generateField(boardSizes[5].quantity)}>5х5</button>
        <button className='btn btn_fields' onClick={generateField(boardSizes[10].quantity)}>10х10</button>
      </div>

      <div className="input__wrapper">
        <input className='input' value={name1} onChange={e => setName([e.target.value, name2])} type="text" placeholder="Игрок 1" />
        <input className='input' value={name2} onChange={e => setName([name1, e.target.value])} type="text" placeholder="Игрок 2" />
      </div>

      <button className='btn btn_big green' onClick={addPlayersHandler}>Добавить игроков</button>

      {(name1 && name2) &&
        <div className="status">Ходят "{currentPlayer}"</div>
      }

      <Field
        size={size}
        player={player}
        fields={fields}
        handler={movesHandler}
      />

      {result &&
        <div className='victory'>Победил игрок с именем {result}</div>
      }

      <div className="btn__wrapper">
        <button className='btn btn_big blue' onClick={nextRoundHandler}>Следующий раунд</button>
        <button className='btn btn_big red' onClick={resetGameHandler}>Очистить игровое поле</button>
      </div>

      <Score
        list={list}
        addPlayer={addPlayer}
      />

    </div>
  );
}

export default App;
