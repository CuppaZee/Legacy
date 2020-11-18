import moment from 'moment-timezone';

function gameID(year, month) {
  let now = moment().tz('America/Chicago');
  let y = year !== undefined ? year : now.year();
  let m = month !== undefined ? month : now.month();
  return (y * 12) + m - 24158;
};

function reverseGameID(gameID) {
  let t = gameID + 24158;
  return {
    m: t % 12,
    y: Math.floor(t / 12)
  }
}

export default {
  clan: {
    game_id: gameID(),
    game_id_function: gameID,
    reverse_game_id_function: reverseGameID,
  }
}