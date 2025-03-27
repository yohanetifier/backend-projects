// export interface Todo {
//   id: number;
//   title: string;
//   description: string;
//   userId: number;
//   todoId: number;
// }

export class Todo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public userId: number,
    public todoId: number,
  ) {}
}
