module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            email: String,
            phonenumber: String,
            gender: String,
            role: String,
            expire_time: String,
            status: String,
            name: String,
            is_active: Boolean,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Users = mongoose.model("users", schema);
    return Users;
};
