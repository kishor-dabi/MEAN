module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        email:{type:String, unique: true},
        date_of_birth: Date,
        age:Number,
        skills:String,
        manager:{ type: mongoose.Schema.ObjectId, ref: "user", required: true},
        token:String,
        password:String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Developer = mongoose.model("developer", schema);
    return Developer;
  };
  