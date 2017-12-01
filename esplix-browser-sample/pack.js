var fs = require('fs')

fs.readFile(process.argv[2], function (err, data) {
  if (err) console.log(err);
  else {
    fs.writeFile(
      process.argv[2]+".json",
      '"' + data.toString('hex') + '"', function (err) {
      if (err) console.log(err);
      else console.log('OK');
    })
  }

})
