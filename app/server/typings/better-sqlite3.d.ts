declare module "better-sqlite3" {
  class Database {
    constructor(filename: string, options?: object);
    prepare(sql: string): Statement;
    exec(sql: string): Database;
  }

  class Statement {
    run(...params: any[]): Database.RunResult;
    get(...params: any[]): any;
    all(...params: any[]): any[];
    iterate(...params: any[]): IterableIterator<any>;
  }

  namespace Database {
    interface RunResult {
      changes: number;
      lastInsertRowid: number | bigint;
    }
  }

  export = Database;
}
