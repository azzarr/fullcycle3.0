const url = require('url');
const express = require("express")
const app = express()
const port = 3000

var mysql      = require('mysql2');
var connection = mysql.createConnection({
  database : 'mybase',
  host     : 'db',
  port : '3306',
  user     : 'root',
  password : 'root'
  
});
   

var lastname=''

var listanomes =[]

app.get('/',(req,res) => {
    listanomes =[]

    connection.connect();
    
    if(req.query.text != undefined && req.query.text != null && req.query.text !== lastname){
        lastname=req.query.text
        connection.query('INSERT INTO people (`title`) VALUES ("'+req.query.text+'")', function(err, rows, fields) {
            if (err) throw err;
            res.redirect( req.originalUrl.split("?").shift() )
        });
    }else
    
    connection.query('SELECT title FROM people ', function(err, rows, fields) {
      if (err) throw err;
        rows.forEach(r => {
            console.log('r',r)
            listanomes.push(r.title)
        });
        responder(res) 
    });
    
    // connection.end();
    
 
})


function responder(res){
    console.log(listanomes.length)

    var page ="<body> \
    <h1>Full Cycle Rocks!</h1> \
    \
    <form>\
        <div>\
          <label for=\"example\">Nome</label>\
          <input id=\"example\" type=\"text\" name=\"text\" />\
        </div>\
        <div>\
          <input type=\"submit\" value=\"Send\" />\
        </div>\
    </form>\
    "

    if(listanomes.length > 0){

        page = page + "<h5>Nomes:</h5>"
        listanomes.forEach(nome => {
            page = page + "<span>"+nome+"</span><br>"
        });
        
        

    }


    page = page+"</body>"

    res.send(page)


}



app.listen(port, ()=>{
    console.log('Rodando '+port)

})