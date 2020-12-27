module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        email: {type:String, unique: true},
        date_of_birth: Date,
        age:Number,
        skills:String,
        user_type:Number,
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
  
    const User = mongoose.model("user", schema);
    return User;
  };
  