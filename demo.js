var fs = require('fs')
var dirName = process.argv[2]

if(fs.existsSync(dirName)){
    console.log("ERR: dir exists")
    process.exit(1)
}
else{    
    fs.mkdirSync(dirName)
    process.chdir(dirName)
    fs.mkdirSync('css')
    fs.mkdirSync('js')
    fs.writeFileSync("index.html")
    fs.writeFileSync("css/style.css", "*{margin:0;padding:0;}")
    fs.writeFileSync("js/main.js")
    console.log("Success!")
    process.exit(0)
}

