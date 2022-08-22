export const checkName = (arr, name1, name2) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === name1 || arr[i].name === name2) {
        alert('Игрок с таким именем уже сущестует');
        return false;
      }
    }
    return true;
  };