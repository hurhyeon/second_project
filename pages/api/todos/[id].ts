import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const todoId = Number(req.query.id);

  // 할 일의 존재 여부 확인
  const todo = Data.todo.exist({ id: todoId });
  if (!todo) {
    res.status(404).end();
    return;
  }

  try {
    const todos = Data.todo.getList();
    switch (req.method) {
      case "PATCH":
        const changedTodos = todos.map((todoItem) =>
          todoItem.id === todoId ? { ...todoItem, checked: !todoItem.checked } : todoItem
        );
        Data.todo.write(changedTodos);
        res.status(200).end();
        break;
      case "DELETE":
        const filteredTodos = todos.filter((todoItem) => todoItem.id !== todoId);
        Data.todo.write(filteredTodos);
        res.status(200).end();
        break;
      default:
        // 지원하지 않는 메소드에 대한 처리
        res.status(405).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};
