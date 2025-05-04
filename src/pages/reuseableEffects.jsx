import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dashboardStats, endOfDaySummary, listCollections, partnerSettlementDetails, roles, settlements, usersList } from "../hooks/local/reducer";

export function useDashboardStats() {
    const [stats, setStats] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchDashboardStats = async() => {
        try {
            const {payload} = await dispatch(dashboardStats());
            // console.log(payload)
            setStats(payload.result);
        }
        catch(e){}
      }
      fetchDashboardStats();
    }, [dispatch]);
  
    return stats;
  }

  export function useListUsers() {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchUsers = async() => {
        try {
            const {payload} = await dispatch(usersList());
            // console.log(payload?.result?.data)
            setUsers(payload?.result?.data);
        }
        catch(e){}
      }
      fetchUsers();
    }, [dispatch]);
  
    return users;
  }

  export function useListRoles() {
    const [rolesList, setRolesList] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchRoles = async() => {
        try {
            const {payload} = await dispatch(roles());
            // console.log(payload?.result?.data)
            setRolesList(payload?.result?.items);
        }
        catch(e){}
      }
      fetchRoles();
    }, [dispatch]);
  
    return rolesList;
  }


  export function useCollections() {
    const [collections, setCollections] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchCollections = async() => {
        try {
            const {payload} = await dispatch(listCollections());
            // console.log(payload)
            setCollections(payload?.result?.data);
        }
        catch(e){}
      }
      fetchCollections();
    }, [dispatch]);
  
    return collections;
  }

  export function useEndOfDaySummary() {
    const [endOfDay, setEndOfDay] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchEndOfDay = async() => {
        try {
            const {payload} = await dispatch(endOfDaySummary());
            // console.log(payload)
            setEndOfDay(payload?.result?.data);
        }
        catch(e){}
      }
      fetchEndOfDay();
    }, [dispatch]);
  
    return endOfDay;
  }

  export function useSettlementDetails() {
    const [settlementDetails, setSettlementDetails] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchSettlements = async() => {
        try {
            const {payload} = await dispatch(settlements());
            // console.log(payload)
            setSettlementDetails(payload?.result?.data);
        }
        catch(e){}
      }
      fetchSettlements();
    }, [dispatch]);
  
    return settlementDetails;
  }

  export function usePartnerSettlementDetails() {
    const [partnerSettlement, setPartnerSettlement] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchPartnerSettlements = async() => {
        try {
            const {payload} = await dispatch(partnerSettlementDetails());
            // console.log(payload)
            setPartnerSettlement(payload?.result?.data);
        }
        catch(e){}
      }
      fetchPartnerSettlements();
    }, [dispatch]);
  
    return partnerSettlement;
  }