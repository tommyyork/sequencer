let noteDivisionFxn = (division) => {
  console.log('noteDivisionFxn receiving division', division);
  console.log(32/division);
 
  let notes = [];
  notes.length = Math.floor(32 * 1 / division) - 1;
  notes.fill(0);
  
  let atoms = 0;

  let measure = 0;
  let eighths = 0;
  let thirtySeconds = 0;

  notes = notes.map((x, i) => {
    atoms = Math.floor((i + 1) / division * 32);
    eighths = Math.floor(atoms / 4) - 1;
    thirtySeconds = atoms - eighths * 4 - 1;

    return `${measure}:${eighths}:${thirtySeconds}`;
  });

  console.log(notes);




}

export { noteDivisionFxn }