"use client";
import { useTodos } from "./todosContext";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos();
  return (
    <div id="wd-todo-list-context">
      <h2>React Context Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-center">
          <Button onClick={addTodo} className="btn btn-success me-2">Add</Button>
          <Button onClick={updateTodo} className="btn btn-warning me-2">Update</Button>
          <FormControl value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id} className="d-flex align-items-center">
            <Button onClick={() => deleteTodo(t.id)} className="btn btn-danger me-2">Delete</Button>
            <Button onClick={() => setTodo(t)} className="btn btn-warning me-2">Edit</Button>
            {t.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
