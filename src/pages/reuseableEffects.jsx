import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dashboardStats } from "../hooks/local/reducer";

export function useDashboardStats() {
    const [stats, setStats] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchDashboardStats = async() => {
        try {
            const {payload} = await dispatch(dashboardStats());
            setStats(payload.data);
        }
        catch(e){}
      }
      fetchDashboardStats();
    }, [dispatch]);
  
    return stats;
  }