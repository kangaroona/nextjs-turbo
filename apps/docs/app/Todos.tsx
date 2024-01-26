import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
interface TodoItem {
  id: number;
  title: string;
}
export function Todos() {
  const fetchTodoList = async (): Promise<TodoItem[]> => {
    const { data }: { data: TodoItem[] } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  };
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
    enabled: false,
  });

  return (
    <div>
      <Button onClick={() => refetch()}>Fetch Todos</Button>

      {data ? (
        <>
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

      <div>{isFetching ? "Fetching..." : null}</div>
    </div>
  );
}
