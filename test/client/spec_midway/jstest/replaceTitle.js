const fs = require('fs');

function randomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

function maskDigits(value, start, end) {
  if (!value || value.length < start + end) {
    return value;
  }

  const maskedValue = value.substring(0, start) + '0'.repeat(end) + value.substring(start + end);
  return maskedValue;
}

function maskPIVAandCF(json) {
  json.tables.registry.rows.forEach(function (row) {
    const piva = row.curr.p_iva;
    if (piva) {
      row.curr.p_iva = maskDigits(piva,3, 6);
    }

    const cf = row.curr.cf;
    if (cf) {
      row.curr.cf = maskDigits(cf, 3, 6);
    }
  });

  return json;
}

function replaceTitle(json) {
  var words = ['Cane', 'Gatto', 'Mela', 'Banana', 'Libro', 'Penna', 'Orologio', 'Bicicletta', 'Pallone', 'Fiore', 'Cappello', 'Occhiali', 'Telefono', 'Computer', 'Tavolo', 'Sedia', 'Quadro', 'Lampada', 'Finestra', 'Porta', 'Chiave', 'Forchetta', 'Coltello', 'Cucchiaio', 'Piatto', 'Bottiglia', 'Acqua', 'Vino', 'Pane', 'Formaggio', 'Pizza', 'Pasta', 'Zucchero', 'Sale', 'Pepe', 'Limone', 'Arancia', 'Mandarino', 'Kiwi', 'Fragola', 'Lampone', 'Mora', 'Uva', 'Melone', 'Anguria', 'Cocomero', 'Pesca', 'Albicocca', 'Susina', 'Prugna'];

  json.tables.registry.rows.forEach(function (row) {
    if (row.curr.title)
		row.curr.title= randomWord(words);
  });

  json.tables.registry.rows.forEach(function (row) {
    if (row.curr.surname)
		row.curr.surname= randomWord(words);
  });
  
  json.tables.registry.rows.forEach(function (row) {
    if (row.curr.extmatricula)
		row.curr.extmatricula= Math.floor(Math.random() * 10000000)+"";
  });
  
	
  
  return json;
}

// Leggi il file JSON
fs.readFile('registry_anagrafica_rtf_null_cu_sa.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Errore durante la lettura del file:', err);
    return;
  }

  try {
    const json = JSON.parse(data);
    let updatedJson = replaceTitle(json);
	updatedJson = maskPIVAandCF(json);

    // Scrivi il file JSON aggiornato
    fs.writeFile('registry_anagrafica_rtf_null_cu_sa.json', JSON.stringify(updatedJson, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Errore durante la scrittura del file:', err);
        return;
      }

      console.log('Il file JSON è stato aggiornato con successo.');
    });
  } catch (error) {
    console.error('Errore durante il parsing del file JSON:', error);
  }
});
