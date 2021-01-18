import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const { MONGO_URI, MONGO_URI_TEST, NODE_ENV } = process.env;
    const connectionString = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;
    const conn = await connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Database Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

export default connectDB;
