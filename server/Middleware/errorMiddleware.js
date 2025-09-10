

module.exports=(app)=>{

app.use((err, req, res, next) => {

   
    let firstStackLine = "unknown location";
    if (err.stack) {
        const lines = err.stack.split('\n');
        if (lines.length > 1) {
            firstStackLine = lines[1].trim();
        }
    }
  
    console.error(`${err.name}: ${err.message}`);
    console.error(`${firstStackLine}`);
  
    res.status(500).json({
        
        message: "Internal Server Error",
       
    });
  });
  

}