// See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'users';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          // ~cb-read-start~
          {
       username: { type: String, required: true, unique: true, lowercase: true },
       email: { type: String, required: true, unique: true, lowercase: true },
       password: { type: String },
       fullname: { type: String, required: true },
       phone: { type: String, required: true, unique: false },
       isAdmin: { type: Boolean, default: false },
       billingAddr: { type: String, required: true },

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