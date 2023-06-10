// See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'products';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          // ~cb-read-start~
          {
       productSKU: { type: String, required: true, unique: true },
       productName: { type: String, required: true },
       productBrand: { type: String, required: true },
       productPrice: { type: Number, required: true },
       productRating: { type: Number, required: true, default: 0 },
       productInStock: { type: Number, required: true, default: 0 },
       productDetails: { type: String },
       productImage: { type: String, required: true, default:"NA" },
       productIsActive: { type: Boolean, required: true, default: true },

    }
          // ~cb-read-end~
          , 
          {
          timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };