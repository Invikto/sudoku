module.exports = function solveSudoku(matrix) {
  const result = matrix;
  const zeroes = [];
  const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function toSquare(row, column) {
    const x = Math.floor(column / 3);
    const y = Math.floor(row / 3) * 3;
    return x + y;
  }

  function checkRow(value, row) {
    for (let j = 0; j < 9; j++) {
      if (result[row][j] === value) {
        return false;
      }
    }

    return true;
  }

  function checkColumn(value, column) {
    for (let i = 0; i < 9; i++) {
      if (result[i][column] === value) {
        return false;
      }
    }

    return true;
  }

  function checkSquare(value, square) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let condition = (toSquare(i, j) === square);
        condition = condition && (result[i][j] === value);

        if (condition) {
          return false;
        }
      }
    }

    return true;
  }

  function checkErrorValues(value, zero) {
    return !zero.wrongValues.includes(value);
  }

  function insertValue(zero, digit) {
    let checkDigit = checkRow(digit, zero.row);
    checkDigit = checkDigit && checkColumn(digit, zero.column);
    checkDigit = checkDigit && checkSquare(digit, zero.square);
    checkDigit = checkDigit && checkErrorValues(digit, zero);

    if (checkDigit) {
      result[zero.row][zero.column] = digit;
      zero.value = digit;

      return true;
    }

    return false;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!result[i][j]) {
        zeroes.push({
          row: i,
          column: j,
          square: toSquare(i, j),
          value: 0,
          wrongValues: [],
        });
      }
    }
  }

  let k = 0;
  const n = zeroes.length;
  while (k < n) {
    let wasInsert = false;

    for (const digit of DIGITS) {
      wasInsert = insertValue(zeroes[k], digit);
      if (wasInsert) {
        break;
      }
    }

    if (wasInsert) {
      k++;
    } else {
      zeroes[k].wrongValues = [];
      zeroes[k - 1].wrongValues.push(zeroes[k - 1].value);
      zeroes[k - 1].value = 0;
      result[zeroes[k - 1].row][zeroes[k - 1].column] = 0;
      k--;
    }
  }

  return result;
};
