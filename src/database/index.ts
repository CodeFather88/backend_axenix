import mongoose, { Connection, Model } from "mongoose";
import { IUser, IUserSchemaDocument } from "../models/User";
import { URL_MONGO_DB, DB_NAME_MONGO_DB } from "../../config";
import { IStore, IStoreSchemaDocument } from "../models/Store";
import { IProduct, IProductSchemaDocument } from "../models/Product";
import { IMetric, IMetricSchemaDocument } from "../models/Metric";
import { ICar, ICarSchemaDocument } from "../models/Car";

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

export const UserDB = getModel<IUser>(DB_NAME_MONGO_DB, "users", IUserSchemaDocument);
export const StoreDB = getModel<IStore>(DB_NAME_MONGO_DB, "stores", IStoreSchemaDocument)
export const ProductDB = getModel<IProduct>(DB_NAME_MONGO_DB, "products", IProductSchemaDocument)
export const MetricDB = getModel<IMetric>(DB_NAME_MONGO_DB, "metrics", IMetricSchemaDocument)
export const CarDB = getModel<ICar>(DB_NAME_MONGO_DB, 'cars', ICarSchemaDocument)
