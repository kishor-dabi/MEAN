
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: {type: String, required: true},
        description: {type: String, required: true},
        skill_set:{type: String, required: true},
        user_id:{ type: mongoose.Schema.ObjectId, ref: "user", required: true},
        developer:{ type: mongoose.Schema.ObjectId, ref: "developer", required: false},
        status:String,
        due_date:{type:Date}
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Task = mongoose.model("Task", schema);
    return Task;
  };
  
  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Task.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };