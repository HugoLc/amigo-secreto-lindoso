import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IStorage } from "../ParticipantePage/ParticipantePage";
import api from "../../service/api";

const Admin = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState<boolean>();

  const storageValue = useMemo<IStorage | null>(() => {
    if (localStorage.getItem("amigoSecretoToken")) {
      const value = JSON.parse(
        localStorage.getItem("amigoSecretoToken") as string
      );
      return value;
    }
    return null;
  }, []);

  const { admin } = useParams<{ admin: string }>();

  const getDashboard = async () => {
    try {
      const response = await api.get(`/dashboard/${admin}`, {
        headers: {
          Authorization: `${storageValue?.token}`,
        },
      });
      const data = response.data;
      setIsAdmin(data.isAdmin);
    } catch (error: any) {
      console.log("ERRO dashboard", error.message);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (isAdmin) {
    return <div>Admin</div>;
  } else if (isAdmin === false) {
    navigate("/");
  }
  return null;
};

export default Admin;
