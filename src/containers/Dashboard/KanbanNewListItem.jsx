import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_LIST, GET_LISTS } from '../../graphql/Queries'
import PropTypes from "prop-types";


const KanbanNewListItem = ({
  listItemsNumber,
}) => {

  const [listName, setListName] = useState('');
  const [createListMutation] = useMutation(CREATE_LIST);
  const createLList = () => {
    if (listName === '') {
      return;
    }
    createListMutation({
      variables: { name: listName },
      refetchQueries: [{ query: GET_LISTS }]
    })
    .catch(function(error) {
      console.log(error);
      alert('An error occurred while saving the data');
    });
    setListName('');
  };

  return (
    <div key="new-list" className={`w-1/${listItemsNumber+1} border-2 border-gray-600 m-6 p-4 text-center`}>
      <input type="text" value={listName} onChange={(e) => {setListName(e.target.value)}} placeholder="Enter List Name" className="border-2 border-gray-600 pl-1 pr-1" />
      <br />
      <input type="button" onClick={createLList} value="Add new List" className="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer mt-3" />
    </div>
  );
}

KanbanNewListItem.propTypes = {
  listItemsNumber: PropTypes.number.isRequired,
};

export default KanbanNewListItem;