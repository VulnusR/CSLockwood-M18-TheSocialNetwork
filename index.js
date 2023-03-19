const mongoose = require('mongoose');



//update connection string
mongoose.connect(`mongodb+srv://mod18API:zQs6vfnGNPTcumOp@module-18.6oucric.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
});


