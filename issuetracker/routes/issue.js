var express = require('express');
var issues = require('../data/issueData').issues;

let maxissue = issues.length;
var router = express.Router();
router.get('/',function(req,res,next){
        const issue = issues;
        res.status(200).json({
                message: "Issues fetched successfully!",
                issue: issue
              });
    
})
router.post("/create", (req, res, next) => {
        const id = Math.max(...issues.map(i => i.id))
  const issue = req.body;
  issue.id = id + 1;
  issues.push(issue);
  console.log(issue.id);
  res.status(201).json({
    message: 'Issue added successfully'
  });
});
router.delete("/delete/:id",(req,res,next) => {
        const id = req.params.id
        issues = issues.filter(item => item.id != id)
        res.status(200).json({message: 'Issue Deleted'})

})
router.put("/update/:id", (req,res,next) => {
        issues = issues.map(item => {
                if(item.id == req.params.id){
                        return req.body;
                }
                return item;
        })
        console.log(issues);
        res.status(200).json({message: 'Issue Updated'})


})

module.exports = router;