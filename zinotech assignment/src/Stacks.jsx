import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {v4 as uuidV4} from "uuid";
const redStackcard = [
  { id: uuidV4(), cardtitle: "redcard1" },
  { id: uuidV4(), cardtitle: "redcard2" },
  { id: uuidV4(), cardtitle: "redcard3" },
  { id: uuidV4(), cardtitle: "redcard4" }
]
const blueStackcard = [
  { id: uuidV4(), cardtitle: "bluecard1" },
  { id: uuidV4(), cardtitle: "bluecard2" },
  { id: uuidV4(), cardtitle: "bluecard3" },
  { id: uuidV4(), cardtitle: "bluecard4" }
]
const greenStackcard = [
  { id: uuidV4(), cardtitle: "greencard1" },
  { id: uuidV4(), cardtitle: "greencard2" },
  { id: uuidV4(), cardtitle: "greencard3" },
  { id: uuidV4(), cardtitle: "greencard4" }
]
const blackStackcard = [
  { id: uuidV4(), cardtitle: "blackcard1" },
  { id: uuidV4(), cardtitle: "blackcard2" },
  { id: uuidV4(), cardtitle: "blackcard3" },
  { id: uuidV4(), cardtitle: "blackcard4" }
]
const stacksFromBackend = {
  [uuidV4()]: {
    name: "Red Stack",
    crds: redStackcard,
    color: "red"
  },
  [uuidV4()]: {
    name: "Blue Stack",
    crds: blueStackcard,
    color: "blue"
  },
  [uuidV4()]: {
    name: "Green Stack",
    crds: greenStackcard,
    color: "green"
  },
  [uuidV4()]: {
    name: "Black Stack",
    crds: blackStackcard,
    color: "black"
  }
}
const onDragEnd = (result, stacks, setStack) => {

  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceCard = stacks[source.droppableId];
    const destCard = stacks[destination.droppableId];
    const sourcecrds = [...sourceCard.crds];
    const destcrds = [...destCard.crds];
    const [removed] = sourcecrds.splice(source.index, 1);
    destcrds.splice(destination.index, 0, removed);
    setStack({
      ...stacks,
      [source.droppableId]: {
        ...sourceCard,
        crds: sourcecrds
      },
      [destination.droppableId]: {
        ...destCard,
        crds: destcrds
      }
    });
  } else {
    const Card = stacks[source.droppableId];
    const copiedcrds = [...Card.crds];
    const [removed] = copiedcrds.splice(source.index, 1);
    copiedcrds.splice(destination.index, 0, removed);
    setStack({
      ...stacks,
      [source.droppableId]: {
        ...Card,
        crds: copiedcrds
      }
    });
  }
};

const Stacks=()=> {

  const [stacks, setStack] = useState(stacksFromBackend);

  //adding cards
  const handleAdd = (stackId) => {
    if (stacks[stackId].crds.length < 8) {
      let addCard = { ...stacks }
      var add = { id: uuidV4(), cardtitle: `${stacks[stackId].color}`+ "card"+ `${stacks[stackId].crds.length+1}` }
      console.log(addCard[stackId].crds.push(add))
      console.log(stacks[stackId])
      setStack({ ...stacks })
    }
    else {
      alert("you can add maximum 8 card")
    }
  }

  //deleteing a card
  const handleDelte = async (stackId, id) => {

    let addCard = { ...stacks }
    const deletecard = (addCard[stackId].crds.splice(id, 1))
     console.log(deletecard)
     console.log(stacks[stackId])
     setStack({ ...stacks })
  }

  //change card title
  const handleChange = (stackId, id,evt) => {
    let addCard={...stacks}
    let newCardtitle=addCard[stackId].crds.map(crd=>{if (crd.id==id){crd.cardtitle=evt} return crd}
    )
    console.log(newCardtitle)
    setStack({...stacks})
  }

  useEffect(() => {
    setStack(stacks);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%"  }}>

      <DragDropContext

        onDragEnd={result => onDragEnd(result, stacks, setStack)}
      >
        {Object.entries(stacks).map(([stackId, Card], index) => {

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px",
              }}
              key={stackId}
            >
              <h2 style={{color:Card.color, margin:"0 100px"}}>{Card.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={stackId} key={stackId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightgray"
                            : "aliceblue",
                          padding: "6px",
                          width: "250px",
                          minHeight: "500px",
                          margin: "20px",
                        }}
                      >
                        {Card.crds.map((crd, index) => {
                          return (
                            
                            <Draggable
                              key={crd.id}
                              draggableId={crd.id}
                              index={index}
                            >
                              
                              {(provided, snapshot) => {
                                return (
                                  
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    
                                     <div style={{display:"flex",flexDirection:"row", padding:"20px 5px",background:"white" ,border:`2px solid ${Card.color}`, borderRadius:"10px",boxShadow: "#0000001f 0px 3px 6px, #0000002e 0px 3px 6px",}}>
                                      
                                     <input style={{ outline:"none",color:"black",textAlign:"center",border:"0px solid",fontSize:"16px"
                                     
                                     }}typeof="text" value={crd.cardtitle} onChange={(e)=>handleChange(stackId,crd.id,e.target.value)} ></input>
                                     <div onClick={() => handleDelte(stackId, crd.id)} 
                                     style={{
                                      margin: "-25px -15px",
                                      color: "#8a8a8a",
                                      cursor: "pointer",
                                      fontSize:"20px",
                                      padding:"5px"
                                    }}
                                     >x</div>
                                      </div>
                                  </div>
                                     

                                      
                                );
                              }}
                              
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                   
                        <button style={{background:"lightblue" , border:"1px solid blue",borderRadius:"5px" , margin:"20px 80px", boxShadow: "#0000001f 0px 3px 6px, #0000002e 0px 3px 6px",cursor:"pointer", padding:"5px"}} onClick={() => handleAdd(stackId)}>Add new card</button>
                        </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>

    </div>
  );
}
export default Stacks