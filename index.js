


//listen to port
const port = process.env.PORT || 8004;
 
mongoose.connect("mongodb+srv://louisedennevi:louise123@todolist-3zvcf.mongodb.net/test?retryWrites=true&w=majority")
//app is listening to port

app.listen(port);