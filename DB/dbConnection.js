import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://erickpjoshy:qKQf7JkF8VKccFYe@toolmec.nhlsqzj.mongodb.net/?retryWrites=true&w=majority&appName=toolmec'
  )
  .then(() => {
    console.log('DB Connected');
  })
  .catch(e => {
    console.log(e);
  });

export default mongoose;
