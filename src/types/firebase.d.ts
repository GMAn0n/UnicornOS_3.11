import { FirebaseApp, FirebaseOptions } from '@firebase/app';
import { Database, DataSnapshot } from '@firebase/database';

declare module 'firebase/app' {
  export function initializeApp(options: FirebaseOptions, name?: string): FirebaseApp;
}

declare module 'firebase/database' {
  export function getDatabase(app?: FirebaseApp): Database;
  export function ref(db: Database, path?: string): any;
  export function set(ref: any, value: any): Promise<void>;
  export function push(ref: any): any;
  export function onValue(query: any, callback: (snapshot: DataSnapshot) => void, options?: any): () => void;
}

// Remove this block:
// declare module '@firebase/database-types' {
//   export interface DatabaseError {
//     code: string;
//     message: string;
//     name: string;
//     stack?: string;
//   }
// }