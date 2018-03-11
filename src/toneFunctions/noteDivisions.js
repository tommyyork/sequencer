let noteDivisionFxn = (division) => {
  console.log('noteDivisionFxn receiving division', division);
  console.log(32/division);
 
  let notes = [];
  notes.length = division;
  notes.fill(0);
  
  let atoms = 0;

  let measure = 0;
  let eighths = 0;
  let thirtySeconds = 0;

  notes = notes.map((x, i) => {
    atoms = Math.floor((i + 1) / division * 32);
    eighths = Math.max(Math.floor(atoms / 4) - 1, 0)
    thirtySeconds = Math.max(atoms - eighths * 4 - 1, 0);

    return `${measure}:${eighths}:${thirtySeconds}`;
  });

  return notes;
}

export { noteDivisionFxn }