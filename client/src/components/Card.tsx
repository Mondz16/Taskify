import { Draggable } from "@hello-pangea/dnd";

export default function Card({card, index}: {card:any, index:number}){
    return(
        <Draggable draggableId={card._id} index={index}>
            {
                (provided) => (
                    <div 
                    className="card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                        {card.title}
                    </div>
                )
            }
        </Draggable>
    )
}