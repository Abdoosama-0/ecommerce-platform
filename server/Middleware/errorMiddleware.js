

module.exports=(app)=>{

app.use((err, req, res, next) => {

    // استخراج أول سطر من stack trace (مكان الخطأ)
    let firstStackLine = "unknown location";
    if (err.stack) {
        const lines = err.stack.split('\n');
        if (lines.length > 1) {
            firstStackLine = lines[1].trim(); // السطر اللي فيه الملف والسطر
        }
    }
  
    // طباعة مختصرة للكونسول
    console.error(`${err.name}: ${err.message}`);
    console.error(`${firstStackLine}`);
  
    // الرد على المستخدم أو الكلاينت
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
       
    });
  });
  

}