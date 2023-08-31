import { Collection, Db } from 'mongodb';
import { CATEGORIES, USERS } from './collections.name';
import { collections } from './connections';

export const ConnectToCollections = async (dataBase: Db) => {
    const userCollection: Collection = dataBase.collection(USERS);
    const categoryCollection: Collection = dataBase.collection(CATEGORIES);

    collections.userCollection = userCollection;
    collections.categoryCollection = categoryCollection;
};