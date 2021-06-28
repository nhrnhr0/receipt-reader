



window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('#display_image');
          img.onload = () => {
              URL.revokeObjectURL(img.src);  // no longer needed, free memory
          }
          
          
          var path = URL.createObjectURL(this.files[0]); // set src to blob url
          img.src= path;
          Tesseract.recognize(
            this.files[0],
            'eng+heb',
            { 
              logger: m => {
                console.log(m)
                document.querySelector('.proggress-text').innerHTML ='status: ' + m.status + '<br>' +  "progress: " + m.progress;
              }
            }
          ).then(({ data: { text } }) => {
            console.log(text);
            document.querySelector('#final_text').value = text;
          });
      }
  });
});

/*const worker = Tesseract.createWorker();
console.log(worker);
(async () => {
  await worker.load();
  await worker.loadLanguage('eng+heb');
  await worker.initialize('eng+heb');
  const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log(text);
  await worker.terminate();
})();*/