const knowledgeAndBeliefs = require('./read');

knowledgeAndBeliefs.forEach(function(data, index){
    let {Age, Category, Percentage, Gender} = data;
    console.log(data)

})
