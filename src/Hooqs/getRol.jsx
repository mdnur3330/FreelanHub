import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axiosSecure from "./useAxiosSecure";

const useRoll = () => {
  const { user } = useContext(AuthContext);
  const [roll, setRoll] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const rol = async () => {
      if (!user?.email) {
      setLoading(false);
      return;
    }
      if (user) {
        try {
          const res = await axiosSecure(`/coin-role/${user.email}`);
          setRoll(res.data)
        
        } catch (error) {
          console.log(error);
        }finally{
            setLoading(false)
        }
      }
    };
    rol();

  }, [user]);
  return [roll, loading]
};

export default useRoll;
