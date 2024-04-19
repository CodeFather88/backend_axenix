import mongoose, { Connection, Model } from "mongoose";
import { IUserDocument, IUserSchemaDocument } from "../models/User";
import { URL_MONGO_DB, DB_NAME_MONGO_DB } from "../../config";

type Ref<T> = Model<T> & Connection;

const mongoosePool = new Map<string, Ref<any>>();

function connectToDbPool(dbName: string): Ref<any> {
  if (!mongoosePool.has(dbName)) {
    const connection = mongoose.createConnection(URL_MONGO_DB, {
      dbName,
      autoIndex: true,
      maxPoolSize: 100_000_000
    });
    mongoosePool.set(dbName, connection as Ref<any>);
  }
  return mongoosePool.get(dbName)!;
}

function getModel<T>(dbName: string, collectionName: string, schema: any): Model<T> {
  const connection = connectToDbPool(dbName);
  return connection.model<T>(collectionName, schema);
}

export const UserDB = getModel<IUserDocument>(DB_NAME_MONGO_DB, "users", IUserSchemaDocument);