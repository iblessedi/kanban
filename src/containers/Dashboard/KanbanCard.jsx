import React from "react";
import PropTypes from 'prop-types';
import { useMutation } from "@apollo/react-hooks";
import { useDrag } from 'react-dnd'
import { DELETE_CARD, GET_LISTS } from "../../graphql/Queries";

const KanbanCard = ({
  card,
}) => {

  const [deleteCardMutation] = useMutation(DELETE_CARD);
  const deleteCard = () => {
    deleteCardMutation({
      variables: { id: card.id },
      refetchQueries: [{ query: GET_LISTS }]
    })
      .catch(function(error) {
        console.log(error);
        alert('An error occurred while deleting the card');
      });
  };

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'card',
      item: { id: card.id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
    <div ref={dragRef} style={{ opacity }} className="border-1 border-gray-600 bg-gray-200 p-5 mt-4 mb-4">
      <div className="relative">
        <a onClick={deleteCard} title="Delete" className="absolute right-1 cursor-pointer">X</a>
      </div>
      {card.name}
    </div>
  );
}

KanbanCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default KanbanCard;