// See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'orders';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          // ~cb-read-start~
          {
       orderUser: { type: String, required: true },
       orderSummary: { type: String },
       orderPayment: { type: Number, required: true },
       orderPaymentOption: { type: String, required: true },
       orderShippingAddr: { type: String, required: true },
       orderDate: { type: Date, required: true },
       orderStatus: { type: String, required: true, default: 'Pending' },
       orderShipment: { type: String },

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