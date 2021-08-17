import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
import KanbanCard from "./KanbanCard";
import KanbanNewCard from "./KanbanNewCard";
import { DELETE_LIST, GET_LISTS, CHANGE_CARD_LIST } from '../../graphql/Queries'
import { useMutation } from "@apollo/react-hooks";

const KanbanListItem = ({
  listItem,
  listItemsNumber,
}) => {

  const [deleteListMutation] = useMutation(DELETE_LIST);
  const [changeCardListMutation] = useMutation(CHANGE_CARD_LIST);
  const deleteList = () => {
    deleteListMutation({
      variables: { id: listItem.id },
      refetchQueries: [{ query: GET_LISTS }]
    })
      .catch(function(error) {
        console.log(error);
        alert('An error occurred while deleting the list');
      });
  };

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card",
    drop(item) {
      changeCardListMutation({
        variables: { list_id: listItem.id, id: item.id },
        refetchQueries: [{ query: GET_LISTS }]
      })
        .catch(function(error) {
          console.log(error);
          alert('An error occurred while moving the card');
        });
    }
  });
  drop(ref);

  return (
    <div ref={ref} key={`item-${listItem.id}`} className={`w-1/${listItemsNumber+1} border-2 border-gray-600 m-6 p-4 text-center relative`}>
      <h2 className="font-bold">{listItem.name}</h2>
      <a title="Delete" onClick={deleteList} className="absolute right-4 top-2 cursor-pointer">X</a>
      <hr className="mt-2 mb-2" />
      <KanbanNewCard listId={listItem.id} />
      {listItem.cards.map((card) => {
        return (
          <KanbanCard key={`card-${card.id}`} card={card}></KanbanCard>
        );
      })}
    </div>
  );
}

KanbanListItem.propTypes = {
  listItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  listItemsNumber: PropTypes.number.isRequired,
};

export default KanbanListItem;