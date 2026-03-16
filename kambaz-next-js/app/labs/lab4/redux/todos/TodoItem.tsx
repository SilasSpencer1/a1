"use client";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";
export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id} className="d-flex align-items-center">
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click" className="btn btn-danger me-2">
        Delete
      </Button>
      <Button onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click" className="btn btn-warning me-2">
        Edit
      </Button>
      {todo.title}
    </ListGroupItem>
  );
}
