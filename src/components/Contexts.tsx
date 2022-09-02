import React, { createContext, useState, useEffect, useMemo }from "react";
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { decode } from "punycode";
const BASE_URL: string  = 'https://celz4-api.herokuapp.com';
const Context = createContext({
  openSideNav: () => {},
  collapseSideNav: () => {},
  isOpened: true,
  adminFirstName: "",
  adminLastName: "",
  adminDateOfBirth:'',
  adminRole: "",
  adminChurch: "",
  adminTableData: [],
  serviceTableData: [],
  churchTableData: [],
  partnershipTableData: [],
  attendanceTableData: [],
  cellTableData: [],
  financeTableData: [],
  signIn: () => {},
  signOut: () => {},
  result: true,
});
interface IContext{
     children: JSX.Element;
}
interface IToken{
     data: {
          church: string,
          email?: string,
          firstName: string,
          lastName: string,
          dob: number,
          id?: number,
          groupChurch?: string,
          password?: string,
          role: string,
          __v?: number,
          _id?: string,
     },
     iat: number
}
export function AccessContexts(props: IContext){
     const [isOpenSideNav, setIsOpenSideNav] = useState(true);
     const [tableData, setTableData] = useState([])
     const [serviceTable, setServiceTable] = useState([])
     const [churchTable, setChurchTable] = useState([])
     const [partnershipTable, setPartnershipTable] = useState([])
     const [attendanceTable, setAttendanceTable] = useState([]);
     const [cellTable, setCellTable] = useState([]);
     const [financeTable, setFinanceTable] = useState([]);




     const [adminFirstName, setAdminFirstName] = useState('')
     const [adminLastName, setAdminLastName] = useState('')
     const [adminDateOfBirth, setAdminDateOfBirth] = useState(Number)
     const [adminRole, setAdminRole] = useState('')
     const [adminChurch, setAdminChurch] = useState('')
     const [userActiveStatus, setUserActiveStatus] = useState(false);
     const token = localStorage.getItem('token')
     useEffect(() => {
          let ignore = false;
          if(token){
               const decoded: IToken = jwt_decode(token);
               setAdminFirstName(decoded.data.firstName)
               setAdminLastName(decoded.data.lastName)
               setAdminDateOfBirth(decoded.data.dob)
               setAdminChurch(decoded.data.church);
               setAdminRole(decoded.data.role);
               console.log(decoded)
          }else{
               setAdminFirstName('')
               setAdminLastName('')
               setAdminDateOfBirth(Number)
               setAdminChurch('');
               setAdminRole('');

          }
          fetch(`${BASE_URL}/v2/admin`).then(response =>{return response.json()}).then((data) => {
               setTableData(data)
          }),
          fetch(`${BASE_URL}/v2/service`).then(response =>{return response.json()}).then((data) => {
               setServiceTable(data)
          }),

          fetch(`${BASE_URL}/v2/church`).then(response =>{return response.json()}).then((data) => {
               setChurchTable(data)
          }),
         
          fetch(`${BASE_URL}/v2/partnership`).then(response =>{return response.json()}).then((data) => {
               setPartnershipTable(data)
          }),
          fetch(`${BASE_URL}/v2/attendance`).then(response =>{return response.json()}).then((data) => {
               setAttendanceTable(data)
          }),

          fetch(`${BASE_URL}/v2/cell-report`).then(response =>{return response.json()}).then((data) => {
               setCellTable(data)}),
          fetch(`${BASE_URL}/v2/finance`).then(response =>{return response.json()}).then((data) => {
               setFinanceTable(data)
          })
     }, [token])
     
     function closeSideNav(){
          setIsOpenSideNav(false)
     }
     function openSideNav(){
          setIsOpenSideNav(true);
     }

     function signedIn(){
          setUserActiveStatus(true);
     } 
     function signedOut(){
          setUserActiveStatus(false);
     }



     const value = {
          openSideNav: openSideNav,
          collapseSideNav: closeSideNav,
          isOpened: isOpenSideNav,
          adminFirstName: adminFirstName,
          adminLastName: adminLastName,
          adminDateOfBirth: adminDateOfBirth,
          adminRole: adminRole,
          adminChurch: adminChurch,
          adminTableData: tableData,
          serviceTableData: serviceTable,
          churchTableData: churchTable,
          partnershipTableData: partnershipTable,
          attendanceTableData: attendanceTable,
          cellTableData: cellTable,
          financeTableData: financeTable,
          result : userActiveStatus,
          signIn: signedIn,
          signOut: signedOut,
     }


     return <Context.Provider value={value}>
                    {props.children}
            </Context.Provider>
}

export default Context;
//https://github.com/marveldc08/church-service-portal.git