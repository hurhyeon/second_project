import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        const todos = await Data.todo.getList(); // 비동기 처리
        res.status(200).send(todos);
        break;

      case "POST":
        const { text, color } = req.body;

        if (!text || !color) {
          return res.status(400).send("text 혹은 color가 없습니다.");
        }

        const todosPost = await Data.todo.getList(); // 비동기 처리
        const todoId = todosPost.length > 0 ? todosPost[todosPost.length - 1].id + 1 : 1;
        
        const newTodo = {
          id: todoId,
          text,
          color,
          checked: false,
        };

        await Data.todo.write([...todosPost, newTodo]); // 비동기 처리
        res.status(201).end();
        break;

      default:
        res.status(405).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};
