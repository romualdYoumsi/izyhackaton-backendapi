module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            format: String,
            logo: String,
            symbol: String,
            name: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const CryptoLogo = mongoose.model("cryptologo", schema);
    return CryptoLogo;
};
