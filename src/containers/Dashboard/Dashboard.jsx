import React from "react";
import { withRouter } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "@apollo/react-hoc";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanListItem from "./KanbanListItem";
import KanbanNewListItem from "./KanbanNewListItem";
import { GET_LISTS } from '../../graphql/Queries'

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_LISTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data === undefined) return '';

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-4 sm:grid-flow-col gap-2 flex">
        {data.lists.map((listItem, index) =>
          <KanbanListItem key={`listItem-${index}`} listItem={listItem} listItemsNumber={data.lists.length} />
        )}
        <KanbanNewListItem listItemsNumber={data.lists.length} />
      </div>
    </DndProvider>
  );
}

export default withApollo(withRouter(Dashboard));