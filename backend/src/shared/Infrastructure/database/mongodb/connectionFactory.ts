import { Connection, connect, ConnectionOptions, connection } from 'mongoose';

export function connectionFactory(uri: string, options?: ConnectionOptions): Promise<Connection> {
    return connect(uri, { ...options, useNewUrlParser: true }).then(() => connection).catch((err) => {
        throw new Error(err ?? 'Could not establish connection to MongoDB');
    });
}
