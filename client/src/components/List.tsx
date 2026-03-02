import { Droppable } from "@hello-pangea/dnd";
import Card from "./Card.tsx";

export default function List({ list }: { list: any }) {
  return (
    <div className="list">
      <h3>{list.title}</h3>

      <Droppable droppableId={list._id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="card-container"
          >
            {list.cards.map((card: any, index: number) => (
              <Card key={card._id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
