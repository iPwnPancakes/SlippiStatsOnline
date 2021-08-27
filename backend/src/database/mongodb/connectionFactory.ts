import { Connection, connect, ConnectionOptions, connection } from 'mongoose';

export async function connectionFactory(uri: string, options?: ConnectionOptions): Promise<Connection> {
    await connect(uri, {
        ...options,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    if (!connection) {
        throw new Error('Could not establish connection to MongoDB');
    }

    return connection;
}
