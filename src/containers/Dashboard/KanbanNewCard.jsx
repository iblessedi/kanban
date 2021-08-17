import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CARD, GET_LISTS } from "../../graphql/Queries";

const KanbanNewCard = ({
  listId,
}) => {
  const [cardName, setCardName] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [createCardMutation] = useMutation(CREATE_CARD);
  const createCard = () => {
    if (cardName === '') {
      return;
    }
    createCardMutation({
      variables: { name: cardName, list_id: listId },
      refetchQueries: [{ query: GET_LISTS }]
    })
    .catch(function(error) {
      console.log(error);
      alert('An error occurred while creating the card');
    });
    setCardName('');
    setFormVisible(false);
  };

  return (
    <div>
      {formVisible && (
        <div className="border-1 border-gray-600 bg-gray-200 p-5 mt-4 mb-4">
          <input type="text" value={cardName} onChange={(e) => {setCardName(e.target.value)}} placeholder="Enter Task Name" className="border-2 border-gray-600 pl-1 pr-1" />
          <br />
          <input type="button" onClick={createCard} value="Add new Task" className="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer mt-3" />
        </div>
      )}
      {!formVisible && (
        <div>
          <a onClick={() => { setFormVisible(true); }} className="cursor-pointer text-xs">Create New Task</a>
          <hr className="mt-2" />
        </div>
      )}
    </div>
  );
};

KanbanNewCard.propTypes = {
  listId: PropTypes.number.isRequired,
};

export default KanbanNewCard;