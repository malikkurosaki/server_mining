const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['id'], forceNER: true , ner: {useDuckling: true}});
// Adds the utterances and intents for the NLP
manager.addDocument('id', 'selamat tinggal', 'selamat.tinggal');
manager.addDocument('id', 'sampai jumpa hati hati', 'selamat.tinggal');
manager.addDocument('id', 'sampai ketemu lagi', 'selamat.tinggal');
manager.addDocument('id', 'sampai ketemu', 'selamat.tinggal');
manager.addDocument('id', 'saya harus pergi', 'selamat.tinggal');
manager.addDocument('id', 'apa kabar', 'selamat.halo');
manager.addDocument('id', 'halo', 'selamat.halo');
manager.addDocument('id', 'bagaimana kabarnya', 'selamat.halo');

// Train also the NLG
manager.addAnswer('id', 'selamat.tinggal', 'sampai nanti');
manager.addAnswer('id', 'selamat.tinggal', 'sampai ketemu');
manager.addAnswer('id', 'selamat.halo', 'halo yang disana');
manager.addAnswer('id', 'selamat.halo', 'sapaan');


// Train and save the model.
(async() => {
    await manager.train();
    manager.save();
    const response = await manager.process('id', 'sepertinya saya harus pergi');
    console.log(response.classifications);
})();