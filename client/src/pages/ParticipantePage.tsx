import React from "react";
import { useParams } from "react-router-dom";

const ParticipantePage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>ParticipantePage{id}</div>;
};

export default ParticipantePage;
