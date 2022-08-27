import  mongoose from 'mongoose';
import colors from 'colors'


const connectDatabase = async () => {
    try {
      const connect = await mongoose.connect(process.env.MONGO_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected Successfully`.blue.bold.bgBrightWhite);
    } catch (error) {
      console.log(`Error: ${error.message}`.red.bold);
      process.exit(1);
    }
  };

export default connectDatabase