module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            icon: String,
            description: String,
            code: String,
            name: String,
            value: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Systemvariables = mongoose.model("systemvariables", schema);
    return Systemvariables;
};
