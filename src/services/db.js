import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

class Database {
  constructor({ host, dbname, port, srv, user, password }) {

    const server = srv === 'true' ? 'mongodb+srv' : 'mongodb';
    const PORT = srv === 'true' ? `:${ port }` : '';
    const auth = srv === 'true' ? `${ user }:${ password }@` : '';

    this.url = `${ server }://${ auth }${ host }${ PORT }/${ dbname }`;

    this.connect();
  }

  connect() {
    try {
      mongoose.connect(
        this.url,
        {
          useNewUrlParser: true,
        },
      );  
    } catch (error) {
      mongoose.createConnection(this.url, {
        useNewUrlParser: true,
      });
    }

    mongoose.connection
    .once('open', () => console.log('MongoDB running'))
    .on('error', e => {
      throw e;
    });
  }  
}

export default Database;